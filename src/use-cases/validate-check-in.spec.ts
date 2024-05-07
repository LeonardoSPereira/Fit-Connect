import { it, expect, describe, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { ValidadeCheckInUseCase } from './validate-check-in'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { LateCheckInValidationError } from './errors/late-check-in-validation-error'

let checkInsRepository: InMemoryCheckInsRepository
let sut: ValidadeCheckInUseCase

describe("Validate Check-in Use Case", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new ValidadeCheckInUseCase(checkInsRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("should be able to validate a check-in", async () => {
    const createdCheckIn = await checkInsRepository.create({
      gym_id: "gym-1",
      user_id: "user-1"
    })

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(checkInsRepository.checkIns[0].validated_at).toEqual(expect.any(Date))
  })

  it("should not be able to validate a check-in that does not exist", async () => {
    await expect(() => 
      sut.execute({
        checkInId: "inexistent-check-in-id"
    })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it("should not be able to validate a check-in after 20 minutes of it's creation", async () => {
    vi.setSystemTime(new Date(2024, 0, 1, 12, 0, 0))

    const createdCheckIn = await checkInsRepository.create({
      gym_id: "gym-1",
      user_id: "user-1"
    })

    const OneHourInMilliseconds = 1000 * 60 * 60
    vi.advanceTimersByTime(OneHourInMilliseconds)

    await expect(() => 
      sut.execute({
        checkInId: createdCheckIn.id
    })).rejects.toBeInstanceOf(LateCheckInValidationError)
  })
})
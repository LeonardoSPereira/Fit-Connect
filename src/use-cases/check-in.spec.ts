import { it, expect, describe, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in'

let checkInsRepository: InMemoryCheckInsRepository
let sut: CheckInUseCase

describe("Check-in Use Case", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new CheckInUseCase(checkInsRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("should be able to check in", async () => {
    const { checkIn } = await sut.execute({
      userId: "user-1",
      gymId: "gym-1",
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it("should not be able to check in twice in the same day", async () => {
    vi.setSystemTime(new Date(2024, 0, 24, 8, 0, 0))

    await sut.execute({
      userId: "user-1",
      gymId: "gym-1",
    })

    await expect(() => 
      sut.execute({
        userId: "user-1",
        gymId: "gym-1",
    })).rejects.toBeInstanceOf(Error)
  })

  it("should be able to check in twice but in different days", async () => {
    vi.setSystemTime(new Date(2024, 0, 24, 8, 0, 0))

    await sut.execute({
      userId: "user-1",
      gymId: "gym-1",
    })

    vi.setSystemTime(new Date(2024, 0, 25, 8, 0, 0))

    const { checkIn } = await sut.execute({
      userId: "user-1",
      gymId: "gym-1",
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
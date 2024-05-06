import { it, expect, describe, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe("Check-in Use Case", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    gymsRepository.gyms.push({
      id: "gym-1",
      title: "Gym 1",
      description: "",
      phone: "",
      latitude: new Decimal(-16.33619222554258),
      longitude: new Decimal(-48.928527173189536),
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("should be able to check in", async () => {
    const { checkIn } = await sut.execute({
      userId: "user-1",
      gymId: "gym-1",
      userLatitude: -16.33619222554258,
      userLongitude: -48.928527173189536,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it("should not be able to check in twice in the same day", async () => {
    vi.setSystemTime(new Date(2024, 0, 24, 8, 0, 0))

    await sut.execute({
      userId: "user-1",
      gymId: "gym-1",
      userLatitude: -16.33619222554258,
      userLongitude: -48.928527173189536,
    })

    await expect(() => 
      sut.execute({
        userId: "user-1",
        gymId: "gym-1",
        userLatitude: -16.33619222554258,
        userLongitude: -48.928527173189536,
    })).rejects.toBeInstanceOf(Error)
  })

  it("should be able to check in twice but in different days", async () => {
    vi.setSystemTime(new Date(2024, 0, 24, 8, 0, 0))

    await sut.execute({
      userId: "user-1",
      gymId: "gym-1",
      userLatitude: -16.33619222554258,
      userLongitude: -48.928527173189536,
    })

    vi.setSystemTime(new Date(2024, 0, 25, 8, 0, 0))

    const { checkIn } = await sut.execute({
      userId: "user-1",
      gymId: "gym-1",
      userLatitude: -16.33619222554258,
      userLongitude: -48.928527173189536,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it("should not be able to check in distant gym", async () => {
    gymsRepository.gyms.push({
      id: "gym-2",
      title: "Gym 2",
      description: "",
      phone: "",
      latitude: new Decimal(-16.344712698649573),
      longitude: new Decimal(-48.9358518473557),
    })
    

    await expect(() => 
      sut.execute({
        userId: "user-1",
        gymId: "gym-2",
        userLatitude: -16.33619222554258,
        userLongitude: -48.928527173189536,
      })
    ).rejects.toBeInstanceOf(Error)
  })
})
import { it, expect, describe, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe("Fetch Nearby Gyms Use Case", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it("should be able to fetch nearby gyms", async () => {
    await gymsRepository.create({
      title: "Near Gym",
      description: "Academia de musculação",
      phone: "123456",
      latitude: new Decimal(-16.344712698649573),
      longitude: new Decimal(-48.9358518473557),
    })

    await gymsRepository.create({
      title: "Far Gym",
      description: "Academia de musculação",
      phone: "123456",
      latitude: new Decimal(-16.66314837354212),
      longitude: new Decimal(-49.23578671154361),
    })

    const { gyms } = await sut.execute({
      userLatitude: -16.33619222554258,
      userLongitude: -48.928527173189536,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({ title: "Near Gym"})
    ])
  })
})
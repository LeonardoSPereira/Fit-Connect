import { it, expect, describe, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymsUseCase } from './search-gyms'
import { Decimal } from '@prisma/client/runtime/library'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe("Search Gyms Use Case", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  it("should be able to search for gyms", async () => {
    await gymsRepository.create({
      title: "Javascript Academy",
      description: "Academia de musculação",
      phone: "123456",
      latitude: new Decimal(123456),
      longitude: new Decimal(123456),
    })

    await gymsRepository.create({
      title: "Typescript Academy",
      description: "Academia de musculação",
      phone: "123456",
      latitude: new Decimal(123456),
      longitude: new Decimal(123456),
    })

    const { gyms } = await sut.execute({
      query: "Javascript",
      page: 1
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({ title: "Javascript Academy"})
    ])
  })

  it("should be able to fetch paginated gym search", async () => {
    for(let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Javascript Academy ${i}`,
        description: "Academia de musculação",
        phone: "123456",
        latitude: new Decimal(123456),
        longitude: new Decimal(123456),
      })
    }

    const { gyms } = await sut.execute({
      query: "Javascript",
      page: 2
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: "Javascript Academy 21"}),
      expect.objectContaining({ title: "Javascript Academy 22"})
    ])
  })
})
import { Gym, Prisma } from "@prisma/client";
import { FindManyNearbyGymsProps, GymsRepository } from "../gyms-repository";
import { randomUUID } from "node:crypto";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates";

export class InMemoryGymsRepository implements GymsRepository {
  public gyms: Gym[] = [];

  async create(data: Prisma.GymCreateInput) {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
    }

    this.gyms.push(gym)

    return gym
  }

  async findById(id: string) {
    const gym = this.gyms.find(gym => gym.id === id)

    if(!gym) {
      return null
    }

    return gym
  }

  async searchMany(query: string, page: number) {
    return this.gyms
      .filter(gym => gym.title.includes(query))
      .slice((page - 1) * 20, page * 20)
  }

  async findManyNearby(params: FindManyNearbyGymsProps) {
    const gymsUntilTenKilometers = this.gyms.filter(gym => {
      const distance = getDistanceBetweenCoordinates(
        { latitude: params.latitude, longitude: params.longitude },
        { latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber() }
      )

      const MAX_DISTANCE_IN_KILOMETERS = 10

      return distance < MAX_DISTANCE_IN_KILOMETERS
    })

    return gymsUntilTenKilometers
  }
}
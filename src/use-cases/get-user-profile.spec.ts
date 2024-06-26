import { it, expect, describe, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { GetUserProfileUseCase } from './get-user-profile'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe("Get User Profile Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(usersRepository)
  })

  it("should be able to get user profile", async () => {
    const createdUser = await usersRepository.create({
      id: "user-1",
      name: "John Doe",
      email: "johndoe@email.com",
      password_hash: "123456"
    })

    const { user } = await sut.execute({ userId: createdUser.id })

    expect(user.id).toEqual(expect.any(String))
  })

  it("should not be able to get user profile with wrong id", async () => {
    await usersRepository.create({
      id: "user-1",
      name: "John Doe",
      email: "johndoe@email.com",
      password_hash: "123456"
    })

    await expect(() => 
      sut.execute({ userId: 'non-existing-id' })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
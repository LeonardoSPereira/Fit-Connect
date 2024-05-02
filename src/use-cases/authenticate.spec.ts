import { it, expect, describe } from 'vitest'
import { UsersRepositoryInMemory } from '@/repositories/in-memory/users-repository-in-memory'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

describe("Authenticate Use Case", () => {
  it("should be able to authenticate", async () => {
    const usersRepository = new UsersRepositoryInMemory()
    const sut = new AuthenticateUseCase(usersRepository)

    const passwordHash = await hash("123456", 6)

    await usersRepository.create({
      id: "user-1",
      name: "John Doe",
      email: "johndoe@email.com",
      password_hash: passwordHash
    })

    const { user } = await sut.execute({
      email: "johndoe@email.com",
      password: "123456"
    })

    expect(user.id).toEqual("user-1")
  })

  it("should not be able to authenticate with wrong email", async () => {
    const usersRepository = new UsersRepositoryInMemory()
    const sut = new AuthenticateUseCase(usersRepository)

    await expect(() => sut.execute({
        email: "johndoe@example.com",
        password: "123456"
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it("should not be able to authenticate with wrong password", async () => {
    const usersRepository = new UsersRepositoryInMemory()
    const sut = new AuthenticateUseCase(usersRepository)

    const passwordHash = await hash("123456", 6)

    await usersRepository.create({
      id: "user-1",
      name: "John Doe",
      email: "johndoe@email.com",
      password_hash: passwordHash
    })

    await expect(() => sut.execute({
        email: "johndoe@example.com",
        password: "123123"
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
import { prisma } from "@/lib/prisma"
import { PrismaUserRepository } from "@/repositories/prisma-users-repository"
import { hash } from "bcryptjs"

interface RegisterUseCaseProps {
  name: string
  email: string
  password: string
}

export async function registerUseCase({
  name, email, password
}: RegisterUseCaseProps){
  const prismaUserRepository = new PrismaUserRepository()

  const userAlreadyExistsWithSameEmail = await prismaUserRepository.findUserByEmail(email)

  if(userAlreadyExistsWithSameEmail){
    throw new Error("User already exists with same email")
  }

  const password_hash = await hash(password, 6)


  await prismaUserRepository.create({
    name,
    email,
    password_hash
  })
}
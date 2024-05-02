import { UsersRepository } from "@/repositories/users-repository"
import { hash } from "bcryptjs"
import { UserAlreadyExists } from "./errors/user-already-exists-error"

interface RegisterUseCaseProps {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository){}

  async execute({ name, email, password }: RegisterUseCaseProps) {
    const userAlreadyExistsWithSameEmail = await this.usersRepository.findUserByEmail(email)

    if(userAlreadyExistsWithSameEmail){
      throw new UserAlreadyExists()
    }

    const password_hash = await hash(password, 6)


    await this.usersRepository.create({
      name,
      email,
      password_hash
    })
  }
}
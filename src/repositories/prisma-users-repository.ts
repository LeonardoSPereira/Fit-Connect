import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export class PrismaUserRepository {
  async create(data:  Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data
    })

    return user
  }

  async findUserByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })

    return user
  }
}
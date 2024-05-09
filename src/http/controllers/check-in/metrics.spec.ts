import request from "supertest"
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateUser } from "@/utils/test/create-an-authenticate-user";
import { prisma } from "@/lib/prisma";

describe("Check-in Metrics (e2e)", () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it("should be able to get check-ins count", async () => {
    const { token } = await createAndAuthenticateUser(app)

    const user = await prisma.user.findFirstOrThrow()

    const gym = await prisma.gym.create({
      data: {
        title: "JavaScript Gym",
        latitude: -16.344712698649573,
        longitude: -48.9358518473557,
      }
    })

    await prisma.checkIn.createMany({
      data: [
        {
          user_id: user.id,
          gym_id: gym.id,
        },
        {
          user_id: user.id,
          gym_id: gym.id,
        }
      ]
    })

    const response = await request(app.server)
      .get('/check-ins/metrics')
      .set("Authorization", `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.checkInsCount).toEqual(2)
  })
})
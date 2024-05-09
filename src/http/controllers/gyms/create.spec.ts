import request from "supertest"
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateUser } from "@/utils/test/create-an-authenticate-user";

describe("Create Gym (e2e)", () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it("should be able to create gym", async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    const response = await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "JavaScript Gym",
        description: "The best gym for JavaScript developers",
        phone: "123456789",
        latitude: -16.344712698649573,
        longitude: -48.9358518473557,

      })

    expect(response.statusCode).toEqual(201)
  })
})
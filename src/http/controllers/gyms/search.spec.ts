import request from "supertest"
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateUser } from "@/utils/test/create-an-authenticate-user";

describe("Search Gym (e2e)", () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it("should be able to search gym", async () => {
    const { token } = await createAndAuthenticateUser(app)

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "JavaScript Gym",
        description: "The best gym for JavaScript developers",
        phone: "123456789",
        latitude: -16.344712698649573,
        longitude: -48.9358518473557,

      })

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "TypeScript Gym",
        description: "The best gym for TypeScript developers",
        phone: "123456789",
        latitude: -16.344712698649573,
        longitude: -48.9358518473557,

      })

    const response = await request(app.server)
      .get("/gyms/search")
      .query({
        query: "TypeScript"
      })
      .set("Authorization", `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: "TypeScript Gym"
      }),
    ])
  })
})
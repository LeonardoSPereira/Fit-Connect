import request from "supertest"
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateUser } from "@/utils/test/create-an-authenticate-user";

describe("Nearby Gym (e2e)", () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it("should be able to list nearby gym", async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Near Gym",
        description: "The best gym",
        phone: "123456",
        latitude: -16.344712698649573,
        longitude: -48.9358518473557,

      })

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Far Gym",
        description: "The best gym",
        phone: "123456",
        latitude: -16.66314837354212,
        longitude: -49.23578671154361,

      })

    const response = await request(app.server)
      .get("/gyms/nearby")
      .query({
        latitude: -16.33619222554258,
        longitude: -48.928527173189536,
      })
      .set("Authorization", `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: "Near Gym"
      }),
    ])
  })
})
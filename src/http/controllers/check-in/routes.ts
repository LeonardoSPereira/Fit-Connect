import { FastifyInstance } from "fastify";
import { verifyJwt } from "@/http/middlewares/verify-jwt";

export async function checkInRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJwt)
}
import { FastifyInstance } from 'fastify'
import { contador } from './../http/controllers/contador-controller'

export async function appRoutes(app: FastifyInstance) {
  app.post('/contador', contador)
}

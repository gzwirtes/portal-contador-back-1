import { FastifyInstance } from 'fastify'
import { contador } from './../http/controllers/contador-controller'
import { authenticate } from './controllers/authenticate-controller'

export async function appRoutes(app: FastifyInstance) {
  app.post('/contador', contador)

  // app.post('/indicacao', indicacao)

  app.post('/sessions', authenticate)
}

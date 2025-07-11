import { FastifyInstance } from 'fastify'
import { contador, profile } from './../http/controllers/contador-controller'
import { authenticate } from './controllers/authenticate-controller'
import { indicacao, listaIndicacao } from './controllers/indicacao-controller'
import {
  cliente,
  listaClientesVinculados,
} from './controllers/cliente-controller'
import { verifyJWT } from './middlewares/verify-jwt'

export async function appRoutes(app: FastifyInstance) {
  app.post('/auth/login', authenticate)
  app.post('/contador', contador)

  app.get('/contador/me', { onRequest: [verifyJWT] }, profile)

  app.post('/indicacoes', { onRequest: [verifyJWT] }, indicacao)

  app.post('/clientes', { onRequest: [verifyJWT] }, cliente)

  app.get('/clientes', { onRequest: [verifyJWT] }, listaClientesVinculados)

  app.get('/indicacoes', { onRequest: [verifyJWT] }, listaIndicacao)
}

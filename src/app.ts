import fastify from 'fastify'
import { prisma } from './lib/prisma'
import z from 'zod'

export const app = fastify()

app.post('/contador', async (request, reply) => {
  const registerBodySchema = z.object({
    nome: z.string(),
    email: z.string(),
    senhaHash: z.string().min(6),
  })

  const { nome, email, senhaHash } = registerBodySchema.parse(request.body)

  await prisma.contador.create({
    data: {
      nome,
      email,
      senhaHash,
    },
  })

  return reply.status(201).send()
})

import { FastifyRequest, FastifyReply } from 'fastify'
import z from 'zod'
import { ContadorUseCase } from '@/use-cases/contador'
import { PrismaContadorRepository } from '@/repositories/prisma-contador-repository'

export async function contador(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    nome: z.string(),
    email: z.string(),
    senhaHash: z.string().min(6),
  })

  const { nome, email, senhaHash } = registerBodySchema.parse(request.body)

  try {
		const prismaContadorRepository = new PrismaContadorRepository()
		const contadorUseCase = new ContadorUseCase(prismaContadorRepository)

    await contadorUseCase.execute({
      nome,
      email,
      senhaHash,
    })
  } catch (error) {
    return reply.status(409).send()
  }

  return reply.status(201).send()
}

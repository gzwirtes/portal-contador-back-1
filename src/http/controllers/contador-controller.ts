import z from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { ContadorUseCase } from '@/use-cases/contador'
import { PrismaContadorRepository } from '@/repositories/prisma/prisma-contador-repository'
import { ContadorAlreadyExistsError } from '@/use-cases/error/contador-already-exists'

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
		if (error instanceof ContadorAlreadyExistsError){
			return reply.status(409).send({
				message: error.message
			})
		}

		return reply.status(500).send()
  }

  return reply.status(201).send()
}

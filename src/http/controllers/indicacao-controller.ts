import z from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { ContadorAlreadyExistsError } from '@/use-cases/error/contador-already-exists'
import { makeContadorUseCase } from '@/use-cases/factories/make-contador-use-case'

export async function contador(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    nome: z.string(),
    email: z.string(),
    senhaHash: z.string().min(6),
  })

  const { nome, email, senhaHash } = registerBodySchema.parse(request.body)

  try {
    const contadorUseCase = makeContadorUseCase()

    await contadorUseCase.execute({
      nome,
      email,
      senhaHash,
    })
  } catch (error) {
    if (error instanceof ContadorAlreadyExistsError) {
      return reply.status(409).send({
        message: error.message,
      })
    }

    throw error
  }

  return reply.status(201).send()
}

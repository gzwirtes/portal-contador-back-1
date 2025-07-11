import z from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { ContadorAlreadyExistsError } from '@/use-cases/error/contador-already-exists'
import { makeContadorUseCase } from '@/use-cases/factories/make-contador-use-case'
import { makeGetContadorProfileUseCase } from '@/use-cases/factories/make-get-contador-profile-use-case'

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

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const getContadorProfileUseCase = makeGetContadorProfileUseCase()

  const { contador } = await getContadorProfileUseCase.execute({
    contadorId: request.user.sub,
  })

  return reply.status(201).send({
    contador: {
      ...contador,
      senhaHash: undefined,
    },
  })
}

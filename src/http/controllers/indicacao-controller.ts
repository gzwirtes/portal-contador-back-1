import z from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeIndicacaoUseCase } from '@/use-cases/factories/make-indicacao-use-case'
import { makeListarIndicacaoUseCase } from '@/use-cases/factories/make-listar-indicacao-use-case'

export async function indicacao(request: FastifyRequest, reply: FastifyReply) {
  const user = request.user as { sub: string }

  console.log(user)

  const registerBodySchema = z.object({
    nomeIndicado: z.string(),
    cnpjIndicado: z.string(),
    status: z.string(),
  })

  const { nomeIndicado, cnpjIndicado, status } = registerBodySchema.parse(
    request.body,
  )
  try {
    const indicacaoUseCase = makeIndicacaoUseCase()

    await indicacaoUseCase.execute({
      nomeIndicado,
      cnpjIndicado,
      contadorId: Number(user.sub),
      status,
    })

    return reply.status(201).send()
  } catch (error) {
    if (error instanceof Error && error.message === 'CNPJ já indicado') {
      return reply.status(409).send({ message: error.message }) // 409 Conflict
    }

    console.error(error)
    return reply.status(500).send({ message: 'Internal server error.' })
  }
}

export async function listaIndicacao(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const user = request.user as { sub: string }

  console.log(user, user.sub)
  const useCase = makeListarIndicacaoUseCase()
  const indicacoes = await useCase.execute({
    contadorId: user.sub,
  })
  return reply.status(200).send(indicacoes)
}

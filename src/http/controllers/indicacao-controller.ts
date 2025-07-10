import z from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeIndicacaoUseCase } from '@/use-cases/factories/make-indicacao-use-case'

export async function indicacao(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    nomeIndicado: z.string(),
    cnpjIndicado: z.string(),
    contadorId: z.number(),
    status: z.string(),
  })

  const { nomeIndicado, cnpjIndicado, contadorId, status } =
    registerBodySchema.parse(request.body)

  const indicacaoUseCase = makeIndicacaoUseCase()

  await indicacaoUseCase.execute({
    nomeIndicado,
    cnpjIndicado,
    contadorId,
    status,
  })

  return reply.status(201).send()
}

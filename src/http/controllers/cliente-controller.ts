import z from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeCLienteUseCase } from '@/use-cases/factories/make-cliente-use-case'
import { makeListarClientesVinculadosUseCase } from '@/use-cases/factories/make-listar-clientes-vinculados-use-case'

export async function cliente(request: FastifyRequest, reply: FastifyReply) {
  const user = request.user as { sub: string }

  const registerBodySchema = z.object({
    nome: z.string(),
    cnpj: z.string(),
    email: z.string(),
  })

  const { nome, cnpj, email } = registerBodySchema.parse(request.body)

  try {
    const clienteUseCase = makeCLienteUseCase()

    await clienteUseCase.execute({
      nome,
      cnpj,
      email,
      contadorId: user.sub,
    })
  } catch (error) {
    if (error instanceof Error && error.message === 'Cliente já cadastrado') {
      return reply.status(409).send({ message: error.message }) // 409 Conflict
    }

    console.error(error)
    return reply.status(500).send({ message: 'Internal server error.' })
  }

  return reply.status(201).send()
}

export async function listaClientesVinculados(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  await request.jwtVerify()

  const user = request.user as { sub: string }

  console.log(user)

  const useCase = makeListarClientesVinculadosUseCase()
  const clientes = await useCase.execute({ contadorId: user.sub })
  return reply.status(200).send(clientes)
}

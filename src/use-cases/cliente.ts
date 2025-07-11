import { ClienteRepository } from '@/repositories/cliente-repository'
import { Cliente } from 'generated/prisma'

interface CLienteUseCaseRequest {
  nome: string
  cnpj: string
  email: string
  contadorId: string
}

interface CLienteUseCaseResponse {
  cliente: Cliente
}

export class CLienteUseCase {
  constructor(private clienteRepository: ClienteRepository) {}

  async execute({
    nome,
    cnpj,
    email,
    contadorId,
  }: CLienteUseCaseRequest): Promise<CLienteUseCaseResponse> {
    const clientExists = await this.clienteRepository.findByCnpj(cnpj)

    if (clientExists) {
      throw new Error('Cliente já cadastrado')
    }

    const cliente = await this.clienteRepository.create({
      nome,
      cnpj,
      email,
      contador: {
        connect: { id: Number(contadorId) },
      },
    })

    return {
      cliente,
    }
  }
}

import { ClienteRepository } from '@/repositories/cliente-repository'
import { Cliente } from 'generated/prisma'

interface GetCLientesVinculadosUseCaseRequest {
  contadorId: string
}

interface GetCLientesVinculadosUseCaseResponse {
  clientes: Cliente[]
}

export class GetCLientesVinculadosUseCase {
  constructor(private clienteRepository: ClienteRepository) {}

  async execute({
    contadorId,
  }: GetCLientesVinculadosUseCaseRequest): Promise<GetCLientesVinculadosUseCaseResponse> {
    const clients = await this.clienteRepository.findByContador(
      Number(contadorId),
    )

    return {
      clientes: clients ?? [],
    }
  }
}

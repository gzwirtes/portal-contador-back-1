import { PrismaClienteRepository } from '@/repositories/prisma/prisma-cliente-repository '
import { GetCLientesVinculadosUseCase } from '../get-clientes-vinculados'

export function makeListarClientesVinculadosUseCase() {
  const prismaClientesVinculadosRepository = new PrismaClienteRepository()
  const clientesVinculadosUseCase = new GetCLientesVinculadosUseCase(
    prismaClientesVinculadosRepository,
  )

  return clientesVinculadosUseCase
}

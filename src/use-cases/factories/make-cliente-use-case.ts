import { PrismaClienteRepository } from '@/repositories/prisma/prisma-cliente-repository '
import { CLienteUseCase } from '../cliente'

export function makeCLienteUseCase() {
  const prismaClienteRepository = new PrismaClienteRepository()
  const clienteUseCase = new CLienteUseCase(prismaClienteRepository)

  return clienteUseCase
}

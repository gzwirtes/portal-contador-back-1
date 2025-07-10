import { PrismaContadorRepository } from '@/repositories/prisma/prisma-contador-repository'
import { ContadorUseCase } from '../contador'

export function makeContadorUseCase() {
  const prismaContadorRepository = new PrismaContadorRepository()
  const contadorUseCase = new ContadorUseCase(prismaContadorRepository)

  return contadorUseCase
}

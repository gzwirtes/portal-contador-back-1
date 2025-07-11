import { PrismaContadorRepository } from '@/repositories/prisma/prisma-contador-repository'
import { GetContadorProfileUseCase } from '../get-contador-profile'

export function makeGetContadorProfileUseCase() {
  const prismaContadorRepository = new PrismaContadorRepository()
  const contadorUseCase = new GetContadorProfileUseCase(
    prismaContadorRepository,
  )

  return contadorUseCase
}

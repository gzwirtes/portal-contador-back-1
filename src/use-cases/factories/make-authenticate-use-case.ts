import { PrismaContadorRepository } from '@/repositories/prisma/prisma-contador-repository'
import { AuthenticateUseCase } from '../authenticate'

export function makeAuthenticateUseCase() {
  const prismaContadorRepository = new PrismaContadorRepository()
  const authenticateUseCase = new AuthenticateUseCase(prismaContadorRepository)

  return authenticateUseCase
}

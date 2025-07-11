import { PrismaIndicacaoRepository } from '@/repositories/prisma/prisma-indicacao-repository'
import { GetIndicacaoUseCase } from '../get-all-indicacao'

export function makeListarIndicacaoUseCase() {
  const prismaIndicacaoRepository = new PrismaIndicacaoRepository()
  const indicacaoUseCase = new GetIndicacaoUseCase(prismaIndicacaoRepository)

  return indicacaoUseCase
}

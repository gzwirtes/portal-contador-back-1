import { PrismaIndicacaoRepository } from '@/repositories/prisma/prisma-indicacao-repository'
import { IndicacaoUseCase } from '../indicacao'

export function makeIndicacaoUseCase() {
  const prismaIndicacaoRepository = new PrismaIndicacaoRepository()
  const indicacaoUseCase = new IndicacaoUseCase(prismaIndicacaoRepository)

  return indicacaoUseCase
}

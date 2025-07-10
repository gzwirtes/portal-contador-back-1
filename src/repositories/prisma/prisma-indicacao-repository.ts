import { prisma } from '../../lib/prisma'
import { Prisma } from 'generated/prisma'
import { IndicacaoRepository } from '../indicacao-repository'

export class PrismaIndicacaoRepository implements IndicacaoRepository {
  async create(data: Prisma.IndicacaoCreateInput) {
    const indicacao = await prisma.indicacao.create({
      data,
    })

    return indicacao
  }
}

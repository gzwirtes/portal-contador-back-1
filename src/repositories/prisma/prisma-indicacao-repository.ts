import { prisma } from '../../lib/prisma'
import { Indicacao, Prisma } from 'generated/prisma'
import { IndicacaoRepository } from '../indicacao-repository'

export class PrismaIndicacaoRepository implements IndicacaoRepository {
  async create(data: Prisma.IndicacaoCreateInput) {
    const indicacao = await prisma.indicacao.create({
      data,
    })

    return indicacao
  }

  async findByContador(contadorId: number): Promise<Indicacao[] | null> {
    const indicacoes = await prisma.indicacao.findMany({
      where: {
        contadorId: Number(contadorId),
      },
    })
    return indicacoes.length > 0 ? indicacoes : null
  }

  async findByCnpj(cnpj: string) {
    return await prisma.indicacao.findFirst({
      where: { cnpjIndicado: cnpj },
    })
  }

  async findMany() {
    return await prisma.indicacao.findMany({
      include: {
        contador: true,
      },
    })
  }
}

import { Prisma, Indicacao } from 'generated/prisma'

export interface IndicacaoRepository {
  create(data: Prisma.IndicacaoCreateInput): Promise<Indicacao>
}

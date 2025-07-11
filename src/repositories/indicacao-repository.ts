import { Prisma, Indicacao } from 'generated/prisma'

export interface IndicacaoRepository {
  create(data: Prisma.IndicacaoCreateInput): Promise<Indicacao[]>
  findByCnpj(): Promise<Indicacao>
  findMany(): Promise<Indicacao>
  findByContador(contadorId: number): Promise<Indicacao[] | null>
}

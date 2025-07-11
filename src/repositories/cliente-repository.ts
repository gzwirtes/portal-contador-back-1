import { Prisma, Cliente } from 'generated/prisma'

export interface ClienteRepository {
  create(data: Prisma.ClienteCreateInput): Promise<Cliente>
  findByCnpj(cnpj: string): Promise<Cliente | null>
  findByContador(cnpj: number): Promise<Cliente[] | null>
  // findMany(): Promise<Cliente>
}

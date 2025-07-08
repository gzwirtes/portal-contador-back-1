import { Prisma, Contador } from 'generated/prisma'

export interface ContadorRepository {
  findByEmail(email: string): Promise<Contador | null>
  create(data: Prisma.ContadorCreateInput): Promise<Contador>
}

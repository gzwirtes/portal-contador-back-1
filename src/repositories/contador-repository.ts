import { Prisma, Contador } from 'generated/prisma'

export interface ContadorRepository {
  findById(id: number): Promise<Contador | null>
  findByEmail(email: string): Promise<Contador | null>
  create(data: Prisma.ContadorCreateInput): Promise<Contador>
}

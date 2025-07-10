import { prisma } from '../../lib/prisma'
import { Contador, Prisma } from 'generated/prisma'
import { ContadorRepository } from '../contador-repository'

export class PrismaContadorRepository implements ContadorRepository {
  async findById(id: number): Promise<Contador | null> {
    const contador = await prisma.contador.findUnique({
      where: {
        id,
      },
    })

    return contador
  }

  async findByEmail(email: string) {
    const contador = await prisma.contador.findUnique({
      where: {
        email,
      },
    })

    return contador
  }

  async create(data: Prisma.ContadorCreateInput) {
    const contador = await prisma.contador.create({
      data,
    })

    return contador
  }
}

import { prisma } from '../../lib/prisma'
import { Prisma } from 'generated/prisma'
import { ContadorRepository } from '../contador-repository'

export class PrismaContadorRepository implements ContadorRepository {
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

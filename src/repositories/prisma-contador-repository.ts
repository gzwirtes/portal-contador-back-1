import { prisma } from './../lib/prisma'
import { Prisma } from 'generated/prisma'

export class PrismaContadorRepository {
  async create(data: Prisma.ContadorCreateInput) {
    const contador = await prisma.contador.create({
      data,
    })

    return contador
  }
}

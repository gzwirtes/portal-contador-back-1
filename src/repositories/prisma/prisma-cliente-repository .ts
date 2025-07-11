import { prisma } from '../../lib/prisma'
import { Cliente, Prisma } from 'generated/prisma'
import { ClienteRepository } from '../cliente-repository'

export class PrismaClienteRepository implements ClienteRepository {
  async findByContador(contadorId: number): Promise<Cliente[] | null> {
    const clientes = await prisma.cliente.findMany({
      where: { contadorId },
    })
    return clientes.length > 0 ? clientes : null
  }

  async create(data: Prisma.ClienteCreateInput) {
    const cliente = await prisma.cliente.create({
      data,
    })

    return cliente
  }

  async findByCnpj(cnpj: string) {
    return await prisma.cliente.findFirst({
      where: { cnpj },
      include: {
        contador: true,
      },
    })
  }

  // async findMany() {
  //   return await prisma.indicacao.findMany({
  //     include: {
  //       contador: true,
  //     },
  //   })
  // }
}

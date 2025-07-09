import { Contador, Prisma } from 'generated/prisma'
import { ContadorRepository } from '../contador-repository'

export class InMemoryContadorRepository implements ContadorRepository {
  public items: Contador[] = []

  async findByEmail(email: string) {
    const contador = this.items.find((item) => item.email === email)

    if (!contador) {
      return null
    }

    return contador
  }

  async create(data: Prisma.ContadorCreateInput) {
    const contador = {
      id: 1,
      nome: data.nome,
      email: data.email,
      senhaHash: data.senhaHash,
      criadoEm: new Date(),
    }

    this.items.push(contador)

    return contador
  }
}

import { Contador, Prisma } from 'generated/prisma'
import { ContadorRepository } from '../contador-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryContadorRepository implements ContadorRepository {
  public items: Contador[] = []

  async findById(id: number): Promise<Contador | null> {
    const contador = this.items.find((item) => item.id === id)

    if (!contador) {
      return null
    }

    return contador
  }

  async findByEmail(email: string) {
    const contador = this.items.find((item) => item.email === email)

    if (!contador) {
      return null
    }

    return contador
  }

  async create(data: Prisma.ContadorCreateInput) {
    const contador = {
      id: randomUUID(),
      nome: data.nome,
      email: data.email,
      senhaHash: data.senhaHash,
      criadoEm: new Date(),
    }

    this.items.push(contador)

    return contador
  }
}

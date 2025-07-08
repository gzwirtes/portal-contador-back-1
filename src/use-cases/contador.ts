import { PrismaContadorRepository } from '@/repositories/prisma-contador-repository'
import { prisma } from './../lib/prisma'
import { hash } from 'bcryptjs'

interface ContadorUseCaseRequest {
  nome: string
  email: string
  senhaHash: string
}

export class ContadorUseCase {
  constructor(private contadorRepository: any) {}

  async execute({ nome, email, senhaHash }: ContadorUseCaseRequest) {
    const passHash = await hash(senhaHash, 6)

    const contadorWithSameEmail = await prisma.contador.findUnique({
      where: {
        email,
      },
    })

    if (contadorWithSameEmail) {
      throw new Error('E-mail already exists')
    }

		await this.contadorRepository.create({
      nome,
      email,
      senhaHash: passHash,
    })
  }
}

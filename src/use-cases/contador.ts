import { ContadorRepository } from '@/repositories/contador-repository'
import { hash } from 'bcryptjs'
import { ContadorAlreadyExistsError } from './error/contador-already-exists'
import { Contador } from 'generated/prisma'

interface ContadorUseCaseRequest {
  nome: string
  email: string
  senhaHash: string
}

interface ContadorUseCaseResponse {
  contador: Contador
}

export class ContadorUseCase {
  constructor(private contadorRepository: ContadorRepository) {}

  async execute({
    nome,
    email,
    senhaHash,
  }: ContadorUseCaseRequest): Promise<ContadorUseCaseResponse> {
    const passHash = await hash(senhaHash, 6)

    const contadorWithSameEmail =
      await this.contadorRepository.findByEmail(email)

    if (contadorWithSameEmail) {
      throw new ContadorAlreadyExistsError()
    }

    const contador = await this.contadorRepository.create({
      nome,
      email,
      senhaHash: passHash,
    })

    return {
      contador,
    }
  }
}

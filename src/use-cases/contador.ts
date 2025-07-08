import { ContadorRepository } from '@/repositories/contador-repository'
import { hash } from 'bcryptjs'
import { ContadorAlreadyExistsError } from './error/contador-already-exists'

interface ContadorUseCaseRequest {
  nome: string
  email: string
  senhaHash: string
}

export class ContadorUseCase {
  constructor(private contadorRepository: ContadorRepository) {}

  async execute({ nome, email, senhaHash }: ContadorUseCaseRequest) {
    const passHash = await hash(senhaHash, 6)

    const contadorWithSameEmail = await this.contadorRepository.findByEmail(email)

    if (contadorWithSameEmail) {
      throw new ContadorAlreadyExistsError()
    }

		await this.contadorRepository.create({
      nome,
      email,
      senhaHash: passHash,
    })
  }
}

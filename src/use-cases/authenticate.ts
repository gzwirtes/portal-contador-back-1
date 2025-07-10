import { ContadorRepository } from '@/repositories/contador-repository'
import { InvalidCredentialsError } from './error/invalid-credentials-error'
import { compare } from 'bcryptjs'
import { Contador } from 'generated/prisma'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  user: Contador
}

export class AuthenticateUseCase {
  constructor(private contadorRepository: ContadorRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.contadorRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, user.senhaHash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      user,
    }
  }
}

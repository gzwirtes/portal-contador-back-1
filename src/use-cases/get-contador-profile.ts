import { ContadorRepository } from '@/repositories/contador-repository'
import { Contador } from 'generated/prisma'
import { ResourcesNotFoundError } from './error/resources-not-found'

interface GetContadorProfileUseCaseRequest {
  contadorId: number
}

interface GetContadorProfileUseCaseResponse {
  contador: Contador
}

export class GetContadorProfileUseCase {
  constructor(private contadorRepository: ContadorRepository) {}

  async execute({
    contadorId,
  }: GetContadorProfileUseCaseRequest): Promise<GetContadorProfileUseCaseResponse> {
    const contador = await this.contadorRepository.findById(contadorId)

    if (!contador) {
      throw new ResourcesNotFoundError()
    }

    return {
      contador,
    }
  }
}

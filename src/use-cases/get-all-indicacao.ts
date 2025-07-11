import { Indicacao } from 'generated/prisma'
import { ResourcesNotFoundError } from './error/resources-not-found'
import { IndicacaoRepository } from '@/repositories/indicacao-repository'

interface GetIndicacaoUseCaseRequest {
  contadorId: string
}

interface GetIndicacaoUseCaseResponse {
  indicacoes: Indicacao[]
}

export class GetIndicacaoUseCase {
  constructor(private indicacaoRepository: IndicacaoRepository) {}

  async execute({
    contadorId,
  }: GetIndicacaoUseCaseRequest): Promise<GetIndicacaoUseCaseResponse> {
    console.log(contadorId)
    const indicacoes = await this.indicacaoRepository.findByContador(
      Number(contadorId),
    )

    if (!indicacoes) {
      throw new ResourcesNotFoundError()
    }

    return {
      indicacoes,
    }
  }
}

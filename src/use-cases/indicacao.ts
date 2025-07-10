import { Indicacao, TipoIndicacao } from 'generated/prisma'
import { IndicacaoRepository } from '@/repositories/indicacao-repository'

interface IndicacaoUseCaseRequest {
  nomeIndicado: string
  cnpjIndicado: string
  contadorId: number
  status: string
}

interface IndicacaoUseCaseResponse {
  indicacao: Indicacao
}

export class IndicacaoUseCase {
  constructor(private indicacaoRepository: IndicacaoRepository) {}

  async execute({
    nomeIndicado,
    cnpjIndicado,
    contadorId,
    status,
  }: IndicacaoUseCaseRequest): Promise<IndicacaoUseCaseResponse> {
    const indicacao = await this.indicacaoRepository.create({
      nomeIndicado,
      cnpjIndicado,
      contador: {
        connect: {
          id: contadorId,
        },
      },
      status: TipoIndicacao.PENDENTE,
    })

    return {
      indicacao,
    }
  }
}

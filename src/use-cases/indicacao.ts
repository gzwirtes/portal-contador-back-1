import { Indicacao } from 'generated/prisma'
import { IndicacaoRepository } from '@/repositories/indicacao-repository'

interface IndicacaoUseCaseRequest {
  nomeIndicado: string
  cnpjIndicado: string
  contadorId: number
  status: string
}
interface IndicacaoUsecaseResponse {
  indicacao: Indicacao[]
}

export class IndicacaoUseCase {
  constructor(private indicacaoRepository: IndicacaoRepository) {}

  async execute({
    nomeIndicado,
    cnpjIndicado,
    contadorId,
  }: IndicacaoUseCaseRequest): Promise<IndicacaoUsecaseResponse> {
    const indicacaoExists =
      await this.indicacaoRepository.findByCnpj(cnpjIndicado)

    if (indicacaoExists) {
      throw new Error('CNPJ já indicado')
    }

    const indicacao = await this.indicacaoRepository.create({
      nomeIndicado,
      cnpjIndicado,
      contador: {
        connect: {
          id: contadorId,
        },
      },
    })

    return { indicacao }
  }
}

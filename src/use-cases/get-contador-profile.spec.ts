import { describe } from 'node:test'
import { beforeEach, expect, it } from 'vitest'
import { InMemoryContadorRepository } from '@/repositories/in-memory/in-memory-contador-repository'
import { hash } from 'bcryptjs'
import { GetContadorProfileUseCase } from './get-contador-profile'
import { ResourcesNotFoundError } from './error/resources-not-found'

let contadorRepository: InMemoryContadorRepository
let sut: GetContadorProfileUseCase

describe('Register Profile Use Case', () => {
  beforeEach(() => {
    contadorRepository = new InMemoryContadorRepository()
    sut = new GetContadorProfileUseCase(contadorRepository)
  })

  it('schould be able to get user profile', async () => {
    const createdContador = await contadorRepository.create({
      nome: 'Gustavo Zwirtes',
      email: 'gustavo.zts@gmail.com',
      senhaHash: await hash('123456', 6),
    })

    const { contador } = await sut.execute({
      contadorId: createdContador.id,
    })

    expect(contador.id).toEqual(expect.any(Number))
    expect(contador.nome).toEqual('Gustavo Zwirtes')
  })

  it('should not be able to get contador profile with wrong id', async () => {
    await expect(() =>
      sut.execute({
        contadorId: -154848548569,
      }),
    ).rejects.toBeInstanceOf(ResourcesNotFoundError)
  })
})

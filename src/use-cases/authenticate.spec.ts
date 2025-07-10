import { describe } from 'node:test'
import { beforeEach, expect, it } from 'vitest'
import { InMemoryContadorRepository } from '@/repositories/in-memory/in-memory-contador-repository'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './error/invalid-credentials-error'

let contadorRepository: InMemoryContadorRepository
let sut: AuthenticateUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    contadorRepository = new InMemoryContadorRepository()
    sut = new AuthenticateUseCase(contadorRepository)
  })

  it('schould be able to authenticate', async () => {
    await contadorRepository.create({
      nome: 'Gustavo Zwirtes',
      email: 'gustavo.zts@gmail.com',
      senhaHash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'gustavo.zts@gmail.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(Number))
  })

  it('schould be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'gustavo.zts@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('schould not be able to authenticate with wrong password', async () => {
    await contadorRepository.create({
      nome: 'Gustavo Zwirtes',
      email: 'gustavo.zts@gmail.com',
      senhaHash: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'gustavo.zts@gmail.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})

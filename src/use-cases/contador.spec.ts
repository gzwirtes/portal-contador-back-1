import { describe } from 'node:test'
import { beforeEach, expect, it } from 'vitest'
import { ContadorUseCase } from './contador'
import { compare } from 'bcryptjs'
import { InMemoryContadorRepository } from '@/repositories/in-memory/in-memory-contador-repository'
import { ContadorAlreadyExistsError } from './error/contador-already-exists'

let contadorRepository: InMemoryContadorRepository
let sut: ContadorUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    contadorRepository = new InMemoryContadorRepository()
    sut = new ContadorUseCase(contadorRepository)
  })

  it('schould be able to register', async () => {
    const { contador } = await sut.execute({
      nome: 'Gustavo Zwirtes',
      email: 'gustavo1.zts@gmail.com',
      senhaHash: '123456',
    })

    expect(contador.id).toEqual(expect.any(Number))
  })

  it('schould hash user password upon registration', async () => {
    const { contador } = await sut.execute({
      nome: 'Gustavo Zwirtes',
      email: 'gustavo1.zts@gmail.com',
      senhaHash: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      contador.senhaHash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('schould not be able to register with same email twice', async () => {
    const email = 'gustavo1.zts@gmail.com'

    await sut.execute({
      nome: 'Gustavo Zwirtes',
      email,
      senhaHash: '123456',
    })

    await expect(() =>
      sut.execute({
        nome: 'Gustavo Zwirtes',
        email,
        senhaHash: '123456',
      }),
    ).rejects.toBeInstanceOf(ContadorAlreadyExistsError)
  })
})

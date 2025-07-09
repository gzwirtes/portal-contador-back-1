import { describe } from 'node:test'
import { expect, it } from 'vitest'
import { ContadorUseCase } from './contador'
import { compare } from 'bcryptjs'
import { InMemoryContadorRepository } from '@/repositories/in-memory/in-memory-contador-repository'
import { ContadorAlreadyExistsError } from './error/contador-already-exists'

describe('Register Use Case', () => {
  it('schould be able to register', async () => {
    const contadorRepository = new InMemoryContadorRepository()
    const contadorUseCase = new ContadorUseCase(contadorRepository)

    const { contador } = await contadorUseCase.execute({
      nome: 'Gustavo Zwirtes',
      email: 'gustavo1.zts@gmail.com',
      senhaHash: '123456',
    })

    expect(contador.id).toEqual(expect.any(Number))
  })

  it('schould hash user password upon registration', async () => {
    const contadorRepository = new InMemoryContadorRepository()
    const contadorUseCase = new ContadorUseCase(contadorRepository)

    const { contador } = await contadorUseCase.execute({
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
    const contadorRepository = new InMemoryContadorRepository()
    const contadorUseCase = new ContadorUseCase(contadorRepository)

    const email = 'gustavo1.zts@gmail.com'

    await contadorUseCase.execute({
      nome: 'Gustavo Zwirtes',
      email,
      senhaHash: '123456',
    })

    await expect(() =>
      contadorUseCase.execute({
        nome: 'Gustavo Zwirtes',
        email,
        senhaHash: '123456',
      }),
    ).rejects.toBeInstanceOf(ContadorAlreadyExistsError)
  })
})

export class ContadorAlreadyExistsError extends Error {
  constructor() {
    super('E-mail already exists!')
  }
}

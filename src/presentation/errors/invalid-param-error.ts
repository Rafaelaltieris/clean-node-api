export class InvalidParamError extends Error {
  constructor (paramName: string) {
    // eslint-disable-next-line no-template-curly-in-string
    super('Invalid param:${paramName}')
    this.name = 'InvalidParamError'
  }
}

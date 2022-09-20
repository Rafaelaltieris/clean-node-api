/* eslint-disable no-template-curly-in-string */
export class MissingParamError extends Error {
  constructor (paramName: string) {
    super('Missing param: ${paramName}')
    this.name = 'MissingParamError'
  }
}

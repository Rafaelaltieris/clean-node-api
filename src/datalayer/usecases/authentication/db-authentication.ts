import { Authentication, AuthenticationModel } from '../../../domain/usecase/authentication'
import { LoadAccountByEmailRepository } from '../../protocols/db/load-account-by-email-repository'
import { HashComparer } from '../../protocols/cryptografy/hash-comparer'

export class DbAuthentication implements Authentication {
  private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  private readonly hashComparer: HashComparer

  constructor (LoadAccountByEmailRepository: LoadAccountByEmailRepository, hashComparer: HashComparer) {
    this.loadAccountByEmailRepository = LoadAccountByEmailRepository
    this.hashComparer = hashComparer
  }

  async auth (authentication: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.load(authentication.email)
    if (account) {
      await this.hashComparer.compare(authentication.password, account.password)
    }
    return null
  }
}

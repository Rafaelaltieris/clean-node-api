import { Authentication, AuthenticationModel } from '../../../domain/usecase/authentication'
import { LoadAccountByEmailRepository } from '../../protocols/db/load-account-by-email-repository'
import { HashComparer } from '../../protocols/cryptografy/hash-comparer'
import { TokenGenerator } from '../../protocols/cryptografy/token-generator'
import { UpdateAccessTokenRepository } from '../../protocols/db/update-access-token-repository'

export class DbAuthentication implements Authentication {
  private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  private readonly hashComparer: HashComparer
  private readonly tokenGenerator: TokenGenerator
  private readonly updateAccessTokenRepository: UpdateAccessTokenRepository

  constructor (LoadAccountByEmailRepository: LoadAccountByEmailRepository, hashComparer: HashComparer, tokenGenerator: TokenGenerator, updateAccessTokenRepository: UpdateAccessTokenRepository) {
    this.loadAccountByEmailRepository = LoadAccountByEmailRepository
    this.hashComparer = hashComparer
    this.tokenGenerator = tokenGenerator
    this.updateAccessTokenRepository = updateAccessTokenRepository
  }

  async auth (authentication: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.load(authentication.email)
    if (account) {
      const isValid = await this.hashComparer.compare(authentication.password, account.password)
      if (isValid) {
        const accessToken = await this.tokenGenerator.generate(account.id)
        await this.updateAccessTokenRepository.update(account.id, accessToken)
        return accessToken
      }
    }
    return null
  }
}

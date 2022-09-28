import { AddAccountRepository } from '../../../../datalayer/protocols/add-account-repository'
import { AddAccountModel } from '../../../../domain/usecase/add_account'
import { AccountModel } from '../../../../domain/models/account'
import { MongoHelper } from './helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository {
  async add (account: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const { insertedId } = await accountCollection.insertOne(account)
    const accountFind = await accountCollection.findOne<AccountModel>()
    return Object.assign({}, accountFind, { id: insertedId })
  }
}

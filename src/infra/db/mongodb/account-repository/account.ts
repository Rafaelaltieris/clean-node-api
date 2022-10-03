import { AddAccountRepository } from '../../../../datalayer/protocols/add-account-repository'
import { AddAccountModel } from '../../../../domain/usecase/add_account'
import { AccountModel } from '../../../../domain/models/account'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne({ ...accountData })
    return { ...accountData, id: result.insertedId.toString() }
  }
}

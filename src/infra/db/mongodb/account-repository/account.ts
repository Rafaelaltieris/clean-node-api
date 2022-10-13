import { AddAccountRepository } from '../../../../datalayer/protocols/db/add-account-repository'
import { AddAccountModel } from '../../../../domain/usecase/add_account'
import { AccountModel } from '../../../../domain/models/account'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne({ ...accountData })
    return { ...accountData, id: result.insertedId.toString() }
  }
}

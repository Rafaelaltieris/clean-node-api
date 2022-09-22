import { AccountModel } from '../models/account'

export interface AddAccountModel {
  name: String
  email: string
  password: string
}

export interface AddAccount {
  add: (account: AddAccountModel) => Promise<AccountModel>
}

import { AccountModel } from '../models/account'

export interface AddAccountModel {
  name: String
  email: string
  password: string
}

export interface AddAccount {
  // eslint-disable-next-line @typescript-eslint/method-signature-style
  add (account: AddAccountModel): Promise<AccountModel>
}

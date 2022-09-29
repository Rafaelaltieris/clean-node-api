import { Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient,

  async connect (url: string): Promise<void> {
    this.client = await MongoClient.connect(process.env.MONGO_URL, {
    })
  },

  async disconnect (): Promise<void> {
    await this.client?.close()
  },

  getCollection (name: string): Collection {
    return this.client.db().collection(name)
  },

  map: async (collection: any): Promise<any> => {
    const accountCollection = MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne({ ...collection })
    return { ...collection, id: (result).insertedId.toString() }
  }
}

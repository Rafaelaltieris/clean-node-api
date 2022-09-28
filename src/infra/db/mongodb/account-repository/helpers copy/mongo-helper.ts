import { Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient,

  async connect (url: string): Promise<void> {
    await this.client = MongoClient.connect(process.env.MONGO__URL, {
      
    })
  },

  async disconnect (): Promise<void> {
    await this.client?.close()
  },

  getCollection (name: string): Collection {
    return this.client.db().collection(name)
  }
}

import { MongoClient } from 'mongodb';

const client = new MongoClient('mongodb+srv://augusto:guv9014@omnistack.cebkf.mongodb.net/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default async function connect() {
  // if (!client.isConnected()) await client.connect();
  await client.connect();

  const db = client.db('curso-lorena');
  return {
    db,
    client
  }
}
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connect from '../../utils/database';
import NextCors from 'nextjs-cors';

export default async function handler(req, res) {

  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  if (req.method === 'POST') {
    const { email, name, phone } = req.body;
    
    if (!name || !email) {
      res.status(400).json({ error: 'Nome or Email is missing!' });
      return;
    }

    if (name.length <= 2) {
        res.status(400).json({ error: 'Nome must have from 3 to 14 caracaters!' });
        return;
    }
    
    const { db } = await connect();
    
    await db.collection('pre-cadastro').insertOne({
      email,
      name,
      phone,
    });
    res.status(200).json({ message: 'Success!' });
  } else {
    res.status(400).json({ error: 'Wrong request method' })
  }

}

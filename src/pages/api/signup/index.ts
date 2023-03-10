import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import { verifyAlreadyHasUser } from './_utils';
import { createUser, getAllUser } from 'src/lib/prisma/users';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //TODO: Remover metodo get que busca todos os usuários
  if (req.method === 'POST') {
    const data = req.body;

    const hasUser = await verifyAlreadyHasUser(data.email);
    if (hasUser) {
      res.status(406).json({ message: 'Email já cadastrado' });
      return;
    }

    data.senha = bcrypt.hashSync(data.senha, 10);
    const createdUser = await createUser(data);
    res.status(200).json({ data: createdUser });
  } else if (req.method === 'GET') {
    const allUsers = await getAllUser();
    res.status(200).json({ data: allUsers });
  } else {
    throw new Error('Only Post method allowed!');
  }
}

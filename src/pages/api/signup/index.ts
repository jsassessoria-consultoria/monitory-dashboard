import { createUser, getAllUser } from '../db/users';
import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import {
  validateEmail,
  validatePassword,
  verifyAlreadyHasUser
} from './_utils';

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

    const validEmail = validateEmail(data.email);
    if (validEmail === null) {
      res.status(406).json({ message: 'Email inválido' });
      return;
    }

    const validSenha = validatePassword(data.senha);
    if (validSenha === null) {
      res
        .status(406)
        .json({ message: 'Senha precisa ter 8 ou mais caracteres' });
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

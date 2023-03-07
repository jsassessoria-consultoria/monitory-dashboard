import { createUser, getAllUser } from '../db/users';
import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const data = req.body;
    data.password = bcrypt.hashSync(data.password, 10);
    const createdUser = await createUser(data);
    res.status(201).json({ data: createdUser });
  } else if (req.method === 'GET') {
    const allUsers = await getAllUser();
    res.status(200).json({ data: allUsers });
  } else {
    throw new Error('Only Post method allowed!');
  }
}

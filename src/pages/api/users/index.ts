import { createUser, getAllUser } from '../db/users';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const data = req.body;
    const createdUser = await createUser(data);
    res.status(201).json({ data: createdUser });
  }

  if (req.method === 'GET') {
    const allUsers = await getAllUser();
    res.status(200).json({ data: allUsers });
  } else {
    throw new Error('Only Get/Post method allowed!');
  }
}

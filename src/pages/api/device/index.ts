import type { NextApiRequest, NextApiResponse } from 'next';
import { getDevices } from 'src/lib/prisma/devices';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const allDevices = getDevices();
    res.status(200).send({ data: allDevices });
  } else if (req.method === 'POST') {
    res.status(201).send('POST');
  } else if (req.method === 'PUT') {
    res.status(202).send('PUT');
  } else if (req.method === 'DELETE') {
    res.status(204).send('DELETE');
  } else {
    res
      .status(500)
      .send({ message: `Método ${req.method} não é permitido` });
  }
}

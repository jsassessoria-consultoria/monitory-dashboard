import type { NextApiRequest, NextApiResponse } from 'next';
import {
  createDevice,
  getDevices,
  getOneDevice
} from 'src/lib/prisma/devices';
import { generateToken } from 'src/lib/uuid';
import { schemaValidator } from 'src/middleware/schemaValidator';
import { deviceSchema } from 'src/schemas/deviceSchema';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    //TODO: Validar token via header bearer token
    const allDevices = await getDevices();
    res.status(200).send({ data: allDevices });
  } else if (req.method === 'POST') {
    const { nome } = req.body;

    const validateBody = await schemaValidator(
      deviceSchema,
      req.body
    );
    if (validateBody.errors) {
      res.status(406).json({ message: validateBody.errors });
      return;
    }

    const alreadyHasUser = await getOneDevice(nome);
    if (alreadyHasUser) {
      res
        .status(406)
        .json({ message: 'Nome do dispositivo já cadastrado' });
      return;
    }

    const generatedToken = generateToken();
    await createDevice(req.body, generatedToken);

    res.status(201).send({ data: { token: generatedToken } });
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

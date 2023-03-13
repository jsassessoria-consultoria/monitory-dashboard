import type { NextApiRequest, NextApiResponse } from 'next';
import {
  createDevice,
  deleteDevice,
  getDevices,
  getIdDevice,
  getOneDevice
} from 'src/lib/prisma/devices';
import { generateToken } from 'src/lib/uuid';
import { schemaValidator } from 'src/middleware/schemaValidator';
import { deleteDeviceSchema } from 'src/schemas/deleteDeviceSchema';
import { deviceSchema } from 'src/schemas/deviceSchema';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //TODO: Validar todas as rotas cm token via header bearer token
  if (req.method === 'GET') {
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
    const { id } = req.body;

    const validateBody = await schemaValidator(
      deleteDeviceSchema,
      req.body
    );
    if (validateBody.errors) {
      res.status(406).json({ message: validateBody.errors });
      return;
    }

    try {
      const device = await getIdDevice(id);
      if (device?.Token.length !== 0) {
        await deleteDevice(device?.Token[0].id);
        res.status(204).end();
        return;
      }
      res
        .status(404)
        .send({
          message: `Token do usuário: ${device?.nome} não encontrado!`
        });
    } catch (error: any) {
      res.status(404).send({ message: error.message });
    }
  } else {
    res
      .status(500)
      .send({ message: `Método ${req.method} não é permitido` });
  }
}

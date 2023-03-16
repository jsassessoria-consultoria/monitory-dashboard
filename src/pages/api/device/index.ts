import type { NextApiRequest, NextApiResponse } from 'next';
import {
  createDevice,
  deleteDevice,
  getDevices,
  getIdDevice,
  getOneDeviceByNameAndUser,
  getOnlyIdDevice,
  updateDevice
} from 'src/lib/prisma/devices';
import { generateToken } from 'src/lib/uuid';
import { schemaValidator } from 'src/middleware/schemaValidator';
import { deleteDeviceSchema } from 'src/schemas/deleteDeviceSchema';
import { deviceSchema } from 'src/schemas/deviceSchema';
import { updateDeviceSchema } from 'src/schemas/updateDeviceSchema';
import { getAllBuilder } from 'src/utils/api/jsonBuilder';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //TODO: Validar todas as rotas cm token via header bearer token
  if (req.method === 'GET') {
    const allDevices = await getDevices();
    const allDevicesFormated = getAllBuilder(allDevices);
    try {
      res.status(200).send({ data: allDevicesFormated });
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  } else if (req.method === 'POST') {
    const { nome, usuario } = req.body;

    const validateBody = await schemaValidator(
      deviceSchema,
      req.body
    );
    if (validateBody.errors) {
      res.status(406).json({ message: validateBody.errors });
      return;
    }

    const alreadyHasUser = await getOneDeviceByNameAndUser(
      nome,
      usuario
    );
    if (alreadyHasUser) {
      res.status(406).json({
        message:
          'Já existe um usuário com esse dispositivo cadastrado'
      });
      return;
    }

    const generatedToken = generateToken();
    await createDevice(req.body, generatedToken);

    res.status(201).send({ data: { token: generatedToken } });
  } else if (req.method === 'PUT') {
    const { id, nome, usuario } = req.body;

    const validateBody = await schemaValidator(
      updateDeviceSchema,
      req.body
    );
    if (validateBody.errors) {
      res.status(406).json({ message: validateBody.errors });
      return;
    }

    try {
      await getOnlyIdDevice(id);
    } catch (error) {
      res
        .status(404)
        .json({ message: 'Não existe dispositivo com Id: ' + id });
      return;
    }

    const alreadyHasUserAndDevice = await getOneDeviceByNameAndUser(
      nome,
      usuario
    );
    if (
      alreadyHasUserAndDevice &&
      alreadyHasUserAndDevice.Token.length !== 0
    ) {
      res.status(406).json({
        message:
          'Já existe um usuário com esse dispositivo cadastrado'
      });
      return;
    }

    try {
      const updatedUser = await updateDevice(id, nome, usuario);
      res.status(200).send({ data: updatedUser });
      return;
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
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
    } catch (error: any) {
      res
        .status(404)
        .send({ message: 'Não existe dispositivo com Id: ' + id });
    }
  } else {
    res
      .status(500)
      .send({ message: `Método ${req.method} não é permitido` });
  }
}

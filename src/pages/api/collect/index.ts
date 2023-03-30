import { NextApiRequest, NextApiResponse } from 'next';
import {
  createOneTempoMonitorado,
  getOneTempoMonitorado,
  getUserToken,
  updateLocation,
  updateOneTempoMonitorado
} from 'src/lib/prisma/collect';
import { schemaValidator } from 'src/middleware/schemaValidator';
import { collectSchema } from 'src/schemas/collectSchema';
import { dateFormatter } from 'src/utils/api/dateFormatter';
import { removeBearerTokenPrefix } from 'src/utils/api/removeBearerTokenPrefix';
import { removeDuplicates } from 'src/utils/api/removeDuplicates';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { processes, geolocation } = req.body;

    const validateBody = await schemaValidator(
      collectSchema,
      req.body
    );
    if (validateBody.errors) {
      res.status(406).json({ message: validateBody.errors });
      return;
    }

    const { authorization } = req.headers;
    if (!authorization) {
      res.status(401).json({
        message:
          'Necessário enviar Token do usuário nos HEADERS da requisição com chave: "token"'
      });
      return;
    }
    const tokenWoBearer = removeBearerTokenPrefix(
      String(authorization)
    );
    const hasToken = await getUserToken(tokenWoBearer);
    if (!hasToken) {
      res
        .status(401)
        .json({ message: `O token: ${authorization} é inválido` });
      return;
    }

    const uniqueValues = removeDuplicates(processes);
    const todayDate = dateFormatter(new Date());

    if (
      geolocation.lat !== null &&
      geolocation.long !== null &&
      geolocation.isAccuracy !== null
    ) {
      try {
        await updateLocation(hasToken.dispositivo_id, geolocation);
      } catch (error) {
        throw new Error();
      }
    }

    try {
      uniqueValues.forEach(async process => {
        const hasTempoMonitorado = await getOneTempoMonitorado(
          todayDate,
          hasToken.dispositivo_id,
          process
        );

        if (hasTempoMonitorado) {
          try {
            await updateOneTempoMonitorado(hasTempoMonitorado.id);
          } catch (error: any) {
            throw new Error();
          }
        } else {
          await createOneTempoMonitorado(
            todayDate,
            process,
            hasToken.dispositivo_id
          );
        }
      });
      return res.status(200).json({
        data: hasToken,
        message: 'Processos atualizados',
        processes: uniqueValues
      });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  } else {
    res
      .status(500)
      .send({ message: `Método ${req.method} não é permitido` });
  }
}

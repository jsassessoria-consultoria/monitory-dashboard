import { NextApiRequest, NextApiResponse } from 'next';
import {
  createOneTempoMonitorado,
  getOneTempoMonitorado,
  getUserToken,
  updateOneTempoMonitorado
} from 'src/lib/prisma/collect';
import { schemaValidator } from 'src/middleware/schemaValidator';
import { collectSchema } from 'src/schemas/collectSchema';
import { dateFormatter } from 'src/utils/api/dateFormatter';
import { removeDuplicates } from 'src/utils/api/removeDuplicates';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { processes } = req.body;

    const validateBody = await schemaValidator(
      collectSchema,
      req.body
    );
    if (validateBody.errors) {
      res.status(406).json({ message: validateBody.errors });
      return;
    }

    const { token } = req.headers;
    if (!token) {
      res
        .status(401)
        .json({
          message:
            'Necessário enviar Token do usuário nos HEADERS da requisição com chave: "token"'
        });
      return;
    }

    const hasToken = await getUserToken(String(token));
    if (!hasToken) {
      res
        .status(401)
        .json({ message: `O token: ${hasToken} é inválido` });
      return;
    }

    const uniqueValues = removeDuplicates(processes);
    const todayDate = dateFormatter(new Date());

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
        try {
          await createOneTempoMonitorado(
            todayDate,
            process,
            hasToken.dispositivo_id
          );
        } catch (error: any) {
          throw new Error();
        }
      }
    });
    return res
      .status(200)
      .json({
        data: hasToken,
        message: 'Processos atualizados',
        processes: uniqueValues
      });
  } else {
    res
      .status(500)
      .send({ message: `Método ${req.method} não é permitido` });
  }
}

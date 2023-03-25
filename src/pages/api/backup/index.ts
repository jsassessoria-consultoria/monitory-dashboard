import { NextApiRequest, NextApiResponse } from 'next';
import {
  backupCreateOneTempoMonitorado,
  backupUpdateOneTempoMonitorado,
  getOneTempoMonitorado,
  getUserToken
} from 'src/lib/prisma/collect';
import { countBackupProcesses } from 'src/utils/api/countBackupProcesses';
import { countProcesses } from 'src/utils/api/countProcesses';
import { removeBearerTokenPrefix } from 'src/utils/api/removeBearerTokenPrefix';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { token } = req.headers;
    if (!token) {
      res.status(401).json({
        message:
          'Necessário enviar Token do usuário nos HEADERS da requisição com chave: "token"'
      });
      return;
    }
    const tokenWoBearer = removeBearerTokenPrefix(String(token));
    const hasToken = await getUserToken(tokenWoBearer);
    if (!hasToken) {
      res
        .status(401)
        .json({ message: `O token: ${token} é inválido` });
      return;
    }

    let daysAndProcesses: any = [];
    const bodyFormat = countBackupProcesses([req.body]);
    bodyFormat.forEach(element => {
      const temp = countProcesses(element);
      daysAndProcesses.push(temp);
    });

    try {
      daysAndProcesses.forEach(async (days: any) => {
        days.processos.forEach(async (processoDay: any) => {
          const existProcess = await getOneTempoMonitorado(
            days.dia,
            hasToken.dispositivo_id,
            processoDay.name
          );
          if (existProcess) {
            await backupUpdateOneTempoMonitorado(
              existProcess.id,
              processoDay.time
            );
          } else {
            await backupCreateOneTempoMonitorado(
              days.dia,
              processoDay.name,
              hasToken.dispositivo_id,
              processoDay.time
            );
          }
        });
      });
      return res
        .status(200)
        .json({
          processes: daysAndProcesses,
          message: 'backup realizado'
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

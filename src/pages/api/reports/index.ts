import type { NextApiRequest, NextApiResponse } from 'next';
import { getOnlyIdDevice } from 'src/lib/prisma/devices';
import { getTempoMonitorado } from 'src/lib/prisma/tempoMonitorado';
import { schemaValidator } from 'src/middleware/schemaValidator';
import { pdfSchema } from 'src/schemas/pdfSchema';
import { filterByDate } from 'src/utils/api/filterByDate';
import { getAllTempoMonitoradoBuilder } from 'src/utils/api/jsonBuilder';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if (req.method === 'POST') {
    const { id, startDate, endDate } = req.body;

    const validateBody = await schemaValidator(pdfSchema, req.body);
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

    const reports = await getTempoMonitorado(id);
    const reportsBeetweenDates = filterByDate(
      reports,
      startDate,
      endDate
    );
    const reportsJson = getAllTempoMonitoradoBuilder(
      reportsBeetweenDates
    );

    res.status(200).json({ data: reportsJson });
  } else {
    res
      .status(500)
      .send({ message: `Método ${req.method} não é permitido` });
  }
}

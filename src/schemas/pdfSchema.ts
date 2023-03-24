import { object, string, InferType } from 'yup';

export const pdfSchema = object({
  id: string().required(),
  startDate: string().required(),
  endDate: string().required()
});

export type Pdf = InferType<typeof pdfSchema>;

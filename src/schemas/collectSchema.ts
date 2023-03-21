import { object, InferType, array } from 'yup';

export const collectSchema = object({
  processes: array().required()
});

export type Collect = InferType<typeof collectSchema>;

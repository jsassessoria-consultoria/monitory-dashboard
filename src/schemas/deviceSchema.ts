import { object, string, InferType } from 'yup';

export const deviceSchema = object({
  usuario: string().required(),
  nome: string().required()
});

export type Device = InferType<typeof deviceSchema>;

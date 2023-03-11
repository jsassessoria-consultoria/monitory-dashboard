import { object, string, InferType } from 'yup';

export const deviceSchema = object({
  nome: string().required(),
  localizacao: string().required()
});

export type Device = InferType<typeof deviceSchema>;

import { object, string, InferType } from 'yup';

export const updateDeviceSchema = object({
  id: string().required(),
  nome: string(),
  usuario: string()
});

export type DeleteDevice = InferType<typeof updateDeviceSchema>;

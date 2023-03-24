import { object, string, InferType } from 'yup';

export const deleteDeviceSchema = object({
  id: string().required()
});

export type DeleteDevice = InferType<typeof deleteDeviceSchema>;

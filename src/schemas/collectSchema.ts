import { object, InferType, array, string, boolean } from 'yup';

export const collectSchema = object({
  processes: array().required(),
  geolocation: object()
    .shape({
      isAccuracy: boolean().nullable(),
      lat: string().nullable(),
      long: string().nullable()
    })
    .required()
});

export type Collect = InferType<typeof collectSchema>;

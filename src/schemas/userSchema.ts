import { object, string, InferType } from 'yup';

export const userSchema = object({
  email: string().required().email(),
  senha: string().required().min(8)
});

export type User = InferType<typeof userSchema>;

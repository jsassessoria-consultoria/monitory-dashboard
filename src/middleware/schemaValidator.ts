export async function schemaValidator(schema: any, data: any) {
  try {
    const validate = await schema.validate(data, {
      abortEarly: false,
      stripUnknown: true
    });
    return validate;
  } catch (error) {
    return error;
  }
}

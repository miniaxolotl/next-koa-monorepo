import Joi from 'joi';

export const validateSchema = <T = unknown>(
  Schema: Joi.ObjectSchema,
  data: Record<string, unknown>,
  options?: Joi.ValidationOptions,
) => {
  const { value, error } = Schema.validate(data, {
    abortEarly: false,
    errors: { escapeHtml: true },
    ...options,
  });
  if (error)
    return {
      value: null,
      error: error.details.map((e) => e.message.replace(/"/g, '')),
    } as { value: null; error: string[] };
  return {
    value,
    error: null,
  } as { value: T; error: null };
};

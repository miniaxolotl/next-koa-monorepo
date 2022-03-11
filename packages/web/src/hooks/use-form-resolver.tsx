import Joi from 'joi';

export const useJoiValidationResolver =
  <T extends { [key: string]: string }, K = Partial<T>>(schema: Joi.Schema) =>
  (data: K) => {
    const keys = Object.keys(data);
    const _schema =
      keys.length > 1
        ? schema
        : keys[0]
        ? Joi.object({
            [keys[0]]: schema.extract(keys[0]),
          })
        : schema;
    const { value, error } = _schema.validate(data, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error)
      return {
        values: value as K,
        errors: error.details.reduce(
          (messages, message) => ({
            ...messages,
            [message.path[0]]: message.message,
          }),
          {} as K,
        ),
      };
    return {
      values: value as K,
      errors: {} as K,
    };
  };

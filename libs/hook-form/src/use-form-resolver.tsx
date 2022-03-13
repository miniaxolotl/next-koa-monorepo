import Joi from 'joi';

import { HookFormState } from './use-hook-form';

export const useJoiValidationResolver = <T extends { [key: string]: string }>(schema: Joi.Schema) => {
  return (
    data: Partial<{
      [key: string]: string;
    }>,
  ) => {
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
        values: value,
        errors: error.details.reduce(
          (messages, message) => ({
            ...messages,
            [message.path[0]]: message.message,
          }),
          {},
        ),
      } as HookFormState<Partial<T>>;
    return {
      values: value,
      errors: {},
    } as HookFormState<Partial<T>>;
  };
};

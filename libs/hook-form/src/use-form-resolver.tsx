import Joi from 'joi';

import { HookFormState } from './use-hook-form';

export type HookFormResolver<T = { [key: string]: string }, K = Partial<T>> = (
  data: Partial<{ [key in keyof T]: string }>,
  options?: { resolve?: boolean },
) => HookFormState<K>;

export const useJoiValidationResolver = <T extends { [key: string]: string }>(schema: Joi.Schema) => {
  return (
    data: Partial<{
      [key: string]: string;
    }>,
    options?: { resolve?: boolean },
  ) => {
    const keys = Object.keys(data);
    const _schema = options?.resolve
      ? schema
      : keys.length > 1
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

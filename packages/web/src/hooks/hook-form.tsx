import Joi from 'joi';
import { SyntheticEvent, useEffect, useMemo } from 'react';
import { useJoiValidationResolver } from './form-resolver';
import { createID } from '@libs/utility/src/uid';

const state: { [key: string]: HookFormState } = {};
let counter = 0;

export type SubmitFunc<T> = (data: T, errors?: Partial<T>) => void;

export type HookFormRegisterOptions = {
  id?: string;
  name?: string;
  label?: string;
};

export type HookFormState<T = { [key: string]: string }> = {
  values: Partial<T>;
  errors: Partial<T>;
};

export type HookFormStateProps<T> = {
  id?: string;
  options?: HookFormOptions<T>;
};

export type HookFormProps<T> = {
  schema: Joi.Schema;
  options?: HookFormOptions<T>;
};

export type HookFormOptions<T, K = Partial<T>> = {
  defaultValues?: { [key: string]: string };
  resolver?: (data: K) => { values: K; errors: K };
};

const HookFormState = <T extends { [key: string]: string }, K = Partial<T>>({
  id,
  options: { defaultValues, resolver } = {},
}: HookFormStateProps<T>) => {
  const getValue = (name: keyof T) => {
    return state[id].values[name as string];
  };

  const getError = (name: keyof T) => {
    return state[id].errors[name as string];
  };

  const setValue = (name: keyof T, value?: string) => {
    return (state[id].values = {
      ...state[id].values,
      [name]: value,
    });
  };

  const setError = (name: keyof T, value?: string) => {
    return (state[id].errors = {
      ...state[id].errors,
      [name]: value,
    });
  };

  const eventFunc = (name: string, value: string) => {
    const res = resolver({ [name]: value } as Partial<T>);
    setValue(name, value);
    setError(name, res.errors[name]);
  };

  const register = (key: string, { label, id, name }: HookFormRegisterOptions = {}) => {
    useEffect(() => {
      setValue(key, defaultValues[key]);
      setError(key);
    }, []);
    return {
      onChange: eventFunc,
      id: id ?? key,
      name: name ?? key,
      label: label ?? key,
      value: defaultValues[key] ?? '',
    };
  };

  const handleSubmit = (onSubmit: SubmitFunc<T>) => {
    return (event: SyntheticEvent<HTMLFormElement>) => {
      event.preventDefault();
      event.stopPropagation();
      const res = resolver(state[id].values as Partial<T>);
      if (Object.keys(res.errors).length > 0) {
        return onSubmit(state[id].values as T, res.errors);
      }
      return onSubmit(state[id].values as T, null);
    };
  };
  return { register, handleSubmit, state: { setValue, getValue, setError, getError } };
};

export const useHookForm = <T extends { [key: string]: string }, K = Partial<T>>({
  schema,
  options: { defaultValues, resolver } = {},
}: HookFormProps<T>) => {
  const id = useMemo(() => {
    ++counter;
    return createID();
  }, [counter]);

  useEffect(() => {
    return () => {
      delete state[id];
      --counter;
    };
  }, []);

  state[id] = { values: {}, errors: {} };

  return useMemo(
    () =>
      HookFormState({
        id,
        options: {
          defaultValues,
          resolver: resolver ?? useJoiValidationResolver<T>(schema),
        },
      }),
    [state[id].values, state[id].errors],
  );
};

// export default useHookForm;
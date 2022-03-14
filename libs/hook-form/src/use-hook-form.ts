import Joi from 'joi';
import { startCase } from 'lodash';
import { MutableRefObject, SyntheticEvent, useEffect, useMemo, useRef } from 'react';

import { uuid } from '@libs/utility';

import { useForceUpdate } from '@libs/hooks';

import { HookFormResolver, useJoiValidationResolver } from './use-form-resolver';

export type HandleSubmit<T> = (
  data: Partial<{ [key in keyof T]: string }>,
  errors?: Partial<{ [key in keyof T]: string }>,
) => void;

export type HookFormState<T> = {
  values: Partial<{ [key in keyof T]: string }>;
  errors: Partial<{ [key in keyof T]: string }>;
};

export type HookFormConfig<T> = {
  schema: Joi.Schema;
  options: HookFormConfigOptions<T>;
};

export type HookFormConfigOptions<T = { [key: string]: string }> = {
  id: string;
  defaultValues: Partial<{ [key: string]: string }>;
  resolver: HookFormResolver<T>;
};

const createHookForm = <T = { [key: string]: string }>(
  state: MutableRefObject<HookFormState<T>>,
  { options }: HookFormConfig<T>,
) => {
  const { id, defaultValues, resolver } = options;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const forceUpdate = useForceUpdate();

  const setValue = (key: keyof T, value?: string) => {
    state.current.values[key as string] = value ?? undefined;
  };

  const getValue = (key: keyof T) => {
    return state.current.values[key];
  };

  const setError = (key: keyof T, value?: string) => {
    state.current.errors[key as string] = value ?? undefined;
  };

  const getError = (key: keyof T) => {
    return state.current.errors[key] ?? undefined;
  };

  const handleChange = (key: string, value: string) => {
    const res = resolver({ [key]: value } as Partial<{
      [key in keyof T]: string;
    }>);
    setValue(key as keyof T, value);
    setError(key as keyof T, res.errors[key as string]);
    // forceUpdate();
  };

  const register = (key: keyof T) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      setValue(key, getValue(key) ?? defaultValues ? defaultValues[key as string] : '');
      setError(key);
    }, [key]);
    return {
      key,
      onChange: handleChange,
      id: `${key}-${id}` ?? (key as string),
      name: key,
      value: getValue(key),
      placeholder: startCase(key as string),
      geterror: () => getError(key),
    };
  };

  const handleSubmit = (onSubmit: HandleSubmit<T>) => {
    return (event: SyntheticEvent<HTMLFormElement>) => {
      event.preventDefault();
      event.stopPropagation();
      const res = resolver(state.current.values, { resolve: true });
      state.current.errors = res.errors;
      state.current.values = res.values;
      forceUpdate();
      if (Object.keys(res.errors).length > 0) {
        return onSubmit(state.current.values, res.errors);
      }
      return onSubmit(state.current.values);
    };
  };
  return { register, handleSubmit, state: { setValue, getValue, setError, getError } };
};

export const useHookForm = <T extends { [key: string]: string }>({
  schema,
  options: { id, defaultValues, resolver } = {},
}: Omit<HookFormConfig<T>, 'options'> & {
  options?: Partial<HookFormConfigOptions<T>>;
}) => {
  const formID = useMemo(() => id ?? uuid(), [id]);
  const state = useRef<HookFormState<T>>({
    values: {},
    errors: {},
  });
  useEffect(() => {
    return () => {
      // do nothing
    };
  }, [id]);

  return createHookForm(state, {
    schema,
    options: {
      id: formID,
      defaultValues: defaultValues ?? {},
      // eslint-disable-next-line react-hooks/rules-of-hooks
      resolver: resolver ?? useJoiValidationResolver<T>(schema),
    },
  });
};

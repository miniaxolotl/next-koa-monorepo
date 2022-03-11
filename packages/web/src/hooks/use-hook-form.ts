import Joi from 'joi';
import { SyntheticEvent, useCallback, useEffect, useMemo } from 'react';

import { uuid } from '@libs/utility';

import { useJoiValidationResolver } from './use-form-resolver';
import { useHookFormData, useHookFormValue } from './HookFormProvider';

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
  defaultValues?: Partial<{ [key in keyof T]: string }>;
  resolver?: (data: K) => { values: K; errors: K };
};

const HookFormState = <T extends { [key: string]: string }>({
  id,
  options: { defaultValues, resolver } = {},
}: HookFormStateProps<T>) => {
  const state = useHookFormValue();
  const { setValue, setError } = useHookFormData();

  const getValue = useCallback(
    (name: keyof T) => {
      return state[id]?.values[name as string] ?? '';
    },
    [id, state],
  );

  const getError = useCallback(
    (name: keyof T) => {
      return state[id]?.errors[name as string] ?? null;
    },
    [id, state],
  );

  const _setValue = useCallback(
    (key: keyof T, value?: string) => {
      setValue(id, key as string, value);
    },
    [id, setValue],
  );

  const _setError = useCallback(
    (key: keyof T, value?: string) => {
      setError(id, key as string, value);
    },
    [id, setError],
  );

  const onChangeFunc = (key: string, value: string) => {
    const res = resolver({
      [key]: value,
    } as Partial<T>);
    _setValue(key, value);
    _setError(key, res.errors[key]);
    return res.errors[key] as string;
  };

  const register = (key: keyof T, { name }: HookFormRegisterOptions = {}) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      _setValue(key, getValue(key) === '' ? defaultValues?.[key] ?? '' : getValue(key));
      // _setValue(key, defaultValues?.[key] ?? '');
      _setError(key, getError(key) ?? null);
      console.log(getValue(key));
    }, [key]);
    return {
      onChange: onChangeFunc,
      key: `${key}-${id}`,
      form: id,
      name: name ?? (key as string),
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
  return {
    register,
    handleSubmit,
    state: {
      setValue: _setValue,
      getValue,
      setError: _setError,
      getError,
    },
  };
};

export const useHookForm = <T extends { [key: string]: string }>({
  schema,
  options: { defaultValues, resolver } = {},
}: HookFormProps<T>) => {
  const id = useMemo(() => {
    return uuid();
  }, []);
  useEffect(() => {
    return () => {
      // do nothing
    };
  }, [id]);

  return HookFormState({
    id,
    options: {
      defaultValues,
      // eslint-disable-next-line react-hooks/rules-of-hooks
      resolver: resolver ?? useJoiValidationResolver<T>(schema),
    },
  });
};

// export default useHookForm;

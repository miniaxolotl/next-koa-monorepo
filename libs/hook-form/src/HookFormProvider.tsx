import React, { useCallback, useContext, useState } from 'react';

import { HookFormState } from './use-hook-form';

export interface HookFormContextProps {
  form: { [key: string]: HookFormState };
  useForm: (form: { [key: string]: HookFormState }) => void;
}
export const HookFormContext = React.createContext<HookFormContextProps>({} as HookFormContextProps);

export const HookFormProvider = ({ children }: { children: React.ReactNode }) => {
  const [form, useForm] = useState<{ [key: string]: HookFormState }>({});
  return <HookFormContext.Provider value={{ form, useForm }}>{children}</HookFormContext.Provider>;
};

export const useHookFormValue = () => {
  return useContext(HookFormContext).form;
};

export const useHookFormData = <T extends { [key: string]: string }>() => {
  const form = useContext(HookFormContext).form;
  const useForm = useContext(HookFormContext).useForm;

  const setValue = useCallback(
    (id: string, key: keyof T, value: string) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useForm({
        ...form,
        [id]: {
          values: {
            ...form[id]?.values,
            [key]: value ? value : '',
          },
          errors: {
            ...form[id]?.errors,
          },
        },
      });
      // localStorage.setItem(id, JSON.stringify(store.form));
    },
    [form, useForm],
  );

  const setError = useCallback(
    (id: string, key: keyof T, value: string) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useForm({
        ...form,
        [id]: {
          values: {
            ...form[id]?.values,
          },
          errors: {
            ...form[id]?.errors,
            [key]: value ? value : null,
          },
        },
      });
      // localStorage.setItem(id, JSON.stringify(store.form[id]));
    },
    [form, useForm],
  );
  return { setValue, setError };
};

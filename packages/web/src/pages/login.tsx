import React from 'react';

import Button from '@components/misc/Button';
import DefaultLayout from '@components/layout/DefaultLayout';
import FormControl from '@hooks/form-control';
import Heading from '@components/misc/Heading';
import { useHookForm } from '@hooks/hook-form';
import { LoginSchema, LoginType } from '@libs/shared';

const Login = () => {
  const { handleSubmit, register } = useHookForm<LoginType>({
    schema: LoginSchema,
    options: {},
  });

  const onSubmit = (data: LoginType, errors?: Partial<LoginType>) => {
    if (errors) console.log(errors);
  };

  return (
    <DefaultLayout>
      <Heading size="md" className="text-center">
        login
      </Heading>
      <form className="flex flex-col w-full" onSubmit={handleSubmit(onSubmit)}>
        <FormControl type="text" {...register('username')} />
        <FormControl type="password" {...register('password')} />
        <Button className="max-w-max self-center" type="submit">
          login
        </Button>
      </form>
    </DefaultLayout>
  );
};

export default Login;

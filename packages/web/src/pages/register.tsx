import React from 'react';

import { Box } from '@libs/components';
import { DefaultLayout } from '@components/layout';
import { FormControl, useHookForm } from '@libs/hook-form';

import { CreateUserSchema, CreateUserType } from '@libs/shared';

const Register = () => {
  const {
    handleSubmit,
    register,
    state: { getError },
  } = useHookForm<CreateUserType>({
    schema: CreateUserSchema,
    options: {},
  });

  const onSubmit = (data: Partial<CreateUserType>, errors?: Partial<CreateUserType>) => {
    if (errors) console.log(errors);
  };

  return (
    <DefaultLayout>
      <Box className="flex justify-center">
        <form className="flex flex-col space-y-2 w-full md:w-96" onSubmit={handleSubmit(onSubmit)}>
          <FormControl type="text" error={getError('email')} {...register('email')} />
          <FormControl type="password" error={getError('password')} {...register('password')} />
          <FormControl type="password" error={getError('confirmPassword')} {...register('confirmPassword')} />
          <FormControl type="submit" name="register" />
        </form>
      </Box>
    </DefaultLayout>
  );
};

export default Register;

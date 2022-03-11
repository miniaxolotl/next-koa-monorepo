import React from 'react';

import { Box } from '@components/core';
import { Button } from '@components/misc';
import { DefaultLayout } from '@components/layout';
import { FormControl } from '@components/form/form-control';
import { useHookForm } from '@hooks';

import { CreateUserType, UserSchema } from '@libs/shared';

const Register = () => {
  const { handleSubmit, register } = useHookForm<CreateUserType>({
    schema: UserSchema,
    options: {},
  });

  const onSubmit = (data: CreateUserType, errors?: Partial<CreateUserType>) => {
    if (errors) console.log(errors);
  };
  return (
    <DefaultLayout>
      <Box className="flex justify-center">
        <form className="flex flex-col space-y-2 w-full md:w-96" onSubmit={handleSubmit(onSubmit)}>
          {/* <FormControl type="text" {...register('email')} />
          <FormControl type="text" {...register('username')} />
          <FormControl type="password" {...register('password')} />
          <FormControl type="confirmPassword" {...register('confirmPassword')} /> */}
          {/* <FormControl style={{ variant: 'ghost' }} name="submit" type="submit" value="login" /> */}
          <Button style={{ variant: 'ghost' }}>register</Button>
        </form>
      </Box>
    </DefaultLayout>
  );
};

export default Register;

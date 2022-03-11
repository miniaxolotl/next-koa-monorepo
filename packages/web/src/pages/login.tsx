import React, { useState } from 'react';

import { Box } from '@components/core';
import { Button } from '@components/misc';
import { DefaultLayout } from '@components/layout';
import { FormControl } from '@components/form/form-control';
import { useHookForm } from '@hooks';

import { AuthSchema, AuthType } from '@libs/shared';

const Login = () => {
  const [errors, setErrors] = useState<Partial<AuthType> | null>(null);
  const { handleSubmit, register } = useHookForm<AuthType>({
    schema: AuthSchema,
    options: {},
  });
  const onSubmit = (data: AuthType, errors?: Partial<AuthType>) => {
    if (errors) {
      setErrors(errors);
    } else {
      setErrors(null);
    }
  };
  return (
    <DefaultLayout>
      <Box className="flex justify-center">
        <form className="flex flex-col space-y-2 w-full md:w-96" onSubmit={handleSubmit(onSubmit)}>
          {/* <FormControl type="text" error={errors?.username} {...register('username')} />
          <FormControl type="password" error={errors?.password} {...register('password')} /> */}
          {/* <FormControl style={{ variant: 'ghost' }} name="submit" type="submit" value="login" /> */}
          <Button
            style={{ variant: 'ghost' }}
            type="submit"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
            }}
          >
            login
          </Button>
        </form>
      </Box>
    </DefaultLayout>
  );
};

export default Login;

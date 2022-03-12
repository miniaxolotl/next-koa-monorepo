import React from 'react';

import { Box } from '@libs/components';
import { Button } from '@components/misc';
import { DefaultLayout } from '@components/layout';
import { FormControl, useHookForm } from '@libs/hook-form';

import { AuthSchema, AuthType } from '@libs/shared';

const Login = () => {
  const {
    handleSubmit,
    register,
    state: { getError },
  } = useHookForm<AuthType>({
    schema: AuthSchema,
    options: {},
  });

  const onSubmit = (data: Partial<AuthType>, errors?: Partial<AuthType>) => {
    if (errors) {
      // setErrors(errors);
    } else {
      // setErrors(null);
    }
  };

  return (
    <DefaultLayout>
      <Box className="flex justify-center">
        <form className="flex flex-col space-y-2 w-full md:w-96" onSubmit={handleSubmit(onSubmit)}>
          <FormControl type="text" error={getError('username')} {...register('username')} />
          <FormControl type="password" error={getError('password')} {...register('password')} />
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

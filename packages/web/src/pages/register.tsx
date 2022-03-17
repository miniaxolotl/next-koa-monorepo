import React, { useEffect, useState } from 'react';

import { useRecoilState } from 'recoil';
import { useRouter } from 'next/router';

import { Box } from '@libs/components';
import { createSessionState } from '@libs/stores';
import { useFetch } from '@libs/hooks';
import { CreateUserSchema, CreateUserType } from '@libs/shared';
import { FormControl, useHookForm } from '@libs/hook-form';

import { DefaultLayout } from '@components/layout';

const Register = () => {
  const {
    handleSubmit,
    register,
    state: { getError },
  } = useHookForm<CreateUserType>({
    schema: CreateUserSchema,
    options: { id: 'register' },
  });

  const router = useRouter();
  const { fetch } = useFetch();
  const [session, setSession] = useRecoilState(createSessionState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    session.sessionId && router.push('/');
  });

  const OnSubmit = async (data: CreateUserType, errors?: Partial<CreateUserType>) => {
    if (errors) console.log(errors);
    setLoading(true);
    try {
      const response = await fetch('/auth', {
        method: 'post',
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setSession(await response.json());
      } else {
        throw new Error(response.statusText);
      }
      router.replace('/');
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  return (
    <DefaultLayout>
      <Box className="flex justify-center">
        <form className="flex flex-col space-y-2 w-full md:w-96" onSubmit={handleSubmit(OnSubmit)}>
          <FormControl type="text" error={getError('email')} {...register('email')} disabled={loading} />
          <FormControl type="password" error={getError('password')} {...register('password')} disabled={loading} />
          {/* <FormControl type="password" {...register('confirmPassword')} disabled={loading} /> */}
          <FormControl type="submit" name="register" disabled={loading} />
        </form>
      </Box>
    </DefaultLayout>
  );
};

export default Register;

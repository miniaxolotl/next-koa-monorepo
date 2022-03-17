import { useRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { Box } from '@libs/components';
import { AuthSchema, AuthType } from '@libs/shared';
import { FormControl, useHookForm } from '@libs/hook-form';

import { DefaultLayout } from '@components/layout';
import { createSessionState, useLogin } from '@libs/stores';

const Login = () => {
  const {
    handleSubmit,
    register,
    state: { getError },
  } = useHookForm<AuthType>({
    schema: AuthSchema,
    options: { id: 'login' },
  });
  const router = useRouter();
  const [session, setSession] = useRecoilState(createSessionState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    session.sessionId && router.push('/');
  });

  const OnSubmit = async (data: AuthType, errors?: Partial<AuthType>) => {
    setLoading(true);
    if (errors) console.log(errors);
    try {
      await useLogin(setSession, data);
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
          <FormControl type="submit" name="login" disabled={loading} />
        </form>
      </Box>
    </DefaultLayout>
  );
};

export default Login;

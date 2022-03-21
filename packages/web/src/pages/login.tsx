import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { Box } from '@libs/components';
import { DefaultLayout } from '@components/layout';
import { AuthSchema, AuthType } from '@libs/shared';
import { FormControl, useHookForm } from '@libs/hook-form';
import { RootAction, SessionAction, useStore } from '@libs/stores';

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
  const { dispatch, session, user } = useStore();
  const [loading, setLoading] = useState(false);

  console.log(user);
  console.log(session);

  useEffect(() => {
    if (session.sessionId) router.replace('/');
  }, [router, session.sessionId]);

  const OnSubmit = async (data: AuthType, errors?: Partial<AuthType>) => {
    setLoading(true);
    if (errors) console.log(errors);
    dispatch({
      store: RootAction.SESSION,
      type: SessionAction.LOGIN,
      payload: data,
    });
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

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { Box } from '@libs/components';
import { DefaultLayout } from '@components/layout';
import { CreateUserSchema, CreateUserType } from '@libs/shared';
import { FormControl, useHookForm } from '@libs/hook-form';
import { RootAction, SessionAction, useStore } from '@libs/stores';

const Register = () => {
  const {
    handleSubmit,
    register,
    state: { getError, setValue },
  } = useHookForm<CreateUserType>({
    schema: CreateUserSchema,
    options: { id: 'register', defaultValues: { email: 'hello' } },
  });
  const router = useRouter();
  const { session, dispatch } = useStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session.sessionId) router.replace('/');
  }, [router, session.sessionId, setValue]);

  const OnSubmit = async (data: CreateUserType, errors?: Partial<CreateUserType>) => {
    if (errors) console.log(errors);
    setLoading(true);
    console.log(data);
    dispatch({
      store: RootAction.SESSION,
      type: SessionAction.REGISTER,
      payload: data,
    });
    setLoading(false);
  };

  return (
    <DefaultLayout>
      <Box className="flex justify-center">
        <form className="flex flex-col space-y-2 w-full md:w-96" onSubmit={handleSubmit(OnSubmit)}>
          <FormControl type="text" error={getError('email')} {...register('email')} disabled={loading} />
          <FormControl
            type="password"
            error={getError('password')}
            {...register('password', ['confirmPassword'])}
            disabled={loading}
          />
          <FormControl type="password" {...register('confirmPassword', ['password'])} disabled={loading} />
          <FormControl type="submit" name="register" disabled={loading} />
        </form>
      </Box>
    </DefaultLayout>
  );
};

export default Register;

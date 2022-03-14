import { Box } from '@libs/components';
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
    if (errors) console.log(errors);
  };

  return (
    <DefaultLayout>
      <Box className="flex justify-center">
        <form className="flex flex-col space-y-2 w-full md:w-96" onSubmit={handleSubmit(onSubmit)}>
          <FormControl type="text" error={getError('email')} {...register('email')} />
          <FormControl type="password" error={getError('password')} {...register('password')} />
          <FormControl type="submit" name="login" />
        </form>
      </Box>
    </DefaultLayout>
  );
};

export default Login;

import React, { useEffect } from 'react';

import { DefaultLayout } from '@components/layout';
import { useFetch } from '@libs/hooks';
import { Box, Button, Heading, Span } from '@libs/components';
import { RootAction, useStore } from '@libs/stores';

const Index = () => {
  const { token, setToken } = useFetch();
  const { dispatch, session } = useStore();

  console.log(token);

  useEffect(() => {
    setToken('-----------------');
    dispatch({
      store: RootAction.SESSION,
      type: 'login',
    });
  }, [dispatch, setToken]);

  return (
    <DefaultLayout>
      <Box>sessionId: {session.sessionId}</Box>
      <Box className="grow">
        Heading: <Heading>Hello World!</Heading>
        Div: <Box>Hello World!</Box>
        Span: <Span>Hello World!</Span>
        <Box>
          Button: <Button>Hello World!</Button>
        </Box>
      </Box>
    </DefaultLayout>
  );
};

export default Index;

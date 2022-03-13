import React from 'react';

import { DefaultLayout } from '@components/layout';
import { Box, Button, Heading, Span } from '@libs/components';

const Index = () => {
  return (
    <DefaultLayout>
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

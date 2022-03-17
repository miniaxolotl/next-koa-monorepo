import React from 'react';

import { NextPage } from 'next';

import { DefaultLayout } from '@components/layout';
import { Heading, Text } from '@libs/components';

const Error: NextPage = () => {
  return (
    <DefaultLayout>
      <div className="flex grow flex-col place-items-center">
        <Heading style={{ size: 'lg' }}>Error 404</Heading>
        <Text>not found!</Text>
      </div>
    </DefaultLayout>
  );
};

export default Error;

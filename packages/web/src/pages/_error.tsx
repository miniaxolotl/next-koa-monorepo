import React from 'react';

import DefaultLayout from '@components/layout/DefaultLayout';
import { useTheme } from '@themes/ThemeProvider';
import { NextPage } from 'next';
import Heading from '@components/misc/Heading';
import Text from '@components/misc/Text';

type ErrorPageProps = {
  statusCode: number;
  message: string;
};
const Error: NextPage<ErrorPageProps> = ({ statusCode, message }) => {
  return (
    <DefaultLayout>
      <div className="flex grow flex-col place-items-center">
        <Heading size="lg">Error {statusCode}</Heading>
        <Text size="sm">{message}</Text>
      </div>
    </DefaultLayout>
  );
};

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  const message = res && res.statusMessage ? res.statusMessage : err ? err.message : 'Not Found';
  console.log(message);

  return { statusCode, message };
};

export default Error;

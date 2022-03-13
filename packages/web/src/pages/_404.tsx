import React from 'react';

import { NextPage } from 'next';

import { DefaultLayout } from '@components/layout';
import { Heading, Text } from '@libs/components';

type ErrorPageProps = {
  statusCode: number;
  message: string;
};
const Error: NextPage<ErrorPageProps> = ({ statusCode, message }: ErrorPageProps) => {
  return (
    <DefaultLayout>
      <div className="flex grow flex-col place-items-center">
        <Heading style={{ size: 'lg' }}>Error {statusCode}</Heading>
        <Text>{message}</Text>
      </div>
    </DefaultLayout>
  );
};

export const getServerSideProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  const message = res && res.statusMessage ? res.statusMessage : err ? err.message : 'Not Found';
  return { props: { statusCode, message } };
};

export default Error;

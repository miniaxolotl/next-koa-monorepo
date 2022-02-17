import React from 'react';

import NavigationBar from '@components/navigation/NavigationBar';

import Footer from './Footer';

interface DefaultLayoutProps {
  children: React.ReactNode;
}

const DefaultLayout = (props: DefaultLayoutProps) => {
  const { children } = props;
  return (
    <div className="flex flex-col min-h-screen">
      <NavigationBar title="next-koa-app" />
      <div className="flex grow container flex-col basis-full items-center mx-8 pt-16 md:mx-auto md:w-1/2">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default DefaultLayout;

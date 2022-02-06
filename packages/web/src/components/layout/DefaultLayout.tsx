import NavigationBar from '@components/navigation/NavigationBar';
import { baseTheme } from '@themes/base.theme';
import React from 'react';
import { FiHeart } from 'react-icons/fi';
import Footer from './Footer';

interface DefaultLayoutProps {
  children: React.ReactNode;
}

const DefaultLayout = (props: DefaultLayoutProps) => {
  const { children } = props;
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <NavigationBar title="next-koa-app" />
      <div className="flex mx-auto px-32 pt-16 min-w-full justify-center grow">{children}</div>
      <Footer />
    </div>
  );
};

export default DefaultLayout;

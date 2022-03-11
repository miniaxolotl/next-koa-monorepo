import React from 'react';
import App, { AppContext, AppProps } from 'next/app';

import { cookieStorage } from '@libs/utility';

import { HookFormProvider } from '@hooks/HookFormProvider';
import { ThemeProvider } from '@themes/ThemeProvider';

import '../styles/global.scss';

const MyApp = (context: AppProps & { cookies: string; state }) => {
  const { Component, pageProps, cookies, state } = context;
  return (
    <HookFormProvider>
      <ThemeProvider state={state?.theme} cookies={cookies}>
        <Component {...pageProps} />
      </ThemeProvider>
    </HookFormProvider>
  );
};

MyApp.getInitialProps = async (context: AppContext) => {
  const appProps = await App.getInitialProps(context);
  const { req } = context.ctx;
  const state = cookieStorage.getCookies({ context: context.ctx });
  return {
    ...appProps,
    cookies: req?.headers.cookie ?? '',
    state,
  };
};

export default MyApp;

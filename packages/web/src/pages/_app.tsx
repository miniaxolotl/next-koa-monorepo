import App, { AppContext, AppProps } from 'next/app';

import { ThemeProvider } from '@libs/themes';
import { ThemeType } from '@libs/themes';
import { cookieStorage } from '@libs/utility';

import '../styles/global.scss';

const MyApp = (context: AppProps & { cookies: string; state: { cookies: string; theme: ThemeType } }) => {
  const { Component, pageProps, cookies, state } = context;
  return (
    <ThemeProvider state={state?.theme} cookies={cookies}>
      <Component {...pageProps} />
    </ThemeProvider>
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

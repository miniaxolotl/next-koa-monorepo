import { RecoilRoot } from 'recoil';
import App, { AppContext, AppProps } from 'next/app';

import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';

import { cookieStorage } from '@libs/utility';
import { ThemeProvider, ThemeType } from '@libs/themes';

import '../styles/global.scss';

const queryClient = new QueryClient();

const MyApp = (context: AppProps & { cookies: string; state: string }) => {
  const { Component, pageProps, cookies, state } = context;
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ThemeProvider state={JSON.parse(state)?.theme as ThemeType} cookies={cookies}>
            <Component {...pageProps} />
          </ThemeProvider>
        </Hydrate>
      </QueryClientProvider>
    </RecoilRoot>
  );
};

MyApp.getInitialProps = async (context: AppContext) => {
  const appProps = await App.getInitialProps(context);
  const { req } = context.ctx;
  const state = cookieStorage.getCookies({ context: context.ctx });
  return {
    ...appProps,
    cookies: req?.headers.cookie ?? '',
    state: JSON.stringify(state),
  };
};

export default MyApp;

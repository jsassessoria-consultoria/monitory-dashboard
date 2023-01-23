import 'globals.css';

import type { AppProps } from 'next/app';

import { GlobalProvider } from '@providers';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GlobalProvider pageProps={pageProps}>
      <Component {...pageProps} />
    </GlobalProvider>
  );
}

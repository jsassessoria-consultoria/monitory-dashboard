import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';

import type { ReactNode } from 'react';

type GlobalProviderProps = {
  children: ReactNode;
  pageProps: any;
};

const queryClient = new QueryClient();

export const GlobalProvider = ({
  children,
  pageProps
}: GlobalProviderProps): JSX.Element => {
  return (
    <SessionProvider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </SessionProvider>
  );
};

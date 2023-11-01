import { useState } from 'react';
import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import { NextUIProvider } from '@nextui-org/react';
import { Noto_Sans_KR } from 'next/font/google';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <NextUIProvider>
          <main className={notoSansKr.className}>
            <Component {...pageProps} />
          </main>
        </NextUIProvider>
      </Hydrate>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

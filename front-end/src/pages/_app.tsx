import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import { NextUIProvider } from '@nextui-org/react';
import { Noto_Sans_KR } from 'next/font/google';

const notoSansKr = Noto_Sans_KR({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider>
      <main className={notoSansKr.className}>
        <Component {...pageProps} />;
      </main>
    </NextUIProvider>
  );
}

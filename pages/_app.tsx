import type { AppProps } from "next/app";
import Head from "next/head";
import {
  ApiCacheClient,
  ApiCacheDevtools,
  ApiCacheProvider,
} from "~/packages/client";

const apiCacheClient = new ApiCacheClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ApiCacheProvider client={apiCacheClient}>
        <ApiCacheDevtools />
        <Component {...pageProps} />
      </ApiCacheProvider>
    </>
  );
}

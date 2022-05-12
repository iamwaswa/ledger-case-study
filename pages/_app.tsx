import type { AppProps } from "next/app";
import Head from "next/head";
import { ApiCacheClient, ApiCacheDevtools, ApiCacheProvider } from "~/packages";

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
        <title>Ledger Case Study</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ApiCacheProvider client={apiCacheClient}>
        <ApiCacheDevtools />
        <Component {...pageProps} />
      </ApiCacheProvider>
    </>
  );
}

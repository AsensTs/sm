import { Hydrate, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { IndexFramework } from "../components/layout/IndexFramework";
import "../styles/globals.css";
import "antd/dist/antd.min.css";

function MyAdmin({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { dehydratedState, ...props } = pageProps;
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      })
  );
  const isLoginPage = router.pathname === "/login";
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen">
        <Head>
          <title>Easy CMS</title>
          <meta name="description" content="this is an easy cms" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Hydrate state={dehydratedState}>
          {isLoginPage ? (
            <Component {...props} key={router.pathname} />
          ) : (
            <IndexFramework>
              <Component {...props} key={router.pathname} />
            </IndexFramework>
          )}
          <ReactQueryDevtools initialIsOpen={false} />
        </Hydrate>
      </div>
    </QueryClientProvider>
  );
}

export default MyAdmin;

import { SessionProvider } from "next-auth/react";
import Head from "next/head";

import Layout from "../components/layout/layout";
import "../styles/globals.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Head>
          <title>Jesper Moseti Onsoti</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <meta name="description" content="Jesper Moseti Onsoti's professional site" />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

export default MyApp;

import type { NextPage } from 'next'
import Head from "next/head";
import Layout from "src/components/templates/Layout";
import ContestVideos from "src/components/pages/ContestVideos"

const Contest: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Contest - The UXM</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ContestVideos />
    </Layout>
  );
}

export default Contest
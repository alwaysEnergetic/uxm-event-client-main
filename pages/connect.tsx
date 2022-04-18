import Head from "next/head";
import Layout from "../src/components/templates/Layout";
import Connect from "src/components/pages/Connect";
export default function ConnectPage() {
  return (
    <Layout>
      <Head>
        <title>Connect - The UXM</title>
      </Head>
      <Connect />
    </Layout>
  );
};
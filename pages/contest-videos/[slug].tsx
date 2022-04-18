import { NextPage } from "next";
import Head from "next/dist/shared/lib/head";
import Layout from "src/components/templates/Layout";
import ContestVideo from "src/components/pages/ContestVideos/Single";

const ContestVideoPage: NextPage = () => {
  return (
    <Layout>
      <ContestVideo />
    </Layout>
  );
};

export default ContestVideoPage;

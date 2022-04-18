import { NextPage } from "next";
import Layout from "src/components/templates/Layout";
import Meta from "src/components/shared/Meta";
import { radioPageData } from "src/data/radio";
import Radio from "src/components/pages/Radio";

const RadioPage: NextPage = () => {
  return (
    <Layout>
      <Meta title={radioPageData.metaTitle} descr={radioPageData.metaDescr} />
      <Radio />
    </Layout>
  );
};

export default RadioPage;

import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Layout from "src/components/templates/Layout";
import Groups from 'src/components/pages/Groups/Groups'
import {groupsQuery} from 'src/components/pages/Groups/queries'
import { getGqlClientServer } from "src/lib/gqlClient";

export const getServerSideProps: GetServerSideProps = async (propsServer) => {
  try {
    const gqlClientServer = getGqlClientServer(propsServer)
    // console.log((gqlClientServer as any).url)
    const groups = await gqlClientServer.request(groupsQuery, {mine: false, userId: null})
    return {
      props: {
        groups: groups.groups.items
      }
    } 
  } catch (error) {
    // console.error(JSON.stringify((error as any).request, undefined, 2))
    // console.error(JSON.stringify((error as any).response.status, undefined, 2))
    return {
      notFound: true,
    };
  }
}

type GroupsProps = {
  groups: any
}

const GroupsPage: NextPage<GroupsProps>  = (props:GroupsProps) => {
  const {groups} = props;
  return (
    <Layout>
      <Head>
          <title>Groups - The UXM</title>
          <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container pt-5 mb-5">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <Groups groups={groups}/>          
          </div>
        </div>
      </div> 
    </Layout> 
  )
}

export default GroupsPage
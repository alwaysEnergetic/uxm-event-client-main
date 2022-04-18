import { NextPage, GetStaticProps, GetStaticPaths, GetServerSideProps, InferGetServerSidePropsType } from 'next'
import {objGetPath} from "@muft/dailyfns"
import { TUser } from "src/lib/types"
import { getGqlClient } from "src/lib/gqlClient"
import { queryUserPublicProfile, mutationUserEdit } from 'src/lib/graphql/schema/connect'
import Head from 'next/head'
import Layout from 'src/components/templates/Layout'
import Groups from 'src/components/pages/Groups/GroupsClient'
import ProfileContainerPublic from 'src/components/Profile/ProfileContainerPublic'

export const getServerSideProps: GetServerSideProps = async ({req, res, query}) => {
  try {
    const data = await getGqlClient().request(queryUserPublicProfile, {slug: query.slug})
    // console.log(data)
    return {
      props: {
        user: objGetPath(data, 'userBySlug')
      },
    }
    
  } catch (error) {
    console.log(error)
    return {
      notFound: true
    }
  }
}

const GroupsPage: NextPage<{user: TUser}> = (props) => {
  const { user } = props

  return (
    <Layout>
      <Head>
          <title>Groups - The UXM</title>
          <link rel="icon" href="/favicon.ico" />
      </Head>
  
      <ProfileContainerPublic userId={user.id} userSlug={user.slug}>
        <div className="container">
          <Groups userId={user.id} />
        </div> 
      </ProfileContainerPublic>
    </Layout> 
  )
}

export default GroupsPage
import { NextPage, GetStaticProps, GetStaticPaths, GetServerSideProps, InferGetServerSidePropsType } from 'next'
import {objGetPath} from "@muft/dailyfns"
import { TUser } from "src/lib/types"
import { getGqlClient } from "src/lib/gqlClient"
import { queryUserPublicProfile, mutationUserEdit } from 'src/lib/graphql/schema/connect'
import { getUserUID } from 'src/components/organisms/Auth/auth'
import Layout from 'src/components/templates/Layout'
import ProfileContainerPublic from 'src/components/Profile/ProfileContainerPublic'
import ProfileView from 'src/components/Profile/ProfileView'
import { useRouter } from 'next/router'
import useMounted from 'src/components/atoms/Hook/useMounted'
import Meta from "src/components/shared/Meta"

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


const PublicProfileView: NextPage<{user: TUser}> = (props) => {
  const router = useRouter();
  const { user } = props
  const mounted = useMounted()

  // console.log(user)
  return (
    <Layout>
      <Meta title={`${user.firstName} ${user.lastName}`} descr={`${user.bio}`} />
      <ProfileContainerPublic userId={user.id} userSlug={user.slug}>
        <ProfileView user={user} />
      </ProfileContainerPublic>

      {mounted &&
      
        <div className="row-fluid mt-5">
          <div className="col-md-12">
            <h3 className="text-center">{user?.firstName} {user?.lastName} WebShop</h3>
            <iframe style={{height: '700px'}} className="w-100" src={"https://theuxm.com/catalogue/?hideNav=1&isEvent=1&sellerUid="+user.id}></iframe>
          </div>
        </div>
      }
    </Layout>
  )
}

export default PublicProfileView



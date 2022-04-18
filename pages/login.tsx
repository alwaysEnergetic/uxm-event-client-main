import type { NextPage } from 'next'
import { GetServerSideProps } from 'next'
import { gql } from 'graphql-request'
import Cookies from 'cookies'
import moment from 'moment'
import { getLoginUrl, getTokenName } from 'src/components/organisms/Auth/auth'
import { getGqlClient } from "src/lib/gqlClient"
import Layout from 'src/components/templates/Layout'

export const getServerSideProps: GetServerSideProps = async ({req, res, query}) => {
  const cookies = new Cookies(req, res)

  const tokenName = getTokenName()

  console.log(cookies.get(tokenName))
  // console.log("isLoggedIn()", isLoggedIn())
  // YTD -  Later on we will change this function to get the logggedIn status server side
  if(cookies.get(tokenName)) {
    return {
      redirect: {
        destination: query.redirect as string || "/",
        permanent: false,
      },
    }
    
  }
  const token = query.token ? query?.token : null

  if(!token) {
    const loginUrl = getLoginUrl()
    return {
      redirect: {
        destination: loginUrl,
        permanent: false,
      },
    }
  }

  const queryGql = gql`
    mutation registerViaToken($input: RegisterViaTokenInput!) {
	    registerViaToken: registerViaToken(input: $input) {
        id
        slug
      }
	  }
  `

  try {
    const data = await getGqlClient().request(queryGql, {input: {token: token}})
    console.log("Data", data)
    
    const expires = moment().add(30, 'days').toDate()
    cookies.set(tokenName, token as string, { expires: expires, httpOnly: false })
    cookies.set('event_username', data.registerViaToken.slug as string, { expires: expires, httpOnly: false })
    console.log(query.redirect)
    return {
      redirect: {
        destination: query.redirect as string || "/",
        permanent: false,
      },
    }
  } catch (error) {
    var err : any = error
    console.log(err)
    // console.log(JSON.stringify(err.response.errors))
    return {
      notFound: true
    }
  }

  return {
    props: { },
  }
}

const Login: NextPage = () => {
  return (
    <Layout>
      <div>
        Loading ....
      </div>
    </Layout>
  )
}

export default Login


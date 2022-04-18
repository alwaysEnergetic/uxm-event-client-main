import { GraphQLClient, gql } from 'graphql-request'
import { getToken, getTokenName } from '../components/organisms/Auth/auth'
const endpoint = process.env.NEXT_PUBLIC_EVENT_API_HOST + '/query'
import Cookies from 'cookies'

let gqlOptions: any = {
  credentials: 'include',
  mode: 'cors',
  headers: {
    // authorization: 'Bearer MY_TOKEN',
  },
}

export const getGqlClient = () => {
  if(getToken()) {
    gqlOptions['headers']['x-auth-token'] = getToken()
  }

  return new GraphQLClient(endpoint, gqlOptions)
}


// GqlClient js-cookies does not gets token so this is gqlclient we created for server
// use `cookies` pkg to get the token from server request
export const getGqlClientServer = ({req, res, query}) => {
  const cookies = new Cookies(req, res)
  const tokenName = getTokenName()
  let token = cookies.get(tokenName)
  if(token) {
    gqlOptions['headers']['x-auth-token'] = token
  }

  return new GraphQLClient(endpoint, gqlOptions)
}



// UXM API 
const endpointUxm = process.env.NEXT_PUBLIC_UXM_MARKET_API_HOST + '/query'
let gqlMarketOptions: any = {
  credentials: 'include',
  mode: 'cors',
  headers: {
    // authorization: 'Bearer MY_TOKEN',
  },
}

if(getToken()) {
  gqlMarketOptions['headers']['x-auth-token'] = getToken() as any
}
export const gqlClientMarket = new GraphQLClient(endpointUxm, gqlMarketOptions)
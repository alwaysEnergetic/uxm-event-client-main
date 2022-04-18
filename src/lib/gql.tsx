import React from 'react'
import { request, GraphQLClient } from 'graphql-request'
import { getGqlClient } from "./gqlClient"

export const GqlContext = React.createContext<GraphQLClient>(getGqlClient())

export const useGqlClient = () => {
  return React.useContext(GqlContext)
}
import { gql } from 'graphql-request'
import { ContestVideo } from "src/lib/graphql/schema/contest"

export type PaginatedContestVideosResponse = {
  items: ContestVideo[]
  meta: any
}

export const query_contestVideos = gql`
  query contestVideos() {
    contestVideos{
      items {
        id
        slug
        name
        artistName
        embedLink
        votingEnabled
      }
    }
  }
`
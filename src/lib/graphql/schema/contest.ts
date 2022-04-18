import { gql } from 'graphql-request'

export type ContestVideo = {
	id: string;
  createdAt: Date
  name: string
  slug: string
  embedLink: string
  artistName: string
  votingEnabled: boolean
}

export const query_contestVideoBySlug = gql`
  query contestVideoBySlug($slug: String!) {
    contestVideoBySlug(slug: $slug){
      id
      slug
      name
      artistName
      embedLink
      votingEnabled
    }
  }
`

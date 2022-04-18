import { gql } from "graphql-request";

export const groupsQuery = gql`
  query groups($filters: [FilterInput!], $limit: Int! = 10, $offset: Int! = 0, $orderBy: [SortOrderInput!] = [], $mine: Boolean, $userId: Uid) {
    groups(filters: $filters, limit: $limit, offset: $offset, orderBy: $orderBy, mine: $mine, userId: $userId) {
      items {
        id
        name
        slug
        imageId
        image {
          id
          url
        }
        descr
        link1Name
        link1Href
        link2Name
        link2Href
        joined
      }
    }
  }
`
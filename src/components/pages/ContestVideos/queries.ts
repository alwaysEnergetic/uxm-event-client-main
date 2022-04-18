import { gql } from "graphql-request";

export const contestVideoVoteQuery = gql`
  mutation contestVideoVote($videoId: Uid!) {
    contestVideoVote(videoId: $videoId)
  }
`;
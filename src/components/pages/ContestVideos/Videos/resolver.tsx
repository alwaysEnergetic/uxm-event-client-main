import { useQuery } from "react-query";
import { getGqlClient } from "src/lib/gqlClient"
import { PaginatedContestVideosResponse, query_contestVideos } from "./schema"

export function useQueryVideos(variables={}) {
  return useQuery(["contestVideos", variables], async (ctx) => {
    // console.log(ctx)
    const {
      contestVideos: data,
    } = await getGqlClient().request(
      query_contestVideos
    );
    return data as PaginatedContestVideosResponse;
  }, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
  });
}

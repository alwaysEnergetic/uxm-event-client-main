import { useQuery } from "react-query";
import { getGqlClient } from "src/lib/gqlClient"
import { ContestVideo, query_contestVideoBySlug } from "../../../lib/graphql/schema/contest"

export function useQueryVideoBySlug(variables: {slug: string}) {
  return useQuery(["contestVideoBySlug", variables], async (ctx) => {
    if (!ctx.queryKey[1]['slug']) return
    const {
      contestVideoBySlug: data,
    } = await getGqlClient().request(
      query_contestVideoBySlug,
      ctx.queryKey[1]
    );
    return data as ContestVideo;
  }, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
  });
}

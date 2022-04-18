import { useRouter } from "next/router";
import Head from "next/dist/shared/lib/head";
import Video from "src/components/pages/ContestVideos/Video";
import InviteWidget from "src/components/organisms/InviteWidget/InviteWidget";
import VoteWidget from "src/components/pages/ContestVideos/VoteWidget";
import { useQueryVideoBySlug } from "./resolvers";

export default function ContestVideo() {
  const router = useRouter();
  const { slug } = router.query;
  // console.log(router.query);
  const {
    status,
    data: item,
    error,
    isFetching,
    refetch,
  } = useQueryVideoBySlug({ slug: slug as any });

  if (status == "loading") return <span>Loading...</span>;
  if (status == "error") return <span>Error...</span>;

  return (
    <>
      <Head>
        <title>{`${item?.name} - The UXM`}</title>
      </Head>

      <div className='container pt-5'>
        <Video video={item} />
        <div className='pb-5 pt-1 pe-2 text-end'>
          <VoteWidget
            title='Vote'
            btnClassName={"btn btn-primary me-2"}
            data={item}
          />
          <InviteWidget
            btnClassName={"btn btn-primary"}
            title='Share Video'
            redirect={`/contest-videos/${slug}`}
          />
        </div>
      </div>
    </>
  );
};
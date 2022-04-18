import { useState, useEffect, useRef } from 'react'
import { useQuery, useQueryClient, } from "react-query";
import { gql } from "graphql-request";
import Image from 'next/image'
import Layout from 'src/components/templates/Layout'
import ProfileContainer from 'src/components/Profile/ProfileContainer'
import ChatMessages from "src/components/organisms/Chat/ChatMessages";
import { Thread } from "src/lib/types"
import { getGqlClient } from "src/lib/gqlClient"
import { ProtectRoute } from 'src/components/organisms/Auth/AuthContext'
import { objGetPath } from "@muft/dailyfns"
import { noImageUrl } from 'src/lib/constant'
function useMyThreads(variables={}) {
  return useQuery(["myThreads", variables], async (ctx) => {
    // console.log(ctx)
    const {
      chatMyThreads: data,
    } = await getGqlClient().request(
      gql`
        query chatMyThreads($excludeMe: Boolean) {
          chatMyThreads(excludeMe: $excludeMe) {
            id
            users{
              fullName
              profileImage {
                url
              }
            }
          }
        }
      `,
      ctx.queryKey[1]
    );
    return data;
  }, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
  });
}


function MyThreads(props: {data: Thread[], onSelect?: (data: Thread) => void}) {
  const { data, onSelect } = props
  const [active, setActive] = useState<Thread>()

  const handleSelect = (data: Thread) => {
    setActive(data)
    typeof(onSelect)=="function" && onSelect(data)
  }
  
  return (
    <>
      {data?.map((item, i) => {
        const isActive = item.id == active?.id
        // console.log("isActive", isActive, item)
        // console.log(item.users[0])
        const fullName = item.users[0].fullName
        const imageUrl = objGetPath(item, "user.0.profileImage.url", noImageUrl)
        // console.log(imageUrl)
        return(
          <div key={i}>
            <button  onClick={() => handleSelect(item)} className={`btn btn-light d-flex align-items-center w-100 mb-2`}>
              <div>
                <Image src={imageUrl} alt={fullName} width="50" height="50" />
              </div>
              <div className="ms-2">{fullName}</div>
            </button>
          </div>
        )
      })}
    </>
  )
}

function MeMessages() {
  const [threadId, setThreadId] = useState<string>()
  const { status, data, error, isFetching, refetch } = useMyThreads({excludeMe: true});
  return (
    <ProfileContainer>
      <div className={`row`}>
        <div className={`col-md-4`}>
          <MyThreads data={data} onSelect={(thread) => setThreadId(thread.id)} />
        </div>
        <div className={`col-md-8`}>
          {threadId ? <ChatMessages threadId={threadId} show={true}/> : null }
        </div>
      </div>
    </ProfileContainer>
  )
}

export default function _MeMessages()  {
  return (
    <Layout>
      <ProtectRoute>
        <MeMessages />
      </ProtectRoute>
    </Layout>
  )
}
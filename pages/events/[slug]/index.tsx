import { useEffect, useRef } from 'react'
import { NextPage, GetServerSideProps } from 'next'
import Script from 'next/script'
import { useRouter } from 'next/router'
import {objGetPath} from "@muft/dailyfns"
import { TLiveEvent } from "src/lib/types"
import { gqlClientMarket } from "src/lib/gqlClient"
import { queryLiveEventBySlug } from 'src/lib/graphql/schema/connect'
import Layout from 'src/components/templates/Layout'
import { ProtectRoute } from 'src/components/organisms/Auth/AuthContext'
import { Carousel } from 'react-bootstrap'
import { getUserName } from 'src/components/organisms/Auth/auth'
import Video from 'src/components/organisms/Event/Video'
import BuyToken from 'src/components/organisms/Event/BuyToken'
import TipToken from 'src/components/organisms/Event/TipToken'
import InviteWidget from 'src/components/organisms/InviteWidget/InviteWidget'
import eventStyles from "src/styles/Event.module.scss"
import Meta from "src/components/shared/Meta"
import { Button } from "react-bootstrap"
import { useAuth } from 'src/components/organisms/Auth/AuthContext'
import Register from "src/components/organisms/Event/Register";
import dynamic from 'next/dynamic'

interface LiveEventProps {
  liveEvent: TLiveEvent;
}

export const query_publicItem = `
  query publicItem($search: String!) {
    publicItem(search: $search) {
      id
      slug
      title
      shortDesc
      eventHeading
      eventHeadingLink
      eventIvsLink
      eventDeadSimpleChatId
      itemTypeId
      images {
        id
        url
      }
    }
  }
`;

export const getServerSideProps: GetServerSideProps = async ({req, res, query}) => {
  try {
    const data = await gqlClientMarket.request(query_publicItem, {search: query.slug})
    const item = objGetPath(data, 'publicItem')
    if (item.itemTypeId!=='f57e0b20-5a0b-438b-a216-54f2d33aa9e3') {
      return {
        notFound: true
      }
    }
    
    return {
      props: {
        liveEvent: item
      },
    }
  } catch (error) {
    console.log(error)
    return {
      notFound: true
    }
  }
}

const LiveEvent: NextPage = (props: any) => {

  const myRef = useRef<any>(null);
  const { liveEvent } = props
  // console.log(liveEvent)
  const router = useRouter()

  const carouselClickHandler: (event: React.MouseEvent<HTMLElement>) => void = (event) => {
    // console.log(event.target.tagName)
    const target: any = event.target
    if(target.tagName == 'IMG') {
      myRef.current?.scrollIntoView()  
    }
  }

  const images = objGetPath(liveEvent, 'images', [])

  const username = getUserName()
  
  console.log(liveEvent)

  const RegisterButton = () => {
    const { isAuthenticated } = useAuth()
    return !isAuthenticated? (
      <Register wordings="Login or Register to Chat Live" btnClassName="btn btn-primary btn-block mt-3" divClassName="d-grid gap-2"/>
    ): null
  }
  
  const ShowIframe = () => {
    const { isAuthenticated } = useAuth()
    return isAuthenticated? (
      <iframe className="mt-4 deadframe" src={"https://deadsimplechat.com/" + liveEvent.eventDeadSimpleChatId} width="100%" height="300px" ></iframe>
    ): null
  }


  return (
    <Layout>
      <Meta title={liveEvent.title} descr={liveEvent.shortDesc}  />
      <ProtectRoute bypass={liveEvent.isPublic}>
        <>
        <div className="container py-5">
          <div className="row">
            <div className="col-md-8">
              { liveEvent.eventIvsLink ? <Video url={liveEvent.eventIvsLink} /> : null }
         
              <div className="d-flex justify-content-between flex-wrap mt-2">
                <BuyToken />
                <TipToken toUid={liveEvent.userId} />
              </div>
            

              <div className="list-group mt-3 mb-3">
                <div className="list-group-item d-flex align-items-center justify-content-between ">
                  <span className="me-3">Support this artist with TipTokens above and item purchases below</span>
                  <InviteWidget 
                    title={"Invite Friends"} 
                    redirect={router.asPath} 
                  />
                </div>
              </div>

              <iframe style={{height: '700px'}} className="w-100" src={"https://theuxm.com/catalogue/?hideNav=1&isEvent=1&sellerUid="+liveEvent.userId}></iframe>
            </div>
            <div className="col-md-4">
              <div className="d-none d-md-block">
                <div className="h5 text-center">Scroll Down to Purchase Merchandise</div>
                <Carousel onClick={carouselClickHandler} touch={true} className={'my-2 rounded overflow-hidden ' + eventStyles.eventCarousel}>
                  {images.map((image, i) => {
                    return (
                      <Carousel.Item key={i}>
                        <img
                          className={eventStyles.CarouselImage}
                          // style={{height: '200px'}}
                          src={image.url}
                        />
                      </Carousel.Item>
                    )

                  })}
                </Carousel>
              </div>

              <div className="text-center"><a href={liveEvent.eventHeadingLink}>{liveEvent.eventHeading}</a></div>
              <ShowIframe/>
              <RegisterButton />

              <h6 className="mt-4">Advertisement</h6>
              <iframe className="w-100" src="//www.effectivedisplaycontent.com/watchnew?key=666290eedabb7830566e212afffaf4be" width="320" height="50" frameBorder="0" scrolling="no"></iframe>
              
              <h6 className="mt-4">Advertisement</h6>
              <iframe className="w-100" src="//www.effectivedisplaycontent.com/watchnew?key=72cca7b8d1931911123c08ee01bc9982" width="320" height="50" frameBorder="0" scrolling="no"></iframe>

            </div>
          </div>
          <div className="row">
            <div className="col-md-12" ref={myRef}>
             
            </div>
          </div>
        </div>
        {username ?
          <Script id="show-banner" strategy="lazyOnload">
            {`
              var frames = document.getElementsByClassName("deadframe");
              for (var i =0; i < frames.length; i++) {
                frames[i].src = frames[i].src + "?username=${username}" ;
              }
            `}
          </Script>
          : null
        }
        </>
      </ProtectRoute>
    </Layout>
  )
}

export default LiveEvent
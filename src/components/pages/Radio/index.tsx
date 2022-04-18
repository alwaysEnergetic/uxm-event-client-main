import { useRef } from "react";
import Script from "next/script";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { Carousel } from "react-bootstrap";
import InviteWidget from "src/components/organisms/InviteWidget/InviteWidget";
import Register from "src/components/organisms/Event/Register";
import { useAuth } from 'src/components/organisms/Auth/AuthContext'
import { getUserName } from "src/components/organisms/Auth/auth";
import { radioPageData } from "src/data/radio";
import eventStyles from "./Radio.module.scss";

const RegisterButton = () => {
  const { isAuthenticated } = useAuth()
  return !isAuthenticated ? <Register wordings='Login or Register to Chat Live' btnClassName='btn btn-primary btn-block mt-3' divClassName='d-grid gap-2' /> : null;
};

const ShowIframe = () => {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? <iframe className='mt-4 deadframe' src={"https://deadsimplechat.com/" + radioPageData.deadSimpleId} width='100%' height='300px'></iframe> : null;
};

const ProgramSchduletWithNoSSR = dynamic(() => import("src/components/pages/Radio/ProgramSchedule"), {
  ssr: false,
});

export default function Radio()  {
  const myRef = useRef<any>(null);
  
  // console.log(liveEvent)
  const router = useRouter();

  const carouselClickHandler: (event: React.MouseEvent<HTMLElement>) => void = (event) => {
    // console.log(event.target.tagName)
    const target: any = event.target;
    if (target.tagName == "IMG") {
      myRef.current?.scrollIntoView();
    }
  };

  const images = radioPageData.images;

  const username = getUserName();

  return (
    <>
      <div className='container py-5'>
        <div className='row'>
          <div className='col-md-8'>
            <div className={eventStyles.RadioWrapper}>
              <div className={eventStyles.imgWrap}>
                <ProgramSchduletWithNoSSR />
              </div>
              <iframe className={eventStyles.RadioIframe} src={radioPageData.iframeSrc} />
            </div>

            <div className='list-group mt-3 mb-3'>
              <div className='list-group-item d-flex align-items-center justify-content-between '>
                <InviteWidget title={"Share This Page"} redirect={router.asPath} />
              </div>
            </div>

            <iframe style={{ height: "700px" }} className='w-100' src={"https://theuxm.com/catalogue/?hideNav=1&isEvent=1&sellerUid=" + radioPageData.userId}></iframe>
          </div>
          <div className='col-md-4'>
            <div className='d-none d-md-block'>
              <div className='h5 text-center'>Scroll Down to Purchase Merchandise</div>
              <Carousel onClick={carouselClickHandler} touch={true} className={"my-2 rounded overflow-hidden " + eventStyles.eventCarousel}>
                {images.map((image, i) => {
                  return (
                    <Carousel.Item key={i}>
                      <img
                        className={eventStyles.CarouselImage}
                        // style={{height: '200px'}}
                        src={image.url}
                      />
                    </Carousel.Item>
                  );
                })}
              </Carousel>
            </div>

            <div className='text-center'>
              <a href={radioPageData.heading1Link}>{radioPageData.heading1}</a>
            </div>
            <ShowIframe />
            <RegisterButton />

            <h6 className='mt-4'>Advertisement</h6>
            <iframe className='w-100' src='//www.effectivedisplaycontent.com/watchnew?key=666290eedabb7830566e212afffaf4be' width='320' height='50' frameBorder='0' scrolling='no'></iframe>

            <h6 className='mt-4'>Advertisement</h6>
            <iframe className='w-100' src='//www.effectivedisplaycontent.com/watchnew?key=72cca7b8d1931911123c08ee01bc9982' width='320' height='50' frameBorder='0' scrolling='no'></iframe>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-12' ref={myRef}></div>
        </div>
      </div>
      {username ? (
        <Script id='show-banner' strategy='lazyOnload'>
          {`
              var frames = document.getElementsByClassName("deadframe");
              for (var i =0; i < frames.length; i++) {
                frames[i].src = frames[i].src + "?username=${username}" ;
              }
            `}
        </Script>
      ) : null}
    </>
  );
};
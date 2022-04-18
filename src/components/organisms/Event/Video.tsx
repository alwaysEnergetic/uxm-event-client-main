import Script from 'next/script'
import Head from 'next/head'
const AwsVideoPlayer = (props: {url: string}) => {
  const { url } = props

  // console.log(url)
  // const DEFAULT_STREAM ="https://73c4588bbad1.us-east-1.playback.live-video.net/api/video/v1/us-east-1.969640575714.channel.rf25NM5lfHWJ.m3u8";


  return (
    <>
      <Script id="streamUrl">
        {`window.DEFAULT_STREAM="${url}"`}
      </Script>
      {/* <Script src="https://cdnjs.cloudflare.com/ajax/libs/video.js/7.6.6/video.min.js" />
      <Script src="https://player.live-video.net/1.3.1/amazon-ivs-videojs-tech.min.js" />
      <Script src="https://player.live-video.net/1.3.1/amazon-ivs-quality-plugin.min.js" />
      <Script src="/video.js" onLoad={() => {
          let gwin: any = window;
          gwin.InitPlayer();
      }} /> */}
      <Head>
        <script async src="https://cdnjs.cloudflare.com/ajax/libs/video.js/7.6.6/video.min.js" />
        <script async src="https://player.live-video.net/1.3.1/amazon-ivs-videojs-tech.min.js" />
        <script async src="https://player.live-video.net/1.3.1/amazon-ivs-quality-plugin.min.js" />
        <script async src="/video.js" onLoad={`InitPlayer()` as any}/>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/video.js/7.6.6/video-js.css" rel="stylesheet"></link>
      </Head>

      <div className="video-container">
          <video-js id="amazon-ivs-videojs" className="video-js vjs-16-9 vjs-big-play-centered" controls autoplay playsinline>
          </video-js>
      </div>
    </>
  )
}

export default AwsVideoPlayer
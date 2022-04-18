export function extractSrcFromIframe(iframe: string): string | null {
  // it's already a link
  if(iframe.indexOf("<iframe") == -1)  {
    return iframe
  }
  // var regExp = /^.*(?<=src=").*?(?=[\?"]).*/;
  var regExp = /<iframe.*?src="(.*?)"/;
  var match = iframe.match(regExp);
  const url = match && match[1]
  // console.log(url)

  if(!url) {
    // console.log("url is empty")
    return null
  }

  return url
}

export function spotifyUrlToEmbedUrl(link: string): string | null {
  const urlLoc = new URL(link)
  const segments = urlLoc.pathname.split('/')
  console.log(segments)

  const videoId = segments.pop()
  if(!videoId) return null
  const type = segments.pop()
  
  return `https://open.spotify.com/embed/${type}/${videoId}`
}

/*
 * Below are the urls that needs to be parsed
 * https://www.youtube.com/watch?v=Zd_C71THulw
 * https://youtu.be/Zd_C71THulw
 * https://www.youtube.com/playlist?list=PLrxoTZgiFGjt9Uz4-iFG3cA7XerU6JBAC
*/
export function youtubeUrlToEmbedUrl(link: string): string | null {
  const urlLoc = new URL(link)
  console.log(urlLoc)
  const urlParams = new URLSearchParams(urlLoc.search);
  console.log(urlParams)

  let videoId = urlParams.get('v')
  if(videoId) {
    return `https://www.youtube.com/embed/${videoId}`
  }
  
  const playlistId = urlParams.get('list')
  if(playlistId) {
    return `https://www.youtube.com/embed/videoseries?list=${playlistId}`
  }

  const segments = urlLoc.pathname.split('/')
  // console.log(segments)
  const videoId1 = segments.pop()
  if(!videoId1) return null
  return `https://www.youtube.com/embed/${videoId1}`
}

export function vimeoUrlToEmbedUrl(link: string): string | null {
  const urlLoc = new URL(link)
  const segments = urlLoc.pathname.split('/')
  // console.log(segments)
  const videoId = segments.pop()
  if(!videoId) return null
  return `https://player.vimeo.com/video/${videoId}`
}


export function itunesUrlToEmbedUrl(link: string): string | null {
  const urlLoc = new URL(link)
  console.log(urlLoc)
  const newPath = urlLoc.href.replace(urlLoc.origin, '')
  if(!newPath) return null
  return `https://embed.music.apple.com${newPath}`
}

export function parseUrlToEmbedded(data: string) : string|null {
  let url = extractSrcFromIframe(data)
  if(!url) {
    console.log("url is empty")
    return null
  }

  const typesName = ['youtu.be', 'spotify.com', 'vimeo.com', 'youtube.com', 'soundcloud.com', 'music.apple.com']
  const types = typesName.filter((val) => {
    return url?.indexOf(val) !== -1
  })
  // console.log("types" , types)

  if(types.length == 0) {
    console.log("no types found")
    return null
  }

  const type = types[0]
  // const segments = new URL(url).pathname.split('/');
  // const last = segments.pop() || segments.pop();
  // console.log(last)
  let newUrl: any = null
  switch (type) {
    case 'youtu.be':
      newUrl = youtubeUrlToEmbedUrl(url)
      break;
    case 'youtube.com':
      newUrl = youtubeUrlToEmbedUrl(url)
      break;
    case 'spotify.com':
      newUrl = spotifyUrlToEmbedUrl(url)
      break;
    case 'vimeo.com':
      newUrl = vimeoUrlToEmbedUrl(url)
      break;
    case 'soundcloud.com':
      newUrl = url
      break;
    case 'music.apple.com':
      newUrl = itunesUrlToEmbedUrl(url)
      break;
    default:
      break;
  }

  console.log(newUrl)
  return newUrl
}
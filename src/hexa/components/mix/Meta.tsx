import React from 'react'
import Head from 'next/head';
import { useRouter } from 'next/router';
import metaDescr from "src/lib/shared/meta-descr"

function Meta(props: {title?: string, descr?: string, image?: string}) { 
  let { title , descr, image } = props
  const router = useRouter()
  descr = metaDescr(descr)
  let url =  process.env.NEXT_PUBLIC_EVENT_DOMAIN + router.asPath

  return (
    <Head>
      <title key="title">{title}</title>
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      {descr ? <meta key="description" name="description" content={descr} /> : null }
      <meta property="og:locale" content="en_US" />
      <meta key="og:type" name="og:type" content={"website"} />
      <meta key="og:title" name="og:title" content={title} />
      {descr ? <meta key="og:description" name="og:description" content={descr} /> : null }
      <meta key="og:url" name="og:url" content={url} />
      {image ? <meta key="og:image" name="og:image" content={image} /> : null } 
    </Head>
  )
}

export default Meta
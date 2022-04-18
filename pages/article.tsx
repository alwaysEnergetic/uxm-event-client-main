import { useState, useRef, useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Layout from "src/components/templates/Layout";
import { Loading, LoadingElement } from "src/components/shared/Loading";

// This will load the info.theuxm.com pages in iframe with baseencoded url
const ArticlePage: NextPage = () => {
  const router = useRouter();
  const { link } = router.query;
  // console.log(link)
  const loadingEl = useRef<LoadingElement>(null);
  const loadedHandler = (e) => {
    // console.log(e.target.contentWindow.document.body.scrollHeight)
    loadingEl.current?.hide();
  };

  const receiveMessage = (evt) => {
    // console.log("Got message: " + JSON.stringify(evt.data) + " from origin: " + evt.origin);
    // console.log("EVT", evt.data.type)
    if (evt.data.type === "frame-resized") {
      let doc: any = document;
      doc.getElementById("ifrm").style.height = evt.data.value + "px";
    }
  };

  useEffect(() => {
    loadingEl.current?.show();
    window.addEventListener("message", receiveMessage, false);
  }, []);

  if (!link) return null;
  let decoded = Buffer.from(link as any, "base64").toString();
  // console.log(decoded)

  return (
    <Layout>
      <Loading ref={loadingEl} overlay />
      <iframe id='ifrm' onLoad={(e) => loadedHandler(e)} className='w-100' style={{ height: "1000px" }} src={decoded as any}></iframe>
    </Layout>
  );
};

export default ArticlePage;

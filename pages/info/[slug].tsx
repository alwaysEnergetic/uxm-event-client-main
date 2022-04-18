import { useRef, useEffect } from 'react';
import Layout from 'src/components/templates/Layout'
import { useRouter } from 'next/router'
import { Loading, LoadingElement } from "src/components/shared/Loading";

export default function InfoPage() {
  const router = useRouter()
  const { slug  } = router.query

  const loadingEl = useRef<LoadingElement>(null);
  const loadedHandler = () => { loadingEl.current?.hide() }

  useEffect(() => {
    loadingEl.current?.show();
  }, [])

  return (
    <Layout>
      
        <Loading ref={loadingEl} overlay />
        <iframe onLoad={loadedHandler} className="w-100" style={{height: '1200px'}} src={process.env.NEXT_PUBLIC_INFO_DOMAIN + "/" + slug}></iframe>
    </Layout>
  );
}

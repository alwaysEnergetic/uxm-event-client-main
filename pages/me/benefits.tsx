import { useRef, useEffect } from "react";
import Layout from "src/components/templates/Layout";
import ProfileContainer from "src/components/Profile/ProfileContainer";
import { Loading, LoadingElement } from "src/components/shared/Loading";
import { ProtectRoute } from "src/components/organisms/Auth/AuthContext";
function MeBenefits(): React.ReactElement {
  const loadingEl = useRef<LoadingElement>(null);
  const loadedHandler = () => {
    loadingEl.current?.hide();
  };

  useEffect(() => {
    loadingEl.current?.show();
  }, []);

  return (
    <ProfileContainer>
      <Loading ref={loadingEl} overlay />
      <iframe onLoad={loadedHandler} className='w-100' style={{ height: "1200px" }} src={process.env.NEXT_PUBLIC_INFO_DOMAIN + "/uxm-benefits-info/"}></iframe>
    </ProfileContainer>
  );
}

export default function _MeBenefits() {
  return (
    <Layout>
      <ProtectRoute>
        <MeBenefits />
      </ProtectRoute>
    </Layout>
  );
}

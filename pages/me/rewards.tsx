import { useRef, useEffect } from "react";
import Layout from "src/components/templates/Layout";
import ProfileContainer from "src/components/Profile/ProfileContainer";
import { Loading, LoadingElement } from "src/components/shared/Loading";
import { ProtectRoute } from "src/components/organisms/Auth/AuthContext";
import Rewards from "src/components/pages/Rewards";

export default function RewardsPage() {
  return (
    <Layout>
      <Rewards />
    </Layout>
  );
}

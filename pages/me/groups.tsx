import Layout from 'src/components/templates/Layout'
import ProfileContainer from 'src/components/Profile/ProfileContainer'
import Groups from 'src/components/pages/Groups/GroupsClient'
import { ProtectRoute } from 'src/components/organisms/Auth/AuthContext'

function MeGroups() {
  return (
    <ProfileContainer>
      <Groups mine={true} />
    </ProfileContainer>
  );
}

export default function _MeGroups()  {
  return (
    <Layout>
      <ProtectRoute>
        <MeGroups />
      </ProtectRoute>
    </Layout>
  )
}
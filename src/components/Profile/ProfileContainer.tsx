import React from 'react';
import ProfileNavBar from 'src/components/Profile/ProfileNavBar'
import ProfileCover from 'src/components/Profile/ProfileCover'
import { getUserUID } from 'src/components/organisms/Auth/auth';
import useMounted from 'src/components/atoms/Hook/useMounted'


const ProfileContainer: React.FC<{}>  = ({ children }) => {
  const userSlug = String(getUserUID())

  const mounted = useMounted()

  if(!mounted) return null
  return (
    <>
      <div className="container py-5">
        <ProfileCover userSlug={userSlug} />
        <div className="mt-4 mb-3">
          <ProfileNavBar userSlug={userSlug} />
        </div>
        {children}
      </div>
    </>
  )
}

export default ProfileContainer
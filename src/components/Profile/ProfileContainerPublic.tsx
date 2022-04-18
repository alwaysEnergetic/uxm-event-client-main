import React, { Suspense, lazy, useEffect } from 'react';
import { useRouter } from 'next/router'
import PublicProfileNavBar from 'src/components/Profile/PublicProfileNavBar'
import ProfileNavBar from 'src/components/Profile/ProfileNavBar'
import ProfileCover from 'src/components/Profile/ProfileCover'
import { useAuth } from 'src/components/organisms/Auth/AuthContext'
import { getUserUID } from 'src/components/organisms/Auth/auth';

type ProfileContainerProps = {
  userId?: string
  userSlug?: string
}

const ProfileContainer: React.FC<ProfileContainerProps>  = ({userId, userSlug, children }) => {
  const { isAuthenticated } = useAuth()
  const isPrivate = isAuthenticated && userId === getUserUID()

  // console.log("userSlug", userSlug, userId)
  return (
    <>
      <div className="container py-5">
        <ProfileCover userSlug={userSlug} />
        <div className="mt-4 mb-3 profileNavBarWrapper">
          {isPrivate ? <ProfileNavBar userSlug={userSlug} /> : <PublicProfileNavBar /> }
        </div>
        {children}
      </div>
    </>
  )
}

export default ProfileContainer
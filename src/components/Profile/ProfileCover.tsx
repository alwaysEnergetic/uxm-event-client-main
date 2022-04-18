import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import classnames from 'classnames'
import { TImage, TUser, IAttribute } from "src/lib/types"
import { getGqlClient } from "src/lib/gqlClient"
import UploadPreviewImage from 'src/components/organisms/Upload/UploadPreviewImage'
import { queryUserProfile, queryUserProfileCoverBySlug } from 'src/lib/graphql/schema/connect'
import styles from 'src/styles/Profile.module.scss'

const ProfileView = (props: {userSlug?: string}) => {
  const { userSlug } = props
  
  const [user, setUser] = useState<TUser>()
  const fetchInitialData = async () => {
    if(!userSlug) return null
    // loadingEl.current?.show();
    getGqlClient().request(queryUserProfileCoverBySlug, {slug: userSlug})
    .then((res) => {
      // console.log("queryUserProfileCoverBySlug", res)
      setUser(res.userBySlug)
    })
    .catch((err) => {
      // const msg = gqlErrorFirstMessage(err, {
      //   capitalize: true
      // })
      
    })
    .finally(() => {
      // loadingEl.current && loadingEl.current.hide();
    });
  }

  useEffect(() => {
    fetchInitialData()
  }, [userSlug])

  return (
    <>
      <UploadPreviewImage 
        className={classnames('mb-5 bg-light', styles.coverPhoto)}
        classNamePhoto="h-100"
        image={user?.coverImage} 
        defaultImageUrl={"/images/cover-1.jpg"}
        editable={false}
      />

      <div className={styles.profilePhotoWrap}>
          <UploadPreviewImage 
            className={styles.profilePhotoCtr}
            classNamePhoto={classnames("rounded-circle", styles.profilePhoto)}
            image={user?.profileImage} 
            editable={false}
          />

          <div className={styles.profileHeadingWrap}>
            <div className={styles.profileName}>{user?.firstName} {user?.lastName}</div>
            <div className="tagline">{user?.tagline}</div>
          </div>
      </div>
    </>
  )
}


export default ProfileView
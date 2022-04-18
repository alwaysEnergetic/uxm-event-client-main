import Link from 'next/link'
import { isBlank } from "@muft/dailyfns"
import { TUser } from "src/lib/types";
import LineBreak from "src/components/shared/LineBreak";
import ListToComma from "src/components/shared/ListToComma";
import ShowWrap from "src/components/shared/ShowWrap";
import ProfileLayouts from "src/components/ProfileLayoutEdit/ProfileLayouts";
import { getUserUID } from "src/components/organisms/Auth/auth";
import useMounted from 'src/components/atoms/Hook/useMounted'
import { faCog } from '@symbolia/plsicon'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styleProfileView from "./ProfileView.module.scss"

const ProfileView = (props: { user?: TUser }) => {
  const { user } = props;
  // console.log(user);
  const isEmpty =
    isBlank(user?.tagline2) && !user?.categories && !user?.networks &&
    isBlank(user?.bandName) && isBlank(user?.businessName) &&
    isBlank(user?.country?.name) && isBlank(user?.bio);

  const isMe = getUserUID() == user?.id
  // console.log(isMe, user)

  const mounted = useMounted()

  return (
    <div className="row mt-4">
      <div className="col-md-6">
        <ProfileLayouts layouts={user?.userProfileLayouts} editable={false} />
      </div>
      <div className="col-md-6">
        <div className={styleProfileView.InfoBlock}>
          {mounted ?
            <ShowWrap show={isMe}>
              <Link href="/me/edit"><a className="btn btn-primary mb-4">Click Here to Complete Your Profile</a></Link>
            </ShowWrap>
            : null
          }
          {mounted ? 
            <ShowWrap show={isMe && !user?.hasProfileImage}>
              <div className="alert alert-warning">You may also edit your profile by clicking the <FontAwesomeIcon icon={faCog} /> in the top right of your screen</div>
            </ShowWrap>
            : null
          }
          <ShowWrap show={!isBlank(user?.tagline2)}>
            <div className="mb-3">
              {/* <label className="form-label fw-bold d-block border-bottom pb-2">
                Tagline 2
              </label> */}
              <p>{user?.tagline2}</p>
            </div>
          </ShowWrap>

          <ShowWrap
            show={
              user?.categories !== undefined && user?.categories?.length > 0
            }
          >
            <div className="mb-3">
              <label className="form-label fw-bold d-block border-bottom pb-2">
                Categories
              </label>
              <p>
                <ListToComma itemKey="name" items={user?.categories} />
              </p>
            </div>
          </ShowWrap>

          <ShowWrap
            show={user?.networks !== undefined && user?.networks?.length > 0}
          >
            <div className="mb-3">
              <label className="form-label fw-bold d-block border-bottom pb-2">
                Networks With
              </label>
              <p>
                <ListToComma itemKey="name" items={user?.networks} />
              </p>
            </div>
          </ShowWrap>

          <ShowWrap show={!isBlank(user?.bandName)}>
            <div className="mb-3">
              <label className="form-label fw-bold d-block border-bottom pb-2">
                Band Associations
              </label>
              <p>{user?.bandName}</p>
            </div>
          </ShowWrap>

          <ShowWrap show={!isBlank(user?.businessName)}>
            <div className="mb-3">
              <label className="form-label fw-bold d-block border-bottom pb-2">
                Businesses Associated With
              </label>
              <p>{user?.businessName}</p>
            </div>
          </ShowWrap>

          <ShowWrap
            show={user?.genres !== undefined && user?.genres?.length > 0}
          >
            <div className="mb-3">
              <label className="form-label fw-bold d-block border-bottom pb-2">
                Genres
              </label>
              <p>
                <ListToComma itemKey="name" items={user?.genres} />
              </p>
            </div>
          </ShowWrap>

          <ShowWrap show={!isBlank(user?.country?.name)}>
            <div className="mb-3">
              <label className="form-label fw-bold d-block border-bottom pb-2">
                Country
              </label>
              <p>{user?.country?.name}</p>
            </div>
          </ShowWrap>

          <ShowWrap show={!isBlank(user?.bio)}>
            <div className="mb-3">
              <label className="form-label fw-bold d-block border-bottom pb-2">
                BIO
              </label>
              {/* <p>{user?.bio}</p> */}
              <LineBreak text={user?.bio} />
            </div>
          </ShowWrap>

          <ShowWrap show={isEmpty}>
            <div className="mb-3">
              <label className="form-label fw-bold d-block border-bottom pb-2">
                This user has not added any information to their profile yet.
              </label>
              <LineBreak text={user?.bio} />
            </div>
          </ShowWrap>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;

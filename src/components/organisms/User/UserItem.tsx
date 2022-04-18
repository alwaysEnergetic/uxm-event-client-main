import { useState, useEffect, useRef } from 'react';
import { getGqlClient } from "src/lib/gqlClient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faTrash, faBan, faInbox } from "@fortawesome/free-solid-svg-icons";
import { getUserUID } from '../Auth/auth'
import { gqlErrorFirstMessage } from "@muft/dailyfns"
import { sendFriendRequestQuery, deleteFriendRequestQuery, acceptFriendRequestQuery, rejectFriendRequestQuery, unfriendRequestQuery, mutation_groupInvite } from '../../../lib/graphql/schema/connect'
import PopupChatMessages from 'src/components/organisms/Chat/PopupChatMessages';
import Link from "next/link";
import { ToastContainer, toast } from 'react-toastify';
import { Loading, LoadingElement } from "src/components/shared/Loading";
import styleUser from "./User.module.scss"
import { useAuth } from 'src/components/organisms/Auth/AuthContext'

type UserItemProps = {
  userInfo: {
    id: string;
    slug: string;
    firstName: string;
    lastName: string;
    profileImage: { url: string };
    categories: { name: string }[];
    networks: { name: string }[];
    genres: { name: string }[];
    userFriend: null | {
      id: string;
      status: number;
      toUserId: string;
      userId: string;
    };
  }
  social: boolean
  invite: boolean
  groupId?: string
  isConnect?: boolean
  onRefresh?: () => void
  onMessage?: (id: string) => void
};

const UserItem: React.FC<UserItemProps> = (props) => {
  const { userInfo, social, invite, groupId, isConnect } = props;
  const loadingEl = useRef<LoadingElement>(null);
  const [showMessage, setShowMessage] = useState(false);
  const [messagerId, setMessagerId] = useState('');
  const [friendStatusCode, setFriendStatusCode] = useState<number|null>(userInfo.userFriend ? userInfo.userFriend.status : null)

  const { isAuthenticated } = useAuth()

  const addFriendRequestHandler: () => void = () => {
    getGqlClient()
      .request(sendFriendRequestQuery, {toUserId: userInfo.id}).then((data) => setFriendStatusCode(2))
      .catch((err) => {
        const msg = gqlErrorFirstMessage(err, {capitalize: true});
        console.log(msg);
      })
  };

  const deleteFriendRequestHandler: () => void = () => {
    getGqlClient()
      .request(deleteFriendRequestQuery, {friendUserId: userInfo.id}).then((data) => {
        setFriendStatusCode(null)
        if(typeof props.onRefresh === 'function') { props.onRefresh() }
      })
      .catch((err) => {
        const msg = gqlErrorFirstMessage(err, {capitalize: true});
        console.log(msg);
      })
  };

  const acceptFriendRequestHandler: () => void = () => {
    getGqlClient()
      .request(acceptFriendRequestQuery, {fromUserId: userInfo.id}).then((data) => {
        setFriendStatusCode(1)
        if(typeof props.onRefresh === 'function') { props.onRefresh() }
      })
      .catch((err) => {
        const msg = gqlErrorFirstMessage(err, {capitalize: true});
        console.log(msg);
      })
  };

  const rejectFriendRequestHandler: () => void = () => {
    getGqlClient()
      .request(rejectFriendRequestQuery, {fromUserId: userInfo.id}).then((data) => {
        setFriendStatusCode(null)
        if(typeof props.onRefresh === 'function') { props.onRefresh() }
      })
      .catch((err) => {
        const msg = gqlErrorFirstMessage(err, {capitalize: true});
        console.log(msg);
      })
  };

  const unfriendRequestHandler: () => void = () => {
    getGqlClient()
      .request(unfriendRequestQuery, {friendUserId: userInfo.id}).then((data) => {
        setFriendStatusCode(null)
        if(typeof props.onRefresh === 'function') { props.onRefresh() }
      })
      .catch((err) => {
        const msg = gqlErrorFirstMessage(err, {capitalize: true});
        console.log(msg);
      })
  };  

  const messageHandler = () => {
    if(typeof(props.onMessage) === 'function') { props.onMessage(userInfo.id) }
  }

  const messagePopupHandler: (id) => void = (id) => {
    setShowMessage(true);
    setMessagerId(userInfo.id);
  }

  const messagePopupCloseHandler = () => {
    setShowMessage(false);
    setMessagerId('');
  }

  const handleGroupInvite = () => {
    loadingEl.current?.show();
    getGqlClient().request(mutation_groupInvite, {groupId: groupId, toUserId: userInfo.id})
    .then((res) => {
      console.log(res)
      toast.success("Invited successfully.");
    })
    .catch((err) => {
      const msg = gqlErrorFirstMessage(err, {
        capitalize: true
      })
      toast.error(msg);
    })
    .finally(() => {
      loadingEl.current?.hide();
    });
  }

  return (
  <>
    <ToastContainer />
    <Loading ref={loadingEl} overlay />
    <PopupChatMessages email={isConnect} show={showMessage} userId={messagerId} onClose={messagePopupCloseHandler}/>

    <div className={styleUser.UserItem}>
      <img
        className="rounded-circle m-2 row"
        style={{
          width: "100px",
          height: "100px",
          minWidth: "100px",
          maxWidth: "100px",
        }}
        src={
          userInfo.profileImage
            ? userInfo.profileImage.url
            : "https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png"
        }
      ></img>

      <div className="row">
        <Link href={"/users/" + userInfo.slug}>
        <a className={"mt-1 mb-2 " + styleUser.name}>{`${userInfo.firstName} ${userInfo.lastName}`}</a>
        </Link>
        {userInfo.categories && (
          <p className="text-muted m-1">
            <strong className="text-dark">Categories:</strong>{" "}
            {userInfo.categories.map(
              (x, idx) =>
                ` ${x.name} ${
                  idx !== userInfo.categories.length - 1 ? "/" : ""
                }`
            )}
          </p>
        )}

        {userInfo.networks && (
          <p className="text-muted m-1">
            <strong className="text-dark">Networks With:</strong>{" "}
            {userInfo.networks.map(
              (x, idx) =>
                ` ${x.name} ${idx !== userInfo.networks.length - 1 ? "/" : ""}`
            )}
          </p>
        )}

        {userInfo.genres && (
          <p className="text-muted m-1">
            <strong className="text-dark">Genre:</strong>{" "}
            {props.userInfo.genres.map(
              (x, idx) =>
                `  ${x.name} ${idx !== userInfo.genres.length - 1 ? "/" : ""}`
            )}
          </p>
        )}

        {/* Social Relation Buttons */}
        {social && isAuthenticated && <div>
          {/* Status null OR 3: No relationship, show Add Friend button */}
          {(!friendStatusCode || friendStatusCode === 3) && (
            <button
              onClick={addFriendRequestHandler}
              className="btn btn-secondary btn-sm m-2"
            >
              <FontAwesomeIcon icon={faUser} /> Add Friend
            </button>
          )}

          {/* Status 1: Already Friend, Show Unfriend Button */}
          {friendStatusCode === 1 && (
            <button
              onClick={unfriendRequestHandler}
              className="btn btn-outline-secondary btn-sm m-2"
            >
              <FontAwesomeIcon icon={faBan} /> Unfriend
            </button>
          )}

          {/* Status 2: Friend Request Pending (sender, receiver)*/}
          {(friendStatusCode === 2 && userInfo.userFriend?.toUserId !== getUserUID()) && (
            <button
              onClick={deleteFriendRequestHandler}
              className="btn btn-outline-secondary btn-sm m-2"
            >
              <FontAwesomeIcon icon={faTrash} /> Delete Request
            </button>
          )}
          {(friendStatusCode === 2 && userInfo.userFriend?.toUserId === getUserUID()) && (<>
              <button onClick={acceptFriendRequestHandler} className="btn btn-success btn-sm m-2">
                Accept
              </button>
              <button onClick={rejectFriendRequestHandler} className="btn btn-danger btn-sm m-2">
                Reject
              </button>
            </>
          )}

          <button onClick={messagePopupHandler} className="btn btn-primary btn-sm mx-2 my-2">
            <FontAwesomeIcon icon={faEnvelope} /> Message
          </button>
        </div>
        }

        {/* Group Invite Related Buttons */}
        {(invite && groupId && isAuthenticated) && <div>
          <button className="btn btn-primary mx-2 my-2" onClick={handleGroupInvite}>
            <FontAwesomeIcon icon={faInbox} /> Invite
          </button>
        </div>}
      </div>
    </div>
  </>);
};

export default UserItem;

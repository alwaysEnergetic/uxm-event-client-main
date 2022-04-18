
import { useState, useEffect } from "react";
import Head from "next/head";
import Layout from "src/components/templates/Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import ProfileContainer from "src/components/Profile/ProfileContainer";
import { gqlErrorFirstMessage } from "@muft/dailyfns"
import { getGqlClient } from "src/lib/gqlClient";
import { userFriendsQuery } from "src/lib/graphql/schema/connect";
import { getUserUID } from "src/components/organisms/Auth/auth";
import UserItem from "src/components/organisms/User/UserItem";
import { useRouter } from "next/router";
import { useSpinner } from 'src/components/atoms/Spinner'

import { ProtectRoute } from "src/components/organisms/Auth/AuthContext";

function MeFriends() {
  const router = useRouter();
  const [friends, setFriends] = useState([]);
  const [friendsRequestReceived, setFriendsRequestReceived] = useState([]);
  const [friendsRequestSent, setFriendsRequestSent] = useState([]);
  // 0 = Friends | 1 = Received Friend Requests | 2 = Sent Friend Request
  const [displayMode, setDisplayMode] = useState(0);

  const {showSpinner, hideSpinner, isSpinning} = useSpinner()

  const requestFriends: () => void = () => {
    showSpinner();
    getGqlClient()
      .request(userFriendsQuery)
      .then((data) => {
        setFriends(data.users.items.filter((x) => x.userFriend.status === 1));
        setFriendsRequestReceived(data.users.items.filter((x) => x.userFriend.status === 2 && x.userFriend.toUserId === getUserUID()));
        setFriendsRequestSent(data.users.items.filter((x) => x.userFriend.status === 2 && x.userFriend.userId === getUserUID()));
      })
      .catch((err) => {
        setFriends([]);
        setFriendsRequestReceived([]);
        setFriendsRequestSent([]);
        const msg = gqlErrorFirstMessage(err, { capitalize: true });
        console.log(msg);
      })
      .finally(() => {
        hideSpinner();
      });
  };

  useEffect(() => {
    requestFriends();
  }, []);

  const refreshDataHandler: () => void = () => {
    requestFriends();
  };

  const loading = isSpinning()

  return (
    <>
      <Head>
        <title>Friends - The UXM</title>
      </Head>

      <ProfileContainer>
        <div className='d-flex py-2 my-2 justify-content-around border'>
          <button onClick={() => setDisplayMode(0)} className={`btn ${displayMode === 0 ? "btn-dark" : "btn-light"} px-5 shadow-sm`}>
            <FontAwesomeIcon icon={faUsers} /> My Friends{" "}
            <span className='col-md-3 px-2 rounded border' style={{ width: "20px", height: "20px" }}>
              {friends.length ? friends.length : "-"}
            </span>
          </button>
          <button onClick={() => setDisplayMode(1)} className={`btn ${displayMode === 1 ? "btn-dark" : "btn-light"} px-5 shadow-sm`}>
            Friend Requests{" "}
            <span className='col-md-3 px-2 rounded border' style={{ width: "20px", height: "20px" }}>
              {friendsRequestReceived.length ? friendsRequestReceived.length : "-"}
            </span>
          </button>
          <button onClick={() => setDisplayMode(2)} className={`btn ${displayMode === 2 ? "btn-dark" : "btn-light"} px-5 shadow-sm`}>
            Friend Requests Sent{" "}
            <span className='col-md-3 px-2 rounded border' style={{ width: "20px", height: "20px" }}>
              {friendsRequestSent.length ? friendsRequestSent.length : "-"}
            </span>
          </button>
        </div>


        {/* Load Friend Based on what tab (determined by displayMode) user's on. */}
        {!loading &&
          displayMode === 0 &&
          friends.map((x, idx) => {
            return <UserItem userInfo={x} social={true} invite={false} key={idx} onRefresh={refreshDataHandler} />;
          })}

        {!loading && displayMode === 1 && friendsRequestReceived.map((x, idx) => <UserItem userInfo={x} social={true} invite={false} key={idx} onRefresh={refreshDataHandler} />)}

        {!loading && displayMode === 2 && friendsRequestSent.map((x, idx) => <UserItem userInfo={x} social={true} invite={false} key={idx} onRefresh={refreshDataHandler} />)}

        {!loading && friends.length === 0 && displayMode === 0 && <h5 className='my-5 text-center'>You have not added any friends yet.</h5>}
        {!loading && friendsRequestReceived.length === 0 && displayMode === 1 && <h5 className='my-5 text-center'>You have no friend request now.</h5>}
        {!loading && friendsRequestSent.length === 0 && displayMode === 2 && <h5 className='my-5 text-center'>You have not sent any friend request yet.</h5>}
      </ProfileContainer>
    </>
  );
}

export default function _MeFriends() {
  return (
    <Layout>
      <ProtectRoute>
        <MeFriends />
      </ProtectRoute>
    </Layout>
  );
}

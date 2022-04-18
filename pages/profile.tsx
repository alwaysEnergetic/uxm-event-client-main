import React, { useEffect } from "react";
import { getUserUID } from "src/components/organisms/Auth/auth";
import Layout from "src/components/templates/Layout";
import { getUserProfileLink } from "src/constant";

const Profile = () => {
  /*
   * Redirect the user to Homepage or his profile link if user is logged in 
  */
  useEffect(() => {
    const userID = getUserUID();
    const link = getUserProfileLink(userID);
    window.location.href = link;
  }, []);

  return (
    <Layout>
      <div className='container py-5'>Loading ....</div>
    </Layout>
  );
};

export default Profile;

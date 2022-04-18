import type { NextPage } from "next";
import Users from "src/components/organisms/User/Users";
import DeadSimpleRooms from './DeadSimpleRooms'

const Connect: NextPage = () => {
  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-6 col-sm-12 mb-4">
          <DeadSimpleRooms />
        </div>
        <div className="col-md-6 col-sm-12">
          <Users social={true} invite={false} isConnect={true}/>
        </div>
      </div>
    </div>
  );
};

export default Connect;

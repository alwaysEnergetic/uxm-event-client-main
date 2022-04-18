import { useState } from "react";
import { NextPage, GetServerSideProps, } from "next";
import { getGqlClientServer } from "src/lib/gqlClient";
import { groupBySlugQuery, groupMemberQuery } from "src/lib/graphql/schema/connect";
import { Nav, Navbar, Container } from "react-bootstrap";
import Layout from "src/components/templates/Layout";
import GroupItem from "src/components/pages/Groups/GroupItem";
import UserItem from "src/components/organisms/User/UserItem";
import Users from "src/components/organisms/User/Users";
import ChatMessages_2 from "src/components/organisms/Chat/ChatMessages_2";
import { TUser } from "src/lib/types"
import Meta from "src/components/shared/Meta"

export const getServerSideProps: GetServerSideProps = async (propsServer) => {
  const {req, res, query} = propsServer
  try {
    const gqlClientServer = getGqlClientServer(propsServer)
    const content = await gqlClientServer.request(groupBySlugQuery, {
      slug: query.slug,
    });
    const members = await gqlClientServer.request(groupMemberQuery, {
      groupId: content.groupBySlug.id,
    });
    return {
      props: {
        group: content.groupBySlug,
        users: members.users.items,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};

type GroupsDetailPageProps = {
  group: any;
  users: TUser[];
};

const GroupsDetailPage: NextPage<GroupsDetailPageProps> = (
  props: GroupsDetailPageProps
) => {
  const [displaying, setDisplaying] = useState("discussion");
  const { group, users } = props;

  return (
    <Layout>
      <Meta title={`${group.name}`}  descr={group.descr} image={group.image?.url} />

      <div className='container pt-5'>
        <div>
          <GroupItem content={group} />
        </div>

        {/* <Navbar className='my-3 border-top border-bottom'> */}
        <Navbar bg="dark" expand="lg" variant="dark" className={'my-3'}>
          <Container>
            <Navbar.Toggle aria-controls='responsive-navbar-nav' />
            <Navbar.Collapse id='responsive-navbar-nav'>
              <Nav className='me-auto'>
                <Nav.Link
                  onClick={() => setDisplaying("discussion")}
                  className={`mx-2 ${
                    displaying === "discussion" ? "text-info" : ""
                  }`}
                >
                  Discussion
                </Nav.Link>
                <Nav.Link
                  onClick={() => setDisplaying("members")}
                  className={`mx-2 ${
                    displaying === "members" ? "text-info" : ""
                  }`}
                >
                  Members
                </Nav.Link>
                <Nav.Link
                  onClick={() => setDisplaying("invite")}
                  className={`mx-2 ${
                    displaying === "invite" ? "text-info" : ""
                  }`}
                >
                  Send Invite
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        {displaying === "discussion" && (
          <ChatMessages_2 threadId ={group.threadId} show={true} />
          //<ChatMessages threadId={group.threadId} show={true} />
        )}

        {displaying === "members" && (
          <>
            {users.length === 0 && (
              <h4 className='text-center m-4'>
                This group has no members yet.
              </h4>
            )}
            {users &&
              users.map((x, idx) => (
                <UserItem
                  userInfo={x}
                  social={false}
                  invite={false}
                  key={idx}
                />
              ))}
          </>
        )}

        {displaying === "invite" && (
          <Users groupId={group.id} social={false} invite={true} />
        )}
      </div>
    </Layout>
  );
};

export default GroupsDetailPage;

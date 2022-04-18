import { GraphQLClient, gql } from "graphql-request";

export const queryUserProfile = gql`
  query {
    user {
      firstName
      lastName
      id
      countryId
      genreIds
      categoryIds
      tagline
      tagline2
      businessName
      bandName
      bio
      profileImageId
      coverImageId
      profileImage {
        id
        url
      }
      coverImage {
        id
        url
      }
      genres {
        id
        name
      }
      categories {
        id
        name
      }
      networks {
        id
        name
      }
      country {
        id
        name
      }
      userProfileLayouts {
        id
        ref
        value
        sortOrder
        data {
          __typename
          ... on UserLink {
            id
            link
            source
            label
          }

          ... on Image {
            id
            url
          }
        }
      }
    }
    genres {
      id
      name
    }
    categories {
      id
      name
    }
    countries {
      id
      name
    }
  }
`;

export const queryUserPublicProfile = gql`
  query userBySlug($slug: String!) {
    userBySlug(slug: $slug) {
      id
      slug
      firstName
      lastName
      tagline
      tagline2
      businessName
      bandName
      bio
      stepsCompleted
      hasProfileImage
      profileImage {
        url
      }
      coverImage {
        url
      }
      genres {
        name
      }
      categories {
        name
      }
      networks {
        name
      }
      country {
        name
      }
      userProfileLayouts {
        id
        data {
          __typename
          ... on UserLink {
            id
            link
            source
            label
          }

          ... on Image {
            id
            url
          }
        }
      }
    }
  }
`;

export const queryUserProfileCoverBySlug = gql`
  query userBySlug($slug: String!) {
    userBySlug(slug: $slug) {
      firstName
      lastName
      tagline
      profileImage {
        url
      }
      coverImage {
        url
      }
    }
  }
`;

export const mutationUserEdit = gql`
  mutation userEdit($input: UserEditInput!) {
    userEdit(input: $input)
  }
`;

export const queryUserProfileLayouts = gql`
  query {
    userProfileLayouts {
      id
      ref
      value
      sortOrder
      data {
        __typename
        ... on UserLink {
          id
          link
          source
          label
        }

        ... on Image {
          id
          url
        }
      }
    }
  }
`;

export const mutationUserProfileLayoutCreate = gql`
  mutation userProfileLayoutCreate($input: UserProfileLayoutCreateInput!) {
    userProfileLayoutCreate(input: $input) {
      id
      userId
      ref
      value
    }
  }
`;

export const mutationUserProfileLayoutUpdate = gql`
  mutation userProfileLayoutUpdate($input: UserProfileLayoutUpdateInput!) {
    userProfileLayoutUpdate(input: $input)
  }
`;

export const mutationUserProfileLayoutDelete = gql`
  mutation userProfileLayoutDelete($id: Uid!) {
    userProfileLayoutDelete(id: $id)
  }
`;

export const queryLiveEventBySlug = gql`
  query liveEventBySlug($slug: String!) {
    liveEventBySlug(slug: $slug) {
      id
      name
      userId
      userId
      awsIvsUrl
      data
      metaTitle
      metaDescr
      isPublic
    }
  }
`;

export const mutationUserLinkCreate = gql`
  mutation userLinkCreate($input: UserLinkCreateInput!) {
    userLinkCreate(input: $input) {
      id
      link
      source
      label
      createdAt
    }
  }
`;

export const mutation_groupInvite = gql`
  mutation groupInvite($groupId: Uid!, $toUserId: Uid!) {
    groupInvite(groupId: $groupId, toUserId: $toUserId)
  }
`;

export const sendFriendRequestQuery = gql`
  mutation userFriendCreate($toUserId: Uid!) {
    userFriendCreate(toUserId: $toUserId)
  }
`;

// The Request below is not a typo, just followed the GraphQL Server's command.
export const deleteFriendRequestQuery = gql`
  mutation userFriendDeleteReqeust($friendUserId: Uid!) {
    userFriendDeleteReqeust(friendUserId: $friendUserId)
  }
`;

export const acceptFriendRequestQuery = gql`
  mutation userFriendUpdate($fromUserId: Uid!) {
    userFriendUpdate(fromUserId: $fromUserId, action: APPROVE)
  }
`;

export const rejectFriendRequestQuery = gql`
  mutation userFriendUpdate($fromUserId: Uid!) {
    userFriendUpdate(fromUserId: $fromUserId, action: REJECT)
  }
`;

export const unfriendRequestQuery = gql`
  mutation userFriendUnfriend($friendUserId: Uid!) {
    userFriendUnfriend(friendUserId: $friendUserId)
  }
`;

export const usersQuery = gql`
  query users(
    $filters: [FilterInput!]
    $limit: Int! = 10
    $offset: Int! = 0
    $orderBy: [SortOrderInput!] = []
  ) {
    users(
      filters: $filters
      limit: $limit
      offset: $offset
      orderBy: $orderBy
    ) {
      items {
        id
        slug
        firstName
        lastName
        profileImage {
          url
        }
        categories {
          name
        }
        networks {
          name
        }
        genres {
          name
        }
        userFriend {
          id
          userId
          toUserId
          status
        }
      }
    }
  }
`;

export const userFriendsQuery = gql`
  query {
    users(mine: true) {
      items {
        id
        firstName
        lastName
        profileImage {
          url
        }
        slug
        userFriend {
          id
          userId
          toUserId
          status
        }
      }
    }
  }
`;

export const groupBySlugQuery = gql`
  query groupBySlug($slug: String!) {
    groupBySlug(slug: $slug) {
      id
      name
      slug
      descr
      link1Name
      link1Href
      link2Name
      link2Href
      image {
        id
        url
      }
      joined
      threadId
    }
  }
`;

export const genresQuery = gql`
  query {
    genres {
      id
      name
    }
  }
`;

export const categoriesQuery = gql`
  query {
    categories {
      id
      name
    }
  }
`;

export const groupMemberQuery = gql`
  query users($groupId: Uid!) {
    users(groupId: $groupId) {
      items {
        id
        firstName
        lastName
        slug
        profileImage {
          url
        }
        categories {
          name
        }
        networks {
          name
        }
        genres {
          name
        }
      }
    }
  }
`;

export const query_chatMyThreads = gql`
  query {
    chatMyThreads {
      id
      name
      typeId
      users {
        id
        slug
        fullName
        profileImageId
        profileImage {
          id
          url
        }
      }
    }
  }
`;

export const getChatThreadQuery = gql`
  mutation chatGetPrivateThread($userId: Uid!) {
    chatGetPrivateThread(userId: $userId) {
      id
      name
      typeId
      users {
        id
        slug
        fullName
        profileImageId
        profileImage {
          id
          url
        }
      }
    }
  }
`;
/*
export const getChatMessagesQuery = gql`
  query chatMessages($threadId: Uid!) {
    chatMessages(threadId: $threadId) {
      id
      userId
      createdAt
      content
      user {
        id
        slug
        fullName
        profileImage {
          url
        }
      }
    }
  }
`;
*/

export const getChatMessagesQuery = gql`
  query chatMessages($threadId: Uid! $limit: Int! = 10 $offset: Int! = 0) {
    chatMessages(
      threadId: $threadId
      limit: $limit
      offset: $offset
      ) {
      id
      userId
      content
      createdAt
      user {
        id
        slug
        fullName
        profileImage {
          url
        }
      }
      leaf
      childs {
        id
        content
        leaf
        createdAt
        user {
          id
          slug
          fullName
          profileImage {
            url
          }
        }
          childs {
            id
            content
            leaf
            createdAt
            user {
              id
              slug
              fullName
              profileImage {
                url
              }
            }
          }
      }
    }
  }
`;

export const sendChatMessageQuery = gql`
  mutation chatSendMessage($input: SendMessageInput!) {
    chatSendMessage(input: $input)
  }
`;

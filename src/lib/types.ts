
export interface TImage {
  __typename: "Image"
  id: string
  url: string
}

export interface TUserLink {
  __typename: "UserLink"
  id: string;
  source: string;
  label: string;
  link: string;
}


export interface TUser {
  id: string;
  slug: string;
  firstName: string;
  lastName: string;
  tagline: string
  tagline2: string;
  businessName: string;
  bandName: string;
  bio: string;
  stepsCompleted: number;
  hasProfileImage: boolean
  countryId: string;
  genreIds: string[];
  categoryIds: string[];
  networkIds: string[];
  profileImageId: string;
  coverImageId: string;
  profileImage: TImage
  coverImage: TImage
  categories: IAttribute[]
  genres: IAttribute[]
  networks: IAttribute[]
  country: IAttribute
  userFriend: TUserFriend
	userProfileLayouts: TUserProfileLayoutView[] 
}

export interface TUserFriend {
  id: string;
	userId: string;
	toUserId: string;
	status: number;
}
export interface IAttribute {
  id: string;
  name: string;
}


export interface TUserProfileLayoutView {
  id: string;
  ref: string;
  value: string;
  sortOrder: number;
  data: TUserLink | TImage
}

export type MessageUser = {
  id: string
  slug: string
  fullName: string
  profileImageId: string
  profileImage: TImage
}

export type Thread = {
  id: string
  name: string
  typeId: number
  users: MessageUser[]
}



export interface TLiveEvent {
  id: string;
  name: string;
  userId: string;
  awsIvsUrl: string;
  metaTitle: string;
  metaDescr: string;
  isPublic: boolean;
  data: {
    showTipToken: false,
    "inviteWidgetTitle": "Invite Friends",
    "radioIframe": "https://uxm-static.s3.us-east-2.amazonaws.com/radio-player.html?station=a03922&s=md&m=dark",
    headerImage: "https://uxm-static.s3.us-east-2.amazonaws.com/6fdd7a3a-690b-4b4d-b1f4-ef0ce1fb84d8/UXM-radio-listen-now-1930-800.png",
    "deadSimpleId": "fVBxwhRR5",
    "heading1": "Click Here to Join the PStv UXM Forum",
    "heading1Link": "https://info.theuxm.com/groups/pstv-music-funtertainment-web-show-discussion-forum/",
    "carousel" : [
      {
       "url": "https://info.theuxm.com/wp-content/uploads/PStv-Today.jpg"
      },
      {
       "url": "https://cdn.theuxm.com/2021/8/6354c864-9970-4a4b-8730-415c3c671fc4.jpg"
      },
      {
       "url": "https://cdn.theuxm.com/2021/8/b269f0e8-dbcc-4132-a0ac-bef14cbe4e87.jpeg"
      },
      {
       "url": "https://cdn.theuxm.com/2021/8/9216334c-1195-4bab-86ef-2588a0be70ee.jpeg"
      }
    ]
  }
}
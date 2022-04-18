import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@symbolia/plsicon'
import { TImage, TUserLink, TUserProfileLayoutView } from "src/lib/types"
import styles from 'src/styles/Profile.module.scss'

function GetIframeAttributesFromURL(url: string) {
  // console.log(url)
  let types = [
    {
      key1 : "music.apple.com",
      key2: "?i=",
      height: "150"
    },
    {
      key1 : "music.apple.com",
      key2: "album",
      height: "350"
    },
    
  ]

  const result = types.filter(type => {
    return url.indexOf(type.key1)!==-1 && (type?.key2 ? url.indexOf(type.key2)!==-1 : true)
  });

  // console.log(result)
  return result.length > 0 ? result[0] : {
    height: '350'
  }


}

const UserLinkView = (props: {data: TUserLink}) => {
  const { data } = props

  const attribs = GetIframeAttributesFromURL(data.link)
  return (
    <div className="mb-4">
      <iframe src={data?.link} width="100%" height={attribs.height} allowFullScreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
      { data?.label ? <div> <span className="badge bg-dark fs-12">{data.label}</span></div> : null }
    </div>
  )  
}

const ImageView = (props: {data: TImage}) => {
  const { data } = props
  return (
    <div className={"mb-4 " + styles.layoutImage}>
      <img src={data?.url} />
    </div>
  )  
}

type ProfileLayoutProps = {
  layout: TUserProfileLayoutView
  onEditHandle?: (data: TUserProfileLayoutView) => void
  onDelete?: (id: string) => void
  editable?: boolean
}


const ProfileLayout = (props: ProfileLayoutProps) => {
  const { layout, onEditHandle, onDelete, editable } = props
  const data = layout.data
  const handleEdit = () => {
    typeof(onEditHandle)=="function" && onEditHandle(layout)
  }

  const handleDelete = () => {
    typeof(onDelete)=="function" && onDelete(layout.id)
  }
  return (
    <div className={"position-relative"}>
      {/* <button className="btn btn-primary btn-sm" onClick={handleEdit}>Edit</button> */}
      {editable ? 
      <button className="btn btn-danger btn-sm position-absolute top-0 end-0" onClick={handleDelete}>
        <FontAwesomeIcon icon={faTrash} />
      </button>
      : null }
      
      {(function () {
        switch (data?.__typename) {
          case "UserLink":
            return <UserLinkView data={data} />
            break;
          case "Image":
            return <ImageView data={data} />
          default:
            return null
            break;
        }
      })()}

    </div>
  )  
}

type ProfileLayoutsProps = {
  layouts?: TUserProfileLayoutView[]
  onEditHandle?: (data: TUserProfileLayoutView) => void
  onDelete?: (id: string) => void
  editable?: boolean
  
}

const ProfileLayouts = (props: ProfileLayoutsProps) => {
  const { layouts = [], onEditHandle, onDelete, editable } = props
  // console.log(layouts)
  return (
    <div className={styles.profileLayouts}>
      {layouts.map((layout, idx) => {
        return <ProfileLayout 
          key={idx} 
          layout={layout} 
          onEditHandle={onEditHandle} 
          onDelete={onDelete} 
          editable={editable}
        />
      })}
    </div>
  )
}

export default ProfileLayouts
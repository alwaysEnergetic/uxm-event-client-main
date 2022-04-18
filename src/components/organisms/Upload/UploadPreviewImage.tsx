import { useEffect, useState, useRef } from 'react'
import classnames from 'classnames'
import { TImage } from "../../../lib/types"
import Dropdown from 'react-bootstrap/Dropdown'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera, faHourglass } from '@symbolia/plsicon'
import UploadWithCropModal from 'src/components/organisms/Upload/UploadWithCropModal'
import { UploadResponse } from 'src/components/organisms/Upload/Upload'
import useMounted from 'src/components/atoms/Hook/useMounted'

type UploadImageProps = {
  className?: string
  classNamePhoto?: string
  image?: TImage
  defaultImageUrl?: string
  classImageButton?: string
  onComplete?: (res: UploadResponse, file?: File) => void
  onError?: (error: Error, file?: File) => void
  editable?: boolean
  onDelete?: () => void
  crop?: {
    aspect: number
  }
}

const UploadImage = (props: UploadImageProps) => {
  const { onComplete, onError, onDelete, image, defaultImageUrl, className, classNamePhoto, editable=true, crop, classImageButton} = props
  const [myimage, setMyImage] = useState<TImage>()
  // const fileInput = useRef<HTMLInputElement>();
  // const [isUploading, setIsUploading] = useState(false);
  const [showUploader, setShowUploader] = useState(false);
  const modalRef: any = useRef()


  useEffect(() => {
    setMyImage(image)
  }, [JSON.stringify(image)])

  const handleUploadBtn = () => {
    // console.log(fileInput)
    // fileInput.current?.click();
    console.log("Uploader")
    modalRef.current.show()
    // setShowUploader(true)
  }

  const handleDelete = () => {
    setMyImage({} as any)
    typeof(onDelete)=="function" && onDelete()
  }

  // const uploadingHandler = (status: boolean) => { console.log('Loading',status);setIsUploading(status) }
  const mounted = useMounted()


  return(
    <>
    <div className={classnames('position-relative', className)}>
      <div className={classnames(classNamePhoto)}>
        { myimage?.url ? 
          <img src={myimage.url} /> : 
          defaultImageUrl ?
          <img src={defaultImageUrl} /> :
          null
        }
      </div>
      {editable && mounted ? 
      <>
        <Dropdown className={classnames('py-1 px-2 rounded-circle position-absolute start-50 top-50 translate-middle', classImageButton)}>
          <Dropdown.Toggle variant="void" className="nav-link">
            <FontAwesomeIcon icon={faCamera} />
          </Dropdown.Toggle>

          <Dropdown.Menu align="start">
            <button className="dropdown-item" onClick={handleUploadBtn}>Upload</button>
            <button className="dropdown-item" onClick={handleDelete}>Remove Photo</button>
            
          </Dropdown.Menu>
        </Dropdown>
        <UploadWithCropModal 
          ref={modalRef}
          show={showUploader}
          crop={crop}
          // inputRef={fileInput as any}
          // inputClassName={'d-none'}
          // onUploading={uploadingHandler}
          onComplete={(res, file) => {
            // setIsUploading(false);
            setMyImage(res[0])
            typeof(onComplete)=="function" && onComplete(res, file)
          }}
        />
      </> : null }
    </div>
    </>
  )


}

export default UploadImage
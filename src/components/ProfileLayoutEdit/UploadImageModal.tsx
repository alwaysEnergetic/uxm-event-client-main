import { useState } from 'react'
import classnames from 'classnames'
import { Modal, Button } from 'react-bootstrap'
import Upload from 'src/components/organisms/Upload/Upload'
import { UploadResponse } from 'src/components/organisms/Upload/Upload'
import styles from 'src/styles/Profile.module.scss'

export type UploadImageModalProps = {
  onComplete?: (res: UploadResponse, file?: File) => void
  onError?: (error: Error, file?: File) => void
}

const UploadImageModal = (props: UploadImageModalProps) => {
  const { onComplete, onError } = props
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" size="sm" className="me-2" onClick={handleShow}>
        Add Image
      </Button>

     <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Upload Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Upload 
            // className={classnames('mb-5 bg-light', styles.coverPhoto)}
            // image={user?.coverImage} 
            onComplete={(res, file) => {
              typeof(onComplete)=="function" && onComplete(res, file)
              setShow(false)
            }}
          />
        </Modal.Body>
        
      </Modal>
    </>
  )
}

export default UploadImageModal
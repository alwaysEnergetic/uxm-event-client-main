import { useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import classnames from 'classnames'
import { Modal, Button } from 'react-bootstrap'
import { UploadResponse } from './constant'
import UploadWithCrop from './UploadWithCrop'
// import UploadImage from './UploadImage'
import useMounted from 'src/components/atoms/Hook/useMounted'

export type UploadWithCropModalProps = {
  onComplete?: (res: UploadResponse, file?: File) => void
  onError?: (error: Error, file?: File) => void
  show?: boolean
  crop?: {
    aspect: number
  }
}

const UploadWithCropModal = (props: UploadWithCropModalProps, ref) => {
  const { onComplete, onError, show: showme = false, crop } = props
  const [show, setShow] = useState(showme);
  const handleClose = () => setShow(false);

  const handleOnComplete = (res, file) => {
    setShow(false)
    typeof(onComplete)=="function" && onComplete(res, file);
  }

  useImperativeHandle(ref, () => ({
    show() {
      setShow(true)
    }
  }))

  const mounted = useMounted()
  if(!mounted) return null

  return (
    <>
     <Modal show={show} onHide={handleClose} backdrop={'static'}>
        <Modal.Header closeButton>
          <Modal.Title>Upload Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UploadWithCrop
            onComplete={handleOnComplete}
            onError={onError}
            crop={crop}
          />
        </Modal.Body>
      </Modal>
    </>
  )
}

export default forwardRef(UploadWithCropModal)
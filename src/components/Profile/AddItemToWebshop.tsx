import { useState } from 'react'
import { Modal } from 'react-bootstrap'

const AddItemToWebshop = (props: {title?: string, className?: string}) => {
  const { title = "Add Items", className="btn btn-primary mt-2" } = props
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleBuyToken = () => {
    setShow(true)
  }

  return (
    <>
      <div>
        <button className={className} onClick={handleBuyToken}>{title}</button>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
         <iframe src={"https://info.theuxm.com/add-item-to-webshop/"} width="100%" height="500px"></iframe>
        </Modal.Body>
        
      </Modal>
      </div>
    </>
  )
}

export default AddItemToWebshop
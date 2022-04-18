import { useState } from 'react'
import classnames from 'classnames'
import { Button, Modal, Accordion, Card, useAccordionButton } from 'react-bootstrap'

type ButtonModalProps = {
  buttonClassName?: string
  buttonTitle?: string
  dialogTitle?: string
  dialogClassName?: string
  children: React.ReactNode
}

function ButtonModal(props: ButtonModalProps) {
  const {buttonClassName="btn btn-primary", buttonTitle="Open Modal", dialogTitle, dialogClassName, children} = props
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button className={buttonClassName} onClick={handleShow}>
        {buttonTitle}
      </button>

      <Modal show={show} onHide={handleClose} dialogClassName={dialogClassName}>
        <Modal.Header closeButton>
          {dialogTitle ? <Modal.Title>{dialogTitle}</Modal.Title> : null }
        </Modal.Header>
        <Modal.Body>
          {children}
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
}

export default ButtonModal
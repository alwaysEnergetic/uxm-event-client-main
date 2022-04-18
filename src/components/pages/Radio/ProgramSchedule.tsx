import React from 'react';
import {Modal, Button} from "react-bootstrap"
import { getUserUID, getUserEmail } from 'src/components/organisms/Auth/auth'


const ProgramSchedule = () => {
    const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const now = Date.now(); 

  return (
    <>
      <img src={"https://info.theuxm.com/wp-content/uploads/radio-art.jpg?ts="+now} onClick={handleShow}/>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Full Program Schedule</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <iframe
            src={`https://info.theuxm.com/the-uxm-radio-schedule/?email=${getUserEmail()}&userid=${getUserUID()}`}
            className='w-100'
            style={{ height: "400px" }}
          ></iframe>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ProgramSchedule;
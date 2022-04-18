import React from "react";
import { Modal, Button } from "react-bootstrap";
import { getUserUID, getUserEmail } from 'src/components/organisms/Auth/auth'

const RadioSongSubmission = () => {
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant='primary' size='sm' className='ms-2' onClick={handleShow}>
        Submit Song to UXM Radio
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Upload or provide a link to a downloadable mp3 or mp4 file
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <iframe
            src={`https://info.theuxm.com/uxm-radio-song-submission/?email=${getUserEmail()}&userid=${getUserUID()}`}
            className='w-100'
            style={{ height: "400px" }}
          ></iframe>
        </Modal.Body>
      </Modal>
    </>
  );
};

/* 
1. Add a margin right to the left button
2. Make a model that render an iframe with the UXM radio submission form
*/
export default RadioSongSubmission;

import React, {useEffect} from 'react';
import {Modal, Button} from "react-bootstrap"
import { getUserUID, getUserEmail } from 'src/components/organisms/Auth/auth'
import { useAuth } from 'src/components/organisms/Auth/AuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@symbolia/plsicon'

const Register = (props) => {
    const { wordings, btnClassName, divClassName="" } = props
    const [show, setShow] = React.useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const now = Date.now(); 

    const { login } = useAuth()
    
    const receiveMessage = (evt) => {
      // console.log("Got message: " + JSON.stringify(evt.data) + " from origin: " + evt.origin);
      if (typeof evt.data == 'object' && evt.data.action=="login" && evt.data.token != null) {
        login(evt.data.token)
        setShow(false)
        window.location.reload()
      }
    }
  
    useEffect(() => {
      if(!show) return
      window.addEventListener('message', receiveMessage, false);
    }, [show])
  
    return (
      <>
        <div className={divClassName}>
          <Button className={btnClassName} size="lg" onClick={handleShow}>
            <FontAwesomeIcon icon={faUser} className="me-1" />
            {wordings}
          </Button>
        </div>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{wordings}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <iframe
              src={`${process.env.NEXT_PUBLIC_UXM_MARKET_DOMAIN}/auth/check?hideNav=1`}
              className='w-100'
              style={{ height: "400px" }}
            ></iframe>
          </Modal.Body>
        </Modal>
      </>
    );
}

export default Register;
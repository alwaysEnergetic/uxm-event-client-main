import React from "react";
import { useState } from "react";
import { useAuth } from 'src/components/organisms/Auth/AuthContext'
import { getGqlClient } from "src/lib/gqlClient";
import {
  Popover,
  OverlayTrigger,
  Toast,
  Row,
  Col,
  Button,
  ToastContainer,
} from "react-bootstrap";
import { contestVideoVoteQuery } from "./queries";
import { gqlErrorFirstMessage } from "@muft/dailyfns"

type VoteWidgetProps = {
  title?: string;
  btnClassName?: string;
  data?: any;
};

const VoteWidget = (props: VoteWidgetProps) => {
  const {
    title = "Vote",
    btnClassName = "btn btn-primary btn-sm",
    data,
  } = props;
  const { isAuthenticated } = useAuth()
  const votingEnabled = data && data.votingEnabled;

  const handleClick: () => void = () => {
    getGqlClient()
      .request(contestVideoVoteQuery, { videoId: data.id })
      .catch((err) => {
        const msg = gqlErrorFirstMessage(err, { capitalize: true });
        console.log(msg);
      });
    setShow(true);
  };
  const [show, setShow] = useState(false);
  const popover = (
    <Popover id='popover-basic'>
      <Popover.Header as='h3'>Successful!</Popover.Header>
      <Popover.Body>
        <strong>You have successfully voted for this video.</strong>
      </Popover.Body>
    </Popover>
  );

  if (votingEnabled && isAuthenticated) {
    return (
      <>
        <ToastContainer position='top-end' className='p-3'>
          <Toast
            onClose={() => setShow(false)}
            show={show}
            delay={5000}
            autohide
          >
            <Toast.Header>
              <strong className='me-auto'>Success!</strong>
            </Toast.Header>
            <Toast.Body style={{ textAlign: "left" }}>
              <strong>You have successfully voted for this video.</strong>
            </Toast.Body>
          </Toast>
        </ToastContainer>
        <button className={btnClassName} onClick={handleClick}>
          {title}
        </button>
      </>
    );
  }
  return null;
};

export default VoteWidget;

import {getGqlClient} from "src/lib/gqlClient";
import { getChatThreadQuery } from "src/lib/graphql/schema/connect";
import { useState, useEffect } from "react"
import { Modal } from "react-bootstrap"
import ChatMessages from "./ChatMessages";

interface PopupChatMessagesProps {
  show: boolean,
  userId: string,
  onClose: () => void
  email?: boolean
}

const PopupChatMessages: React.FC<PopupChatMessagesProps> = (props) => {
  const { email=false } = props
  const [show, setShow] = useState(props.show);
  const [threadId, setThreadId] = useState();
  const [recipient, setRecipient] = useState();

  useEffect(() => {
    setShow(props.show);
    props.userId && getGqlClient().request(getChatThreadQuery, { userId: props.userId })
      .then((data) => {
        setRecipient(data.chatGetPrivateThread.users[1]);
        setThreadId(data.chatGetPrivateThread.id);
      })
  }, [props])

  const handleClose = () => {
    setShow(false);
    setThreadId(undefined);
    props.onClose();
  }
  const handleShow = () => setShow(true);

  return <>
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <ChatMessages email={email} threadId={threadId} sendTo={recipient} show={show}/>
      </Modal.Body>
    </Modal>
  </>
}

export default PopupChatMessages
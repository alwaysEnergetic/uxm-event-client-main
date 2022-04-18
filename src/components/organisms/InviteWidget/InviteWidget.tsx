import { useState } from "react";
import { Modal } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faShare } from '@symbolia/plsicon'
import { faFacebook, faTwitter, faLinkedin, faReddit, faSkype, faPinterest, faTelegram, faWhatsapp } from "@fortawesome/free-brands-svg-icons"
import { getInviteLink, getLoginUrl } from 'src/components/organisms/Auth/auth'
import styles from "./InviteWidget.module.scss";
import useMounted from 'src/components/atoms/Hook/useMounted'
type InviteWidgetProps = {
  title?: string
  redirect?: string
  btnClassName?: string
}

const InviteWidget = (props: InviteWidgetProps) => {
  const { title='Invite Friends', redirect="/", btnClassName="btn btn-primary btn-sm1" } = props
  const [copyLinkUIText, setCopyLinkUIText] = useState("Copy Link");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const inviteLink = getInviteLink(redirect)
  // const loginLink = getLoginUrl()

  const mounted = useMounted()
  const copyLinkToClipboardHandler: () => void = () => {
    navigator.clipboard.writeText(inviteLinkEncoded);
    setCopyLinkUIText("Link copied!");
    setTimeout(() => setCopyLinkUIText("Copy Link"), 1000);
  };

  if(!mounted) return null

  const base64InviteLink = window.btoa(inviteLink);
  const inviteLinkEncoded = `${process.env.NEXT_PUBLIC_EVENT_DOMAIN}/api/redirect/${base64InviteLink}`

  // console.log(inviteLinkEncoded)

  return (
    <>
      <button onClick={handleShow} className={btnClassName}>
        <FontAwesomeIcon icon={faShare} className="me-2" />
        {title}
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.inviteBody}>
          <span className="p-2">
            <a
              href={`mailto:?subject=Join me at this online music event&body=Join me at this online music event. Click here: ${inviteLinkEncoded}`}
              target="__blank"
              className="btn btn-primary w-100"
            >
              <FontAwesomeIcon icon={faEnvelope} className="me-1" /> Mail
            </a>
          </span>

          <span className="p-2">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${inviteLinkEncoded}`}
              target="__blank"
              className="btn btn-primary w-100"
            >
              <FontAwesomeIcon icon={faFacebook} /> Facebook
            </a>
          </span>

          <span className="p-2">
            <a
              href={`https://twitter.com/intent/tweet?text=Join me at this online music event. Click here: ${inviteLinkEncoded}`}
              target="__blank"
              className="btn btn-primary w-100"
            >
              <FontAwesomeIcon icon={faTwitter} /> Twitter
            </a>
          </span>

          <span className="p-2">
            <a
              href={`https://api.whatsapp.com/send?text=Join me at this online music event. Click here: ${inviteLinkEncoded}`}
              target="__blank"
              className="btn btn-primary w-100"
            >
              <FontAwesomeIcon icon={faWhatsapp} /> Whatsapp
            </a>
          </span>

          <span className="p-2">
            <a
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${inviteLinkEncoded}&title=&summary=Join me at this online music event. Click here: ${inviteLinkEncoded}`}
              target="__blank"
              className="btn btn-primary w-100"
            >
              <FontAwesomeIcon icon={faLinkedin} /> LinkedIn
            </a>
          </span>

          <span className="p-2">
            <a
              href={`https://www.reddit.com/login/?dest=https://www.reddit.com/submit?url=${inviteLinkEncoded}`}
              target="__blank"
              className="btn btn-primary w-100"
            >
              <FontAwesomeIcon icon={faReddit} /> Reddit
            </a>
          </span>

          <span className="p-2">
            <a
              href={`https://web.skype.com/share?url=${inviteLinkEncoded}`}
              target="__blank"
              className="btn btn-primary w-100"
            >
              <FontAwesomeIcon icon={faSkype} /> Skype
            </a>
          </span>

          <span className="p-2">
            <a
              href={`https://telegram.me/share/url?url=${inviteLinkEncoded} me at this online music event. Click here: ${inviteLinkEncoded}`}
              target="__blank"
              className="btn btn-primary w-100"
            >
              <FontAwesomeIcon icon={faTelegram} /> Telegram
            </a>
          </span>

          <span className="p-2">
            <a
              href={`https://www.pinterest.com/pin/create/button/?url=&media=&description=Join me at this online music event. Click here: ${inviteLink}`}
              target="__blank"
              className="btn btn-primary w-100"
            >
              <FontAwesomeIcon icon={faPinterest} /> Pinterest
            </a>
          </span>

          <span className="p-2">
            <a
              className="btn btn-primary w-100"
              onClick={copyLinkToClipboardHandler}
            >
              {copyLinkUIText}
            </a>
            <input id="hidden-link" className={styles["hidden-input"]} />
          </span>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default InviteWidget;
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faShare } from '@symbolia/plsicon'
import { faFacebook, faTwitter, faLinkedin, faReddit, faSkype, faPinterest, faTelegram, faWhatsapp } from "@fortawesome/free-brands-svg-icons"
import styles from "./ShowMore.module.scss";
import cx from 'classnames'

type ShowMoreProps = {
  moreTitle?: React.ReactNode
  moreIcon?: React.ReactNode
  lessTitle?: React.ReactNode
  lessIcon?: React.ReactNode
  maxHeight?: string
  className?: string
  btnClassName?: string
  btnWrapClassName?: string
  children?: any
}
import { jsx, css } from '@emotion/react'

const ShowMore = (props: ShowMoreProps) => {
  const { moreTitle="Show more", lessTitle="Show less", moreIcon, lessIcon, className="ShoreMoreComp", btnWrapClassName,  btnClassName="btn btn-light w-100", maxHeight="200px", children } = props
  const [show, setShow] = useState(false);

  const toggle = () => setShow(!show);

  let styleContents = [css`
    max-height: ${maxHeight};
    overflow-y: hidden;
    transition: 0.2s;
  `]
  
  if(show) {
    styleContents.push(css`
      max-height: 100%;
      overflow-y: auto;
    `)
  }

  let title = show ? lessTitle : moreTitle
  let icon = show ? lessIcon : moreIcon

  return (
    <div className={className}>
      <div css={styleContents}>
        {children}
      </div>
      <div className={btnWrapClassName}>
        <button onClick={toggle} className={btnClassName}>
          {icon}
          {title}
        </button>
      </div>
    </div>
  );
};

export default ShowMore;
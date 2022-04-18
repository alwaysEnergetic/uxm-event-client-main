import { useState } from "react";
import { Modal } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faShare } from '@symbolia/plsicon'
import { faFacebook, faTwitter, faLinkedin, faReddit, faSkype, faPinterest, faTelegram, faWhatsapp } from "@fortawesome/free-brands-svg-icons"
import styles from "./ItemBlock.module.scss";
import cx from 'classnames'

type ItemBlockProps = {
  name?: React.ReactNode
  descr?: React.ReactNode
  image?: React.ReactNode
  link?: string
  className?: string
  children?: any
}
import { jsx, css } from '@emotion/react'

const ItemBlock = (props: ItemBlockProps) => {
  const { name, descr, image, link, className} = props
  
  let styleItem = css`
    max-width: 300px;
    margin-bottom: 30px;
  `

  return (
    <div className={className} css={styleItem}>
      <div className={styles.Image}>
        <img src={image} />
      </div>
      <div className={styles.Content}>
        <div className={styles.Avatar}>
          <img src={image} />
        </div>
        <div className={styles.Text}>
          <div className={styles.Name}>{name}</div>
          <div className={styles.Descr}>{descr}</div>
        </div>
      </div>

      
    </div>
  );
};

export default ItemBlock;
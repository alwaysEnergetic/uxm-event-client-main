import React, { useState, useEffect } from "react";
import Link from "next/link";
import { noImage } from "../../constant";
import Show from "../mix/Show";
import LineBreak from "../mix/LineBreak";
// import styles from "./index.module.scss";
// import styles1 from "./index2.module.scss";

type InfoBlockProps = {
  defaultImage?: string;
  image?: string;
  title: string;
  subTitle?: string;
  descr?: string;
  link?: string;
  children?: React.ReactNode;
};

const InfoBlock = (props: InfoBlockProps) => {
  const { defaultImage, image, title, subTitle, descr } = props;
  const imageUrl = image || defaultImage || noImage;

  // const styles = require('./index.module.scss')
  const s = false ? require('./index2.module.scss') : require('./index.module.scss')

  return (
    <div className={s.Block}>
      <Show show={!!imageUrl}>
        <div className={s.BlockImageWrap}>
          <img src={imageUrl} className={s.BlockImage} />
        </div>
      </Show>

      <div className={s.ContentWrap}>
        <Show show={!!title}>
          <h2 className={s.Title}>{title}</h2>
        </Show>

        <Show show={!!subTitle}>
          <div className={s.SubTitle}>{subTitle}</div>
        </Show>

        <Show show={!!descr}>
          <LineBreak text={descr} />
        </Show>
      </div>
    </div>
  );
};

export default InfoBlock;

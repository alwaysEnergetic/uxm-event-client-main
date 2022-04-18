import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "./Home.module.scss";
import { TextBoxProps } from "src/components/pages/Home/types";

export default function TextBox(props: {data: TextBoxProps}) {
  const { data } = props;
  return (
    <div className={`${styles.contentBox} block ${data.highlight ? "highlight" : ""}`}>
      <div style={{width: '60px', height: '60px', position: 'relative', marginRight: '10px'}}>
        <Image src={data.image} alt={data.title} layout='fill' objectFit="cover"/>
      </div>
      {/* <img src={data.image} alt={data.title} /> */}

      <div>
        <h4>
          <Link href={data.link}>{data.title}</Link>
        </h4>
        {data.description && <span>{data.description}</span>}
      </div>
    </div>
  );
}

import { css } from '@emotion/react'
import styles from "./NavList.module.scss";

type ListItem = {
  children?: string | React.ReactNode;
  icon?: React.ReactNode
  link?: string
}
type ListProps = {
  className?: string
  anchorClassName?: string
  items?: [ListItem]
}


const NavList = (props: ListProps) => {
  const { className="ListComp", anchorClassName, items=[] } = props



  return (
    <div className={styles.List + " " + className}>
      {items.map((item, i) => {
        return (
          <div key={i} className="item">
            <a href={item.link} className={styles.Link + " " + anchorClassName}>
              { item.icon ? <span>{item.icon}</span> : null}
              { item.title ? <span>{item.title}</span> : null}
            </a>
          </div>
        )
      })}
      
    </div>
  );
};

export default NavList;
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from './Groups.module.scss'
import { getGqlClient } from "src/lib/gqlClient"
import { gql } from 'graphql-request'
import { TImage } from "src/lib/types"
import {objGetPath} from "@muft/dailyfns"
import { noImage } from 'src/lib/constant'
import { useAuth } from 'src/components/organisms/Auth/AuthContext'
import ShowWrap from "src/components/shared/ShowWrap";
import LineBreak from "src/components/shared/LineBreak";
type GroupItemProps = {
  content: {
    id: string,
    slug?: string,
    name: string,
    descr: string,
    imageId: string,
    joined?: boolean
    link1Name?: string
    link1Href?: string
    link2Name?: string
    link2Href?: string
  }
}

const GroupItem: React.FC<GroupItemProps> = (props) => {
  const { content } = props;
  const [isJoinedGroup, setIsJoinedGroup] = useState(props.content.joined);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth()

  const joinGroupHandler = () => {
    setLoading(true);
    let joinGroupQuery = gql`
      mutation {
        groupJoin(groupId: "${props.content.id}")
      }
    `

    getGqlClient().request(joinGroupQuery)
      .then((data) => {
        setIsJoinedGroup(prev => !prev);
        setLoading(false);
      })
  }

  const leaveGroupHandler = () => {
    setLoading(true);
    let leaveGroupQuery = gql`
      mutation {
        groupLeave(groupId: "${props.content.id}")
      }
    `

    getGqlClient().request(leaveGroupQuery)
      .then((data) => {
        setIsJoinedGroup(prev => !prev);
        setLoading(false);
      })
  }

  useEffect(() => {
    setIsJoinedGroup(props.content.joined)
  }, [props.content.joined])

  const imageUrl = objGetPath(content, 'image.url', noImage)

  return <div className={styles.group}>
    <div className={styles.groupImageWrap}>
      <img src={imageUrl} />
    </div>

    <div className={styles.groupRight}>
      <ShowWrap show={isAuthenticated}>
      <ul>
        <li>
          {!isJoinedGroup && <button onClick={joinGroupHandler} className='btn btn-primary'>{loading ? 'Loading...' : 'Join Group'}</button>}
          {isJoinedGroup && <button onClick={leaveGroupHandler} className='btn btn-secondary'>{loading ? 'Loading...' : 'Leave Group'}</button>}
        </li>
      </ul>
      </ShowWrap>
      
      <Link href={`/groups/${content.slug}`} passHref={true}>
        <a><h4 className={styles.groupName}>{content.name}</h4></a>  
      </Link>
      {/* <p>{props.content.id} (Categorization)</p> */}
      
      <LineBreak text={content.descr} />
      
      {content.link1Name && content.link1Href ? <div><a className="fw-bold text-uppercase text-danger" href={content.link1Href}>{content.link1Name}</a></div> : null }
      {content.link2Name && content.link2Href ? <div><a className="fw-bold text-uppercase text-danger" href={content.link2Href}>{content.link2Name}</a></div> : null }
    </div>
  </div>
}

export default GroupItem
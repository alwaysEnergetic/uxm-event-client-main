import type {  NextPage } from 'next'
import { useState, useEffect } from 'react'
import styles from './Groups.module.scss'
import { gql } from 'graphql-request'
import GroupItem from './GroupItem'
import { getGqlClient } from "src/lib/gqlClient"

import {groupsQuery} from './queries'

/* 
  * This will be used on 
  * http://localhost:2203/users/john.anthony.leper/groups
  * http://localhost:2203/me/groups
*/

type GroupsProps = {
  mine?: boolean
  userId?: string
}

const Groups = (props: GroupsProps) => {
  const { mine, userId } = props
  const [fetchedGroups, setFetchedGroups] = useState([]);
  const [loading, setLoading] = useState(false); 


  useEffect(() => {
    setLoading(true);
    getGqlClient().request(groupsQuery, {mine: mine, userId: userId})
      .then((data) => {
        setFetchedGroups(data.groups.items);
        setLoading(false);
      })
  }, [])


  return (
    <div>
      <div className="text-center">
        {fetchedGroups.length==0 ? <div className="alert alert-info fw-bold">No Groups Found.</div> : null}
      </div>

      <div className={styles.groups}>
        {fetchedGroups.map((x, idx) => <GroupItem content={x} key={idx} />)}
      </div>
    </div>
  )
}

export default Groups
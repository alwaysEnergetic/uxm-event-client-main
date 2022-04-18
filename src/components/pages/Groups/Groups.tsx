import type {  NextPage } from 'next'
import { useState, useEffect } from 'react'
import styles from './Groups.module.scss'
import { gql } from 'graphql-request'
import GroupItem from 'src/components/pages/Groups/GroupItem'

const Groups = (props) => {
  const { groups = []} = props
  const [fetchedGroups, setFetchedGroups] = useState([]);

  useEffect(() => {
    setFetchedGroups(groups);
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
import { useState, useEffect } from 'react'
import cx from 'classnames'
import Link from 'next/link'
import { ContestVideo } from "src/lib/graphql/schema/contest"
import styles from "./style.module.scss"
const Video: React.FC<{video: ContestVideo | undefined}> = (props) => {
  const { video } = props
  if(!video) return null
  return (
    <div className="container">
      <div className="row">
          <div className="col-md-12 mb-3">
            <div className="border p-2">
              <div>
                <iframe className={cx("w-100", styles.iframe)} src={video.embedLink+"?controls=0&modestbranding=1&rel=0&showinfo=0&loop=0&fs=0&hl=en&wmode=transparent&enablejsapi=1&widgetid=1"}></iframe>
              </div>
              <Link href={`contest-video/${video.id}`}>
                <a href="#" className="fs-4 fw-bold">{video.name}</a>
              </Link>
              <div><label className="fw-bold">Artist:</label> {video.artistName}</div>
            </div> 
          </div>
      </div>
    </div>
  )
}

export default Video
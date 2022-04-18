import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useQueryVideos } from "./resolver"
const Videos: React.FC<{}> = () => {
  const { status, data, error, isFetching, refetch } = useQueryVideos();
  // console.log("status", status)
  // console.log("data", data)
  // console.log("error", error)

  if(status == "loading") return  <span>Loading...</span>
  if(status == "error") return  <span>Error...</span>

  const { items } = data || {}
  return (
    <div className="container">
      <div className="row">
        {items && items.map((item, idx) => {
          return (
          <div key={idx} className="col-md-3 mb-3">
            <div className="border rounded p-2">
              <div><iframe className="w-100" src={item.embedLink+"?controls=0&modestbranding=1&rel=0&showinfo=0&loop=0&fs=0&hl=en&wmode=transparent&enablejsapi=1&widgetid=1"}></iframe></div>
              <Link href={`contest-videos/${item.id}`}>
                <a href="#" className="fs-5 fw-bold">{item.name}</a>
              </Link>
              <div><label className="fw-bold">Artist:</label> {item.artistName}</div>
            </div> 
          </div>
          )
        })}
      </div>
    </div>
  )
}

export default Videos
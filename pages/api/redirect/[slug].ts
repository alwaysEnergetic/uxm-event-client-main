// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { slug } = req.query

  const str: any = slug

  // console.log("Redirect API")
  // console.log(Buffer.from(str, 'base64').toString('base64'))
  // console.log(str)
  if (Buffer.from(str, 'base64').toString('base64') !== str) {
    res.redirect("/")
    return
  }
  let buff = new Buffer(slug as any, 'base64');
  let url = buff.toString('ascii');

  console.log("redirect url", url)
  
  res.redirect(url)
  // res.status(200).json({ name: url })
}

import { NextApiRequest, NextApiResponse } from 'next'
import {getSession} from "next-auth/client";
import prisma from '../../../../lib/Database';

type SnowflakeData = { snowflake:string }

export default async (req: NextApiRequest, res: NextApiResponse<SnowflakeData>) => {
  const { query: { snowflake } } = req;
  const data = JSON.parse(req.body)
  const session = await getSession({ req })
  const method = req.method;
  if(!snowflake){
    res.status(404);
    res.end();
    return
  }
  if (method == "GET"){
    const message = await prisma.post.findFirst({where: {snowflake: String(snowflake)}})
    if(message){
      res.json(message);
      res.status(200);
      res.end();
      return
    }
    else{
      res.status(404);
      res.end();
      return
    }
  }
  if (session) {

    if(method == "POST" || method == "DELETE"){
      const updatePost = await prisma.post.findFirst({
        where: {
          snowflake:String(snowflake),
          author:String(session.user.snowflake)
        }
      })
      if(updatePost && method != "DELETE"){
          console.log(data)
        const updatedPost = await prisma.post.update({
          where: {
            snowflake:String(snowflake)
          },
          data: {
            content: data.content,
            updatedAt: new Date()
          }
        })
        res.json(updatedPost);
        res.status(200);
        res.end();
        return
      }
      else if(updatePost && method == "DELETE"){
        await prisma.post.delete({
          where: {
            snowflake:String(snowflake)
          }
        })

        res.status(200);
        res.end();
        return
      }
      else {
        res.status(404);
        res.end();
        return
      }
    }
    else{
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
      res.end();
    }
  }
  else {
    // Not Signed in
    res.status(401)
  }
  res.end();
}

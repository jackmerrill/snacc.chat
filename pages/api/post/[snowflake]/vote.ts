import { NextApiRequest, NextApiResponse } from 'next'
import {getSession} from "next-auth/client";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

type SnowflakeData = { snowflake:string }

export default async (req: NextApiRequest, res: NextApiResponse<SnowflakeData>) => {
  const { query: { snowflake } } = req;
  const data = req.body.vote
  const session = await getSession({ req })
  const method = req.method;
  if(!snowflake){
    res.status(404);
    res.end();
    return
  }

  if (session) {

    if(method == "POST"){
      const updatePost = await prisma.post.findFirst({
        where: {
          snowflake:String(snowflake),
          author:String(session.user.snowflake)
        }
      })
      if(updatePost){
        const user = await prisma.user.findFirst({
            where: {
                snowflake: session.user.snowflake
            },
        })

        if (user?.votes.includes(updatePost.snowflake)) {
            res.status(204);
            res.end();
            return
        }

        user?.votes.push(updatePost.snowflake)
        await prisma.user.update({
            where: {
                id: user?.id
            },
            data: {
                votes: user?.votes
            }
        })
        if (data === "1") {
            await prisma.post.update({
                where: {
                  snowflake:String(snowflake)
                },
                data: {
                  votes: updatePost.votes + 1
                }
            })
        }
        else if (data === "-1") {
            await prisma.post.update({
                where: {
                  snowflake:String(snowflake)
                },
                data: {
                  votes: updatePost.votes - 1
                }
            })
        }
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

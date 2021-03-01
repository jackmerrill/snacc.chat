import { NextApiRequest, NextApiResponse } from 'next'
import {getSession} from "next-auth/client";
import prisma from '../../../lib/Database';
import FlakeId from 'flake-idgen';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import intformat from 'biguint-format'


const flakeIdGen = new FlakeId({ epoch: 1609459200 });

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { content } = JSON.parse(req.body);
  const session = await getSession({ req })
  const method = req.method;
  if (session) {
    // Signed in
    const user = await prisma.user.findFirst({where: {snowflake: session.user.snowflake}})
    if(user == null){
      throw Error("User null");
    }
    if(method == "POST"){
      const post = await prisma.post.create({
        data:{
          snowflake: intformat(flakeIdGen.next(), 'dec'),
          content: content,
          author: session.user.snowflake
        }
      })
      res.json(post);
      res.status(200);
      res.end();
    }
    else{
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
    }
  } else {
    // Not Signed in
    res.status(401)
  }
  res.end();
}

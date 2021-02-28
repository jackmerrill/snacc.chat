import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();


export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { count, sort, pos, user } = req.query;
  const FixedPos = pos?pos:0;
  const FixedSort = sort?sort:"dated";
  const FixedCount = count?((Number(pos) >= 100)?100:count):20;
  const FixedUser = user?user:null

  let orderby = {};
  if(String(FixedSort).toLowerCase() == "dated") {
    orderby = {createdAt: "desc"}
  }
  else if(String(FixedSort).toLowerCase() == "datea") {
    orderby = {"createdAt":"asc" }
  }
  else if(String(FixedSort).toLowerCase() == "liked"){
    orderby = {"votes":"desc"}
  }
  else if(String(FixedSort).toLowerCase() == "likea"){
    orderby = {"votes":"asc"}
  }
  //const session = await getSession({ req })
  const method = req.method;
  if(method != "GET") {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${method} Not Allowed`)
    res.end();
    return;
  }
  let queryResult;
  if(FixedPos==0){
    if (FixedUser) {
        const query = await prisma.post.findMany({
            take: Number(FixedCount),
            orderBy: orderby,
        })
        queryResult = query.filter((post) => post.author === FixedUser)
    } else {
        queryResult = await prisma.post.findMany({
            take: Number(FixedCount),
            orderBy: orderby,
        })
    }
  }
  else {
    queryResult = await prisma.post.findMany({
      take: Number(FixedCount),
      skip: 1,
      cursor: {
        id: Number(FixedPos),
      },
      orderBy: orderby
    })
  }

  let filtered = queryResult.filter(function (el) {
    return el != null;
  });
//   filtered = filtered.filter(function (el) {
//     return el != {};
//   });
  if(filtered.length>=1){
    let hasNextCount = 0;
    if(String(FixedSort).toLowerCase() == "dated") {
      orderby = {"createdAt":"desc" }
      hasNextCount = await prisma.post.count({
        where: {
          createdAt: {
            lt: queryResult[filtered.length - 1].createdAt
          }
        }
      })
    }
    else if(String(FixedSort).toLowerCase() == "datea") {
      orderby = {"createdAt":"asc" }
      hasNextCount = await prisma.post.count({
        where: {
          createdAt: {
            gt: queryResult[filtered.length - 1].createdAt
          }
        }
      })
    }
    else if(String(FixedSort).toLowerCase() == "liked"){
      orderby = {"votes":"desc"}
      hasNextCount = await prisma.post.count({
        where: {
          votes: {
            lt: queryResult[filtered.length - 1].votes
          }
        }
      })
    }
    else if(String(FixedSort).toLowerCase() == "likea"){
      orderby = {"votes":"asc"}
      hasNextCount = await prisma.post.count({
        where: {
          votes: {
            gt: queryResult[filtered.length - 1].votes
          }
        }
      })
    }
    const Users = {};
    for (const post of queryResult) {
      const author = await prisma.user.findFirst({
        where: {
          snowflake: post.author
        }
      })

      const a = {
        id: author?.id,
        name: author?.name,
        snowflake: author?.snowflake,
        email: author?.email,
        emailVerified: author?.emailVerified,
        image: author?.image,
        createdAt: author?.createdAt.toUTCString(),
        updatedAt: author?.createdAt.toUTCString(),
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      Users[a.snowflake?a.snowflake:""] = a;
    }
    const hasNext = false;
    const newCursorPos = queryResult[filtered.length - 1].id-1;
    res.json({
      "content": queryResult,
      "newCursorPos": newCursorPos,
      "hasNext":hasNext,
      "users": Users
    })
    res.status(200);
    res.end();
  }
  else {
    res.json({
      "content": {},
      "newCursorPos": 0,
      "hasNext":false
    })
    res.status(200);
    res.end();
  }


}

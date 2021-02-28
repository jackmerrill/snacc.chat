import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { count, sort, pos } = req.query;
  const FixedPos = pos?pos:0;
  const FixedSort = sort?sort:"dated";
  const FixedCount = count?((Number(pos) >= 100)?100:count):20;
  console.log("Pos: "+FixedPos+" Sort: "+FixedSort+" Count: "+FixedCount)
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
    queryResult = await prisma.post.findMany({
      take: Number(FixedCount),
      orderBy: orderby
    })
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

  const filtered = queryResult.filter(function (el) {
    return el != null;
  });
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
    const hasNext = hasNextCount>=1;
    const newCursorPos = queryResult[filtered.length - 1].id;
    res.json({
      "content": queryResult,
      "newCursorPos": newCursorPos,
      "hasNext":hasNext
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

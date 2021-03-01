import { NextApiRequest, NextApiResponse } from 'next'
import {getSession} from "next-auth/client";
import {ApiUser} from "../../../Types/ApiUser";
import prisma from '../../../lib/Database';

type SnowflakeData = { snowflake:string }

export default async (req: NextApiRequest, res: NextApiResponse<SnowflakeData>) => {
    const { query: { snowflake } } = req;
    const session = await getSession({ req })
    const method = req.method;
    if (session) {
        // Signed in
        switch (method) {
            case 'GET':
                await handleGETID(String(snowflake), res)
                break
            default:
                res.setHeader('Allow', ['GET'])
                res.status(405).end(`Method ${method} Not Allowed`)
        }
    } else {
        // Not Signed in
        res.status(401)
    }
    res.end();
}
// GET /api/user/:id
async function handleGETID(snowflake: string, res: NextApiResponse) {
    const user = await prisma.user.findFirst({
        where: { snowflake: snowflake }
    })
    if(user != null){
        res.json(new ApiUser(user))
    }
    else {
        res.status(404);
    }

}

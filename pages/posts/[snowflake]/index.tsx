import { GetServerSideProps } from "next";
import { getSession, Session } from "next-auth/client";
import Navbar from "../../../components/Navbar";
import Head from 'next/head'
import { Post, PrismaClient, User } from '@prisma/client'
import markdownToTxt from 'markdown-to-txt';
import PostComponent from '../../../components/Post';
import { useRouter } from "next/router";
import NotFound from "../../404";
const prisma = new PrismaClient();

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { snowflake } = context.query
    const session = await getSession(context)

    const data = await prisma.post.findFirst({
        where: {
            snowflake: String(snowflake)
        }
    })

    if (!data) {
        return {
            props: {
                session
            }
        }
    }

    const d = {
        id: data?.id,
        snowflake: data?.snowflake,
        author: data?.author,
        content: data?.content,
        votes: data?.votes,
        createdAt: data?.createdAt.toUTCString(),
        updatedAt: data?.updatedAt.toUTCString(),
    }

    const author = await prisma.user.findFirst({
        where: {
            snowflake: d.author
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

    return {
        props: {
            session,
            d,
            a
        }
    }
};

function truncateString(str: string, num: number) {
    if (str.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
}

export default function PostPage({ session, d, a }: {
  session: Session,
  d: Post,
  a: User
}) {
    const router = useRouter()

    if (!d || !a) {
        return <NotFound />
    }

    return (
        <div className="h-screen w-screen bg-gray-900">
            <Head>
                <title>Snacc</title>
                <meta property={"og:type"} content={"website"}/>
                <meta property={"og:site_name"} content={"Snacc"}/>
                <meta property={"og:url"} content={"https://snacc.chat"}/>
                <meta property={"og:locale"} content={"en-US"}/>
                <meta property={"og:title"} content={"Snacc | Some New Advanced Coder Chat"}/>
                <meta property={"og:description"} content={truncateString(markdownToTxt(d?.content), 50)}/>
                <meta property={"description"} content={truncateString(markdownToTxt(d?.content), 50)}/>
                <meta property={"og:image"} content={"https://snacc.chat/Logo.png"}/>
                <meta property={"theme-color"} content={"#1F2937"}/>
            </Head>
            <Navbar session={session} activePage={"home"} />
            <div className="mx-auto lg:px-72 md:px-36 sm:px-24 px-12">
                <PostComponent d={d} a={a} session={session} />
            </div>
        </div>
    );
}

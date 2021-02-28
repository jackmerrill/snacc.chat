/* eslint-disable react/display-name */
import { GetServerSideProps } from "next";
import { getSession, Session } from "next-auth/client";
import { useRouter } from "next/router";
import Navbar from "../../../components/Navbar";
import { FormEvent } from "react";
import toast from 'react-hot-toast'
import { Post, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context)

    const data = await prisma.post.findFirst({
        where: {
            snowflake: String(context.query.snowflake)
        }
    })

    const d = {
        id: data?.id,
        snowflake: data?.snowflake,
        author: data?.author,
        content: data?.content,
        votes: data?.votes,
        createdAt: data?.createdAt.toUTCString(),
        updatedAt: data?.updatedAt.toUTCString(),
    }

    return {
        props: {
            session,
            d
        }
    }
};



export default function Home({ session, d }: {
  session: Session,
  d: Post
}) {
    const router = useRouter();

    if (!session || session === null) {
        router.replace('/auth/login')
    }

    console.log(d)

    const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const target = e.target as any

        console.log(JSON.stringify({
            content: target.content.value
        }))

        toast.promise(fetch(`/api/post/${router.query.snowflake}`, {
            method: 'POST',
            credentials: 'same-origin',
            body: JSON.stringify({
                "content": target.content.value
            })
        }), {
            loading: 'Saving...',
            success: (data: Response) => {
                return (
                    <>
                        <p>Saved!</p>
                        <span className="hidden">{setTimeout(async () => router.replace(`/posts/${(await data.json()).snowflake}`), 3000)}</span>
                    </>
                )
            },
            error: 'Error creating post.'
        })

    }

    return (
        <div className="h-screen w-screen bg-gray-900">
            <Navbar session={session} activePage={"home"} />
            <h1 className="text-4xl font-extrabold text-white text-center mt-10">Edit Post</h1>
            <div className=" bg-gray-900">
              <form className="m-3" onSubmit={handleFormSubmit}>
                <textarea defaultValue={d?.content} id="content" name="content" className="bg-gray-800 text-white font-semibold outline resize-y w-full border rounded-md min-h-full p-2" placeholder="Enter Markdown Text..." />
                <button
                    className="flex items-center justify-center w-full bg-indigo-600 transition duration-300 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-md px-3 py-3 font-semibold mt-4"
                    type="submit"
                >
                    Save
                </button>
              </form>
            </div>
        </div>
    );
}

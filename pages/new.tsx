/* eslint-disable react/display-name */
import { GetServerSideProps } from "next";
import { getSession, Session } from "next-auth/client";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import { FormEvent } from "react";
import toast from 'react-hot-toast'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  return {
    props: {
      session
    }
  }
};



export default function Home({ session }: {
  session: Session,
}) {
    const router = useRouter();

    if (!session || session === null) {
        router.replace('/auth/login')
    }

    const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const target = e.target as any

        console.log(target.content.value)

        toast.promise(fetch('/api/post', {
            method: 'POST',
            credentials: 'same-origin',
            body: JSON.stringify({
                content: target.content.value
            })
        }), {
            loading: 'Posting...',
            success: (data: Response) => {
                return (
                    <>
                        <p>Posted!</p>
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
            <h1 className="text-4xl font-extrabold text-white text-center mt-10">New Post</h1>
            <div className=" bg-gray-900">
              <form className="m-3" onSubmit={handleFormSubmit}>
                <textarea id="content" name="content" className="bg-gray-800 text-white font-semibold outline resize-y w-full border rounded-md min-h-full p-2" placeholder="Enter Markdown Text..." />
                <button
                    className="flex items-center justify-center w-full bg-indigo-600 transition duration-300 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-md px-3 py-3 font-semibold mt-4"
                    type="submit"
                >
                    Post
                </button>
              </form>
            </div>
        </div>
    );
}

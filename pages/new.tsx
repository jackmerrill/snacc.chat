import { GetServerSideProps } from "next";
import { getSession, Session } from "next-auth/client";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import { useState } from "react";

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

    const [value, setValue] = useState();

    return (
        <div className="h-screen w-screen bg-gray-900">
            <Navbar session={session} activePage={"home"} />
            <h1 className="text-4xl font-extrabold text-white text-center">New Post</h1>
            <div className="mx-12 justify-center">
              <form className="m-3" onSubmit={(e) => {
                e.preventDefault()

                console.log(e.target)
              }}>
                <textarea id="content" name="content" className="resize-y w-full border rounded-md min-h-full p-2" />
                <button type="submit">send</button>
              </form>
            </div>
        </div>
    );
}

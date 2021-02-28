import { GetServerSideProps } from "next";
import { getSession, Session } from "next-auth/client";
import Navbar from "../components/Navbar";
import Head from 'next/head'

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context)
    // console.log(session)
    return {
        props: {
            session
        }
    }
};

export default function Home({ session }: {
  session: Session,
}) {
  return (
    <div className="h-screen w-screen bg-gray-900">
        <Head>
            <title>Snacc</title>
            <meta property={"og:type"} content={"website"}/>
            <meta property={"og:site_name"} content={"Snacc"}/>
            <meta property={"og:url"} content={"https://snacc.chat"}/>
            <meta property={"og:locale"} content={"en-US"}/>
            <meta property={"og:title"} content={"Snacc | Some New Advanced Coder Chat"}/>
            <meta property={"og:description"} content={"An open source social media network for programmers"}/>
            <meta property={"description"} content={"An open source social media network for programmers"}/>
            <meta property={"og:image"} content={"https://snacc.chat/Logo.png"}/>
            <meta property={"theme-color"} content={"#1F2937"}/>
        </Head>
        <Navbar session={session} activePage={"home"} />
        <div className="mx-auto lg:px-72 md:px-36 sm:px-24 px-12">
            {/* post stuff here */}
        </div>
    </div>
  );
}

import { GetServerSideProps } from "next";
import { getSession, Session } from "next-auth/client";
import { NextApiRequest } from "next-auth/_utils";
import Head from "next/head";
import Navbar from "../components/Navbar";
import styles from "../styles/Home.module.css";

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
  return (
    <div className="h-screen w-screen bg-gray-900">
      <Navbar session={session} />
    </div>
  );
}
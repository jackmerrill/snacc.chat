import { GetServerSideProps } from "next";
import { getSession, Session } from "next-auth/client";
import Navbar from "../components/Navbar";

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
      <Navbar session={session} activePage={"home"} />
    </div>
  );
}

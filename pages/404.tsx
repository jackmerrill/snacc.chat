import { GetServerSideProps } from "next";
import { getSession, Session } from "next-auth/client";
import NotFoundIllustration from "../components/illustrations/404";
import Navbar from "../components/Navbar";

export default function NotFound({ session }: {
  session: Session,
}) {
  return (
    <div className="h-screen w-screen bg-gray-900 text-center">
      <Navbar session={session} activePage={""} />
      <div className="flex justify-center my-10 mx-3">
        <NotFoundIllustration width="500" height="500" />
      </div>
      <h1 className="text-8xl font-extrabold text-white mb-3">404</h1>
      <h2 className="text-5xl font-extrabold text-white">This is not the page you&apos;re looking for.</h2>
    </div>
  );
}

import { Session } from "next-auth/client";
import NotFoundIllustration from "../components/illustrations/404";
import Navbar from "../components/Navbar";
import Head from "next/head";

export default function NotFound({ session }: {
  session: Session,
}) {
  return (
    <div className="h-screen w-screen bg-gray-900 text-center">
        <Head>
            <title>Page Not Found | Snacc</title>
            <meta property={"og:type"} content={"website"}/>
            <meta property={"og:site_name"} content={"Snacc"}/>
            <meta property={"og:url"} content={"https://snacc.chat"}/>
            <meta property={"og:locale"} content={"en-US"}/>
            <meta property={"og:title"} content={"Snacc | Some New Advanced Coder Chat"}/>
            <meta property={"og:description"} content={"An open source social media network for programmers"}/>
            <meta property={"description"} content={"An open source social media network for programmers"}/>
        </Head>
      <Navbar session={session} activePage={""} />
      <div className="flex justify-center my-10 mx-3">
        <NotFoundIllustration width="500" height="500" />
      </div>
      <h1 className="text-8xl font-extrabold text-white mb-3">404</h1>
      <h2 className="text-5xl font-extrabold text-white">This is not the page you&apos;re looking for.</h2>
    </div>
  );
}

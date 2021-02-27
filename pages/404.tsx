import NotFoundIllustration from "../components/illustrations/404";
import Head from "next/head";
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-center" >
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
      <div className="m-auto">
        <h1 className="text-8xl font-extrabold text-white mb-3">404</h1>
        <div className="flex justify-center">
          <NotFoundIllustration width="500" height="500"/>
        </div>
        <h2 className="text-5xl font-extrabold text-white">What you are looking for is not here.</h2>
      </div>
      <footer className="align-text-bottom justify-items-center">
        <Link href="/" passHref>
          <a className="font-extrabold text-gray-500">Why are you still here?</a>
        </Link>
      </footer>


    </div>
  );
}

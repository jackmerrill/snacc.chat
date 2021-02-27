import Head from "next/head";
import {getSession, Session} from "next-auth/client";
import {GetServerSideProps} from "next";
import Navbar from "../../components/Navbar";
import AccountDisplay from "../../components/AccountDisplay";
import {useRouter} from "next/router";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  return {
    props: {
      session
    }
  }
};

export default function User({ session } : {
  session: Session,
}) {
  const router = useRouter()
  const { id } = router.query
  if ((!session || session === null) && id == "@me") {
    router.replace('/auth/login')
  }
  if(id == "@me") {
    return (
      <div className="h-screen w-screen bg-gray-900">
        <Head>
          <title>Snacc | {session.user.name}</title>
          <meta property={"og:type"} content={"website"}/>
          <meta property={"og:site_name"} content={"Snacc"}/>
          <meta property={"og:url"} content={"https://snacc.chat"}/>
          <meta property={"og:locale"} content={"en-US"}/>
          <meta property={"og:title"} content={"Snacc | Some New Advanced Coder Chat"}/>
          <meta property={"og:description"} content={"An open source social media network for programmers"}/>
          <meta property={"description"} content={"An open source social media network for programmers"}/>
          <meta property={"og:image"} content={"https://snacc.chat/Logo.png"}/>
        </Head>
        <Navbar session={session} activePage={"Account"} />
        <div className="px-2 sm:px-6 lg:px-8 mx-auto max-w-7xl">
          <AccountDisplay UserName={session.user.name} Email={session.user.email} Picture={session.user.image}/>
        </div>

      </div>
    )
  }
  return (
    <div className="h-screen w-screen bg-gray-900">
      <Head>
        <title>Snacc | {id}</title>
        <meta property={"og:type"} content={"website"}/>
        <meta property={"og:site_name"} content={"Snacc"}/>
        <meta property={"og:url"} content={"https://snacc.chat"}/>
        <meta property={"og:locale"} content={"en-US"}/>
        <meta property={"og:title"} content={"Snacc | Some New Advanced Coder Chat"}/>
        <meta property={"og:description"} content={"An open source social media network for programmers"}/>
        <meta property={"description"} content={"An open source social media network for programmers"}/>
        <meta property={"og:image"} content={"https://snacc.chat/Logo.png"}/>
      </Head>
      <Navbar session={session} activePage={"Account"} />
    </div>
  );
}

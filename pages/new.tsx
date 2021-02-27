import { GetServerSideProps } from "next";
import { getSession, Session } from "next-auth/client";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import MarkdownIt from 'markdown-it'
import ReactMde from "react-mde";
import "react-mde/lib/styles/css/react-mde-all.css";
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
    const mdParser = new MarkdownIt();

    const [value, setValue] = useState("**Hello world!!!**");
    const [selectedTab, setSelectedTab] = useState<"write" | "preview">(
      "write"
    );

    if (!session || session === null) {
        router.replace('/auth/login')
    }

    return (
        <div className="h-screen w-screen bg-gray-900">
            <Navbar session={session} activePage={"home"} />
            <div className="flex container justify-center">
                <ReactMde
                    value={value}
                    onChange={setValue}
                    selectedTab={selectedTab}
                    onTabChange={setSelectedTab}
                    generateMarkdownPreview={markdown =>
                        Promise.resolve(mdParser.render(markdown))
                    }
                />
            </div>
        </div>
    );
}

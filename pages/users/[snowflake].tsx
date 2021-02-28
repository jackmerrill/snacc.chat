import { GetServerSideProps } from "next";
import { getSession, Session } from "next-auth/client";
import Navbar from "../../components/Navbar";
import Head from 'next/head'
import { User, Post } from "@prisma/client";
import React, { useState } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import PostComponent from "../../components/Post";
import { useRouter } from "next/router";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context)
    // console.log(session)
    return {
        props: {
            session
        }
    }
};

export default function UserPage({ session }: {
  session: Session,
}) {
    const router = useRouter();
    const [items, setItems] = useState([]);
    const [pos, setPos] = useState(0);
    const [hasNext, setHasNext] = useState(true);
    const [users, setUsers] = useState<Record<string, User>>({});
    console.log("Items: ",items);
    console.log("Users: ",users);
    console.log("Has Next: ", hasNext);
    const fetchData = async () => {
        if(!hasNext){
            return;
        }
        else {
            const data = await fetch(`/api/posts?count=20&sort=datea&pos=${pos}&user=${router.query.snowflake}`,{method: 'GET', credentials: 'same-origin'});
            const j = await data.json();
            setUsers(Object.assign(users, j["users"]));
            setItems(items.concat(j["content"]));
            setPos(j["newCursorPos"]);
            setHasNext(j["hasNext"]);
        }
    };
    fetchData();
    
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
                <InfiniteScroll
                    dataLength={items.length-1} //This is important field to render the next data
                    hasMore={hasNext}
                    next={fetchData}
                    loader={<h4>Loading...</h4>}
                    endMessage={
                    <p style={{textAlign: 'center'}}>
                        <b>Yay! You have seen it all</b>
                    </p>
                    }
                >
                    {items.map((i: Post) => (
                        <PostComponent key={i.snowflake} d={i} a={users[i.author]} session={session} />
                    ))}
                </InfiniteScroll>
            </div>
        </div>
    );
}

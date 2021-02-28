import { useState } from "react";
import PostComponent from "./Post";
import {Session} from "next-auth/client";
import InfiniteScroll from 'react-infinite-scroll-component';
import { Post, User } from "@prisma/client";

export default function Feed({ session }: {
  session: Session
}): JSX.Element {
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
        const dev = process.env.NODE_ENV !== 'production';

        const server = dev ? 'http://localhost:3000' : 'https://snacc.chat';
        const data = await fetch(`${server}/api/posts?count=20&sort=datea&pos=${pos}`,{method: 'GET', credentials: 'same-origin'});
        const j = await data.json();
        setUsers(Object.assign(users, j["users"]));
        setItems(j["content"]);
        setPos(j["newCursorPos"]);
        setHasNext(j["hasNext"]);
    }



  };
  fetchData().catch();
  return (
    <div>
      <InfiniteScroll
        dataLength={items.length-1} //This is important field to render the next data
        hasMore={hasNext}
        next={fetchData}
        loader={
            <p style={{textAlign: 'center'}}>
                <b className="text-white">Fetching newest posts...</b>
            </p>
        }
        endMessage={
          <p style={{textAlign: 'center'}}>
            <b className="text-white">Yay! You have seen it all</b>
          </p>
        }
      >
        {items.map((i: Post) => (
            <PostComponent key={i.snowflake} d={i} a={users[i.author]} session={session} />
        ))}
      </InfiniteScroll>
    </div>

  );
}

import { useState } from "react";
import PostComponent from "./Post";
import {Post, User} from "@prisma/client";
import {Session} from "next-auth/client";
import InfiniteScroll from 'react-infinite-scroll-component';

export default function Feed({ session }: {
  session: Session
}): JSX.Element {
  const [items, setItems] = useState([]);
  const [pos, setPos] = useState(0);
  const [hasNext, setHasNext] = useState(true);
  const [users, setUsers] = useState({});
  const fetchData = async () => {
    console.log(users);
    var data = await fetch('/api/posts/count=20&sort=datea&pos=' + pos);
    var fetchedJson = await data.json();
    setPos(fetchedJson["newCursorPos"]);
    setHasNext(fetchedJson["hasNext"]);
    setUsers(Object.assign(users, fetchedJson["users"]));
    setItems(items.concat(fetchedJson["content"]));

  };

  return (
    <InfiniteScroll
      dataLength={items.length+1} //This is important field to render the next data
      hasMore={true}
      next={fetchData}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{textAlign: 'center'}}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      {items.map((i, index) => (
        <PostComponent key={i.snowflake} d={i} a={users[String(i.snowflake)]} session={session} />
      ))}
    </InfiniteScroll>
  );
}

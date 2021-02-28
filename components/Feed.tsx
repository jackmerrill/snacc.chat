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
  console.log("Items: ",items);
  console.log("Users: ",users);
  console.log("Has Next: ", hasNext);
  const fetchData = async () => {
    var data = await fetch('/api/posts?count=20&sort=datea&pos='+pos,{method: 'GET', credentials: 'same-origin'});
    var j = await data.json();
    setUsers(Object.assign(users, j["users"]));
    setItems(items.concat(j["content"]));
    setPos(j["newCursorPos"]);
    setHasNext(j["hasNext"]);


  };
  fetchData();
  return (
    <div>
      <InfiniteScroll
        dataLength={items.length-1} //This is important field to render the next data
        hasMore={false}
        next={fetchData}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{textAlign: 'center'}}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {items.map((i, index) => (
          <PostComponent key={i.snowflake} d={i} a={users[i.author]} session={session} />
        ))}
      </InfiniteScroll>
    </div>

  );
}

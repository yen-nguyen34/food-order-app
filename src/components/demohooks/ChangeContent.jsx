import { useEffect, useState } from "react";
import Buttons from "../Buttons";
import Comments from "./Comments";
import Albums from "./Albums";
import Photos from "./Photos";
import Todos from "./Todos";
import Users from "./Users";

const tabs = ["posts", "comments", "albums", "photos", "todos", "users"];

function ChangeContent() {
  const [data, setData] = useState([]);
  const [tab, setTab] = useState("posts");

  const url = `https://jsonplaceholder.typicode.com/${tab}`;

  // GET DATA
  const fetchData = async () => {
    const response = await fetch(url);
    const resData = await response.json();
    setData(resData);
  };

  useEffect(() => {
    fetchData();
  }, [tab]);
  console.log(tab);

  return (
    <>
      <div style={{ marginLeft: "20px", marginTop: "50px" }}>
        <h1 style={{ marginBottom: "10px" }}>Select topic</h1>
        {tabs.map((item, index) => (
          <button
            onClick={() => setTab(item)}
            key={index}
            style={
              tab === item
                ? {
                    font: "inherit",
                    backgroundColor: "#ffab04",
                    color: "#1f1a09",
                    padding: "0.5rem 1.5rem",
                    border: "4px solid #ffc404",
                  }
                : {
                    font: "inherit",
                    cursor: "pointer",
                    backgroundColor: "#ffc404",
                    border: "4px solid #ffc404",
                    color: "#1f1a09",
                    padding: "0.5rem 1.5rem",
                    borderRadius: "4px",
                  }
            }
          >
            {item}
          </button>
        ))}
        {/* <ul>
          {data.map((post) => (
            <li key={post.id}>
              <p>PostID: {post.id}</p>
              <p>UserID: {post.userId}</p>
              <p>Title: {post.title}</p>
              <p>Body: {post.body}</p>
            </li>
          ))}
        </ul> */}
      </div>

      <hr />

      {/* <Comments /> */}
      {/* <Albums /> */}
      {/* <Photos></Photos> */}
      {/* <Todos /> */}
      <Users />
    </>
  );
}

export default ChangeContent;

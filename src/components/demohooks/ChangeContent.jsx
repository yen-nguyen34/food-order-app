import { useEffect, useState } from "react";
import Buttons from "../Buttons";

const tabs = ["Posts", "Comments", "Albums", "Photos", "Todos", "Users"];

function ChangeContent() {
  // using useEffect(callback) not dependencies
  const [showInput, setShowInput] = useState(false);
  const [title, setTitle] = useState("");
  const [tab, setTab] = useState(tabs[0]);
  const [selectTopic, setSelectTopic] = useState();

  useEffect(() => {
    console.log("render...");
  });

  // call API
  // GET METHOD
  const url = "https://jsonplaceholder.typicode.com/posts";
  const [data, setData] = useState([]);
  const getPosts = async () => {
    const response = await fetch(url);
    const resData = await response.json();
    console.log(resData);
    setData(resData);
  };
  useEffect(() => {
    getPosts();
  }, []);

  // POST METHOD
  const postData = async () => {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        title: "Add one more Post",
        body: "This post is about social media, such as Facebook, Tiktok, X, Zalo. Which one you are using? Why are you using this?",
        userId: 11,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const resData = await response.json();
    console.log(resData);
    // setData(resData);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await postData();
  };
  return (
    <>
      <div style={{ display: "block", marginLeft: "20px", marginTop: "50px" }}>
        <h1>Change Content</h1>
        <button className="button" onClick={() => setShowInput(!showInput)}>
          Toggle
        </button>
        {showInput && (
          <input
            className="show-input"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        )}
        {console.log("component render")}
      </div>
      <div
        className="post-data"
        style={{ display: "block", marginLeft: "20px", marginTop: "50px" }}
      >
        <h1>Post Data</h1>
        <ul>
          {data.map((post) => (
            <li key={post.id}>
              <p>Post : {post.id}</p>
              <p>UserID: {post.userId}</p>
              <p>Title: {post.title}</p>
              <p>Body: {post.body}</p>
            </li>
          ))}
        </ul>
        <p>
          <Buttons
            onClick={handleSubmit}
            textOnly={false}
            buttonTxt="Post Data"
          />
        </p>
      </div>
      <div style={{ display: "block", marginLeft: "20px", marginTop: "50px" }}>
        {tabs.map((tab) => (
          <button onClick={getPosts}>{tab}</button>
        ))}
      </div>
    </>
  );
}

export default ChangeContent;

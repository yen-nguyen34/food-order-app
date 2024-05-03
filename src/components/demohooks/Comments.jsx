import { useState, useEffect } from "react";

function Comments() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const loadComments = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/comments"
      );
      if (!response.ok) {
        throw new Error(`HTTP Response Status ${response.status}`);
      } else {
        const resData = await response.json();
        setComments(resData);
        console.log("sucessfully");
      }
    };
    // Call the function
    loadComments();
  }, []);
  return (
    <div>
      <ul>
        {comments.map((comment) => (
          <p key={comment.id}>
            <li>Post ID: {comment.postId}</li>
            <li>Name: {comment.name}</li>
            <li>Email: {comment.email}</li>
            <li>Body: {comment.body}</li>
          </p>
        ))}
      </ul>
    </div>
  );
}

export default Comments;

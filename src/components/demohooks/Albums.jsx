import { useEffect, useState } from "react";

function Albums() {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const loadAlbums = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/albums"
      );
      if (!response.ok) {
        throw new Error(`HTTP Error Status ${response.status}`);
      }
      const resData = await response.json();
      setAlbums(resData);
      console.log("Successfully: ", resData);
    };
    loadAlbums();
  }, []);
  return (
    <div>
      <ul>
        {albums.map((album) => (
          <p key={album.id}>
            <li>Post ID: {album.userId}</li>
            <li>Name: {album.title}</li>
            <li>Description: {album.title}</li>
          </p>
        ))}
      </ul>
    </div>
  );
}
export default Albums;

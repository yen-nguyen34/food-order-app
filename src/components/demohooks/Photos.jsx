import { useState, useEffect } from "react";

function Photos() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const loadPhotos = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/photos"
      );
      if (!response.ok) {
        throw new Error(`HTTP Response Status ${response.status}`);
      } else {
        const resData = await response.json();
        setPhotos(resData);
        console.log("sucessfully", resData);
      }
    };
    // Call the function
    loadPhotos();
  }, []);
  return (
    <div>
      <ul>
        {photos.map((photo) => (
          <p key={photo.id}>
            <li>Album ID: {photo.albumId}</li>
            <li>Title: {photo.title}</li>
            <li>Url: {photo.url}</li>
            <li>ThumbnailUrl: {photo.thumbnailUrl}</li>
          </p>
        ))}
      </ul>
    </div>
  );
}

export default Photos;

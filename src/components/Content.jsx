import { useEffect, useState } from "react";
import { PostCard } from "./PostCard";

export const Content = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/posts");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        setPosts(data);
        setError(null);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {error ? (
        <p>A network error was encountered: {error.message}</p>
      ) : (
        <>
          {posts.map((post) => (
            <PostCard key={post.title} {...post}></PostCard>
          ))}
        </>
      )}
    </>
  );
};

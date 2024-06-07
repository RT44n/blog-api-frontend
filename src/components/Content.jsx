import { useEffect, useState } from "react";
import { PostCard } from "./PostCard";
export const Content = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("backendapi", { mode: "cors" });
        if (!response.ok) {
          throw new Error(`Server error: Status ${response.status}`);
        }
        const newPosts = await response.json();
        setPosts(newPosts);
        setError(null);
      } catch (err) {
        setError(err);
        setPosts([]);
      }
    };
    fetchPosts();
  }, []);

  return (
    <>
      {error ? (
        <p>A network error was encountered: {error.message}</p>
      ) : (
        <>
          {posts.map((post) => (
            <PostCard key={post._id}></PostCard>
          ))}
        </>
      )}
    </>
  );
};

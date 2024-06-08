import { useEffect, useState } from "react";
import { PostCard } from "./PostCard";
import { useAuth } from "../utilities/auth";

export const Content = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const { user, token } = useAuth();

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `http://localhost:3000/api/user/${user}/posts`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
              `HTTP error! Status: ${response.status}, message: ${
                errorData.message || response.statusText
              }`
            );
          }
          const data = await response.json();
          setPosts(data);
          setError(null);
        } catch (error) {
          setError({ message: error.message });
        }
      };

      fetchData();
    }
  }, [token, user]);

  return (
    <>
      {error ? (
        <p>A network error was encountered: {error.message}</p>
      ) : (
        <>
          {posts.map((post) => (
            <PostCard key={post.title} {...post} />
          ))}
        </>
      )}
    </>
  );
};

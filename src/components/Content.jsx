import { useEffect, useState } from "react";
import { PostCard } from "./PostCard";
import { useAuth } from "../utilities/auth";
import { useNavigate } from "react-router-dom";

export const Content = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const { user, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `https://blog-api-4xwl.onrender.com/api/user/posts`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (!response.ok) {
            if (response.status === 401) {
              navigate("/signin");
              return;
            }
            const errorData = await response.json();
            throw new Error(
              `HTTP error! Status: ${response.status}, message: ${
                errorData.message || response.statusText
              }`
            );
          }
          if (response.status === 401) {
            navigate("/");
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
  }, [navigate, token, user]);

  return (
    <>
      {error ? (
        <p>A network error was encountered: {error.message}</p>
      ) : (
        <>
          {posts.map((post) => (
            <PostCard key={post._id} {...post} />
          ))}
        </>
      )}
    </>
  );
};

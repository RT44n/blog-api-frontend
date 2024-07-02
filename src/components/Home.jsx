import { Header } from "./Header";
import { useEffect, useState } from "react";
import { PostCard } from "./PostCard";
import { useAuth } from "../utilities/auth";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `https://blog-api-4xwl.onrender.com/api/posts`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const data = await response.json();
          setPosts(data);
          setError(null);
        } catch (error) {
          setError({ message: error.message });
        }
      };

      fetchData();
    }
  }, [navigate]);
  return (
    <>
      <Header />
      <div className="container mx-auto px-4 lg:px-0 max-w-7xl">
        {error ? (
          <p>A network error was encountered: {error.message}</p>
        ) : (
          <>
            {posts.map((post) => (
              <PostCard key={post._id} {...post} />
            ))}
          </>
        )}
      </div>
    </>
  );
};

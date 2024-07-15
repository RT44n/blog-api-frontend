import { useEffect, useState } from "react";
import { Header } from "./Header";
import { useLocation } from "react-router-dom";

const convertTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  const localDate = date.toLocaleDateString();
  const localTime = date.toLocaleTimeString();
  return `${localDate} ${localTime}`;
};

export const DisplayBlogPost = () => {
  const [blogPost, setBlogPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const path = location.pathname.split("/");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postId = path[2];
        if (!postId) {
          throw new Error("Invalid post ID");
        }

        console.log(`Fetching data for post ID: ${postId}`);

        const response = await fetch(
          `https://blog-api-4xwl.onrender.com/api/posts/${postId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        setBlogPost(data);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [location.pathname]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!blogPost) {
    return <div>No blog post found</div>;
  }

  return (
    <>
      <Header />
      <div className="flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-2xl w-full">
          <h1 className="text-4xl font-bold mb-4">{blogPost.title}</h1>
          <div className="mb-4">
            <p>By: {blogPost.author.username}</p>
            <p className="text-slate-700">{convertTimestamp(blogPost.date)}</p>
          </div>
          <div className="mb-4">{blogPost.text}</div>
        </div>
        <div className="max-w-2xl w-full mt-8">
          <h2 className="text-2xl font-bold mb-4">Comments</h2>
          <input
            name="comment"
            type="text"
            placeholder="Add a comment"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <button type="submit">Post</button>
        </div>
      </div>
    </>
  );
};

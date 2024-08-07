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
  const [blogComments, setBlogComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commentText, setCommentText] = useState("");
  const token = localStorage.getItem("blogToken");

  const location = useLocation();
  const path = location.pathname.split("/");
  const postId = path[2];

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!postId) {
          throw new Error("Invalid post ID");
        }

        const postResponse = await fetch(
          `https://blog-api-4xwl.onrender.com/api/posts/${postId}`
        );
        if (!postResponse.ok) {
          throw new Error("Network response was not ok");
        }

        const postData = await postResponse.json();
        setBlogPost(postData);

        const commentsResponse = await fetch(
          `https://blog-api-4xwl.onrender.com/api/posts/${postId}/comments`
        );

        const commentsData = await commentsResponse.json();
        setBlogComments(commentsData);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [location.pathname, postId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://blog-api-4xwl.onrender.com/api/posts/${postId}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ postId, text: commentText }),
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

      const newComment = await response.json();
      setBlogComments([...blogComments, newComment]);
      setCommentText("");
    } catch (error) {
      setError({ message: error.message });
    }
  };

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
            <p>By: {blogPost.author?.username}</p>
            <p className="text-slate-700">{convertTimestamp(blogPost.date)}</p>
          </div>
          <div className="mb-4">{blogPost.text}</div>
        </div>
        <div className="max-w-2xl w-full mt-8">
          <h2 className="text-2xl font-bold mb-4">Comments</h2>
          <form onSubmit={handleCommentSubmit}>
            <input
              name="comment"
              type="text"
              placeholder="Add a comment"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button
              type="submit"
              className="mt-2 p-2 bg-blue-500 text-white rounded-md"
            >
              Post
            </button>
          </form>
          {blogComments ? (
            blogComments.length > 0 ? (
              blogComments.map((comment) => (
                <div
                  key={comment.id}
                  className="mb-4 p-4 border border-gray-300 rounded-md"
                >
                  <p className="text-slate-700">
                    {comment.author?.username} at{" "}
                    {convertTimestamp(comment.date)}
                  </p>
                  <p>{comment.text}</p>
                </div>
              ))
            ) : (
              <p>No comments yet. Be the first to comment!</p>
            )
          ) : (
            <p>Loading comments...</p>
          )}
        </div>
      </div>
    </>
  );
};

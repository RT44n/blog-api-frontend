import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../utilities/auth";
import { Navigate } from "react-router-dom";

export const EditPost = () => {
  const user = useAuth();

  const location = useLocation();
  const navigate = useNavigate();
  const { post } = location.state;
  const token = localStorage.getItem("blogToken");
  const [title, setTitle] = useState(post.title);
  const [text, setText] = useState(post.text);
  const [error, setError] = useState(null);

  const handlePublish = async (e) => {
    e.preventDefault();
    await handleSubmit("Public");
  };

  const handleSave = async (e) => {
    e.preventDefault();
    await handleSubmit("Private");
  };

  const handleSubmit = async (status) => {
    try {
      const id = post._id;
      const response = await fetch(
        `https://blog-api-4xwl.onrender.com/api/posts/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ title, text, status }),
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

      setError(null);
      navigate("/");
    } catch (error) {
      setError({ message: error.message });
    }
    if (!user.token) return <Navigate to="/signin" />;
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Edit Post</h1>
      <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
        <form>
          <div className="h-auto mb-6">
            <input
              className="w-full text-3xl py-2 px-4 "
              name="title"
              id="title"
              placeholder="Title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <textarea
              className="w-full text-xl py-2 px-4 min-h-[600px]"
              name="text"
              id="text"
              placeholder="Tell your story..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <button
              onClick={handlePublish}
              type="submit"
              className="bg-lime-800 text-white font-bold py-2 px-4 rounded-full mr-2"
            >
              Publish
            </button>
            <button
              onClick={handleSave}
              type="submit"
              className="bg-lime-800 text-white font-bold py-2 px-4 rounded-full"
            >
              Save
            </button>
          </div>
          {error && <p className="text-red-500 mt-4">{error.message}</p>}
        </form>
      </div>
    </>
  );
};

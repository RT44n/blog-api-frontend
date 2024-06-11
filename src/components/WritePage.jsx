import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utilities/auth";

export const WritePost = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("blogToken");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  //const [status, setStatus] = useState("");
  const [error, setError] = useState(null);

  const user = useAuth();

  const handleSubmitEvent = async (e) => {
    console.log(e.target.value);
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, text, status: "Public" }),
      });

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
  };
  return (
    <div className="max-w-3xl mx-auto mt-10 p-6">
      {error && <p style={{ color: "red" }}>{error.message}</p>}
      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-700">Draft as {user}</p>
        <button
          onClick={handleSubmitEvent}
          className="bg-lime-800 text-white font-bold py-2 px-4 rounded-full"
        >
          Publish
        </button>
        <button
          onClick={handleSubmitEvent}
          className="bg-lime-800 text-white font-bold py-2 px-4 rounded-full"
        >
          Save
        </button>
      </div>
      <form>
        <div className="mb-4">
          <input
            className="w-full text-4xl leading-10 py-2 px-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
            name="title"
            id="title"
            placeholder="Title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <textarea
            className="w-full min-h-[600px] text-xl py-2 px-3 rounded h-40 focus:ring-2 focus:ring-gray-500 "
            name="text"
            id="text"
            placeholder="Tell your story..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
      </form>
    </div>
  );
};

import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const EditPost = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { post } = location.state;
  const token = localStorage.getItem("blogToken");
  const [title, setTitle] = useState(post.title);
  const [text, setText] = useState(post.text);
  const [status, setStatus] = useState(post.status);
  const [error, setError] = useState(null);

  const tags = [
    "Artificial Intelligence",
    "Machine Learning",
    "Software Development",
    "Web Development",
    "Mobile Apps",
    "Cybersecurity",
    "Cloud Computing",
    "Blockchain",
    "IoT (Internet of Things)",
    "DevOps",
    "Programming Languages",
    "Tech News",
    "Startups",
  ];

  const handleSubmitEvent = async (e) => {
    e.preventDefault();
    try {
      const id = post._id;
      const response = await fetch(`http://localhost:3000/api/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, text }),
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
    <div>
      <h1>Edit Post</h1>
      {error && <p style={{ color: "red" }}>{error.message}</p>}
      <form onSubmit={handleSubmitEvent}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="text">Text</label>
          <textarea
            id="text"
            name="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="status">Publish:</label>
          <input
            name="status"
            id="status"
            type="checkbox"
            checked={status}
            onChange={(e) => setStatus(e.target.checked)}
          />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

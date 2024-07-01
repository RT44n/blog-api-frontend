import { useState } from "react";
import { useAuth } from "../utilities/auth";

export const Signup = () => {
  const [input, setInput] = useState({
    username: "",
    firstname: "",
    password: "",
  });
  const [error, setError] = useState({});
  const auth = useAuth();

  const handleSubmitEvent = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!input.username || input.username.length < 6) {
      newErrors.username = "Username must be at least 6 characters long.";
    }
    if (!input.firstname || input.firstname.length < 6) {
      newErrors.firstname = "Firstname must be at least 6 characters long.";
    }
    if (!input.password || input.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }

    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    }

    auth.signup(input);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-900">
          Welcome!
        </h1>
        <form onSubmit={handleSubmitEvent} className="space-y-6">
          <div className="form_control">
            <label
              htmlFor="username"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Dave52"
              value={input.username}
              onChange={handleInput}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                error.username ? "border-red-500" : ""
              }`}
              required
              minLength={6}
            />
            {error.username && (
              <p className="text-red-500 text-xs italic">{error.username}</p>
            )}
          </div>
          <div className="form_control">
            <label
              htmlFor="firstname"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Firstname
            </label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              placeholder="Dave"
              value={input.firstname}
              onChange={handleInput}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                error.firstname ? "border-red-500" : ""
              }`}
              required
              minLength={6}
            />
            {error.firstname && (
              <p className="text-red-500 text-xs italic">{error.firstname}</p>
            )}
          </div>
          <div className="form_control">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={input.password}
              onChange={handleInput}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
                error.password ? "border-red-500" : ""
              }`}
              required
              minLength={6}
            />
            {error.password && (
              <span className="text-red-500 text-xs italic">
                {error.password}
              </span>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

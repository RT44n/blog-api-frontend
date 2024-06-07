import { useState } from "react";
import { useAuth } from "../utilities/auth";

export const Signin = () => {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const auth = useAuth();

  const handleSubmitEvent = (e) => {
    e.preventDefault();
    if (input.username === "" || input.password === "") {
      setError("Please provide a valid input.");
      return;
    }
    auth.loginAction(input);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  return (
    <form onSubmit={handleSubmitEvent}>
      <div className="form_control">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="example@yahoo.com"
          aria-describedby="username"
          aria-invalid="false"
          onChange={handleInput}
        />
        <div id="username" className="sr-only">
          Please enter a valid username. It must contain at least 6 characters.
        </div>
      </div>
      <div className="form_control">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          aria-describedby="user-password"
          aria-invalid="false"
          onChange={handleInput}
        />
        <div id="user-password" className="sr-only">
          Your password should be more than 6 characters.
        </div>
      </div>
      {error && <p className="error">{error}</p>}
      <button className="btn-submit">Submit</button>
    </form>
  );
};

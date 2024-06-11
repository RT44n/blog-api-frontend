import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem("user") || null);
  const [token, setToken] = useState(localStorage.getItem("blogToken") || "");
  const navigate = useNavigate();

  const loginAction = async (data) => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();

      if (response.ok && res.token) {
        setUser(res.user);
        setToken(res.token);

        localStorage.setItem("blogToken", res.token);
        localStorage.setItem("user", res.user);

        navigate("/");
        return;
      }
      throw new Error(res.message || "Authentication failed");
    } catch (err) {
      console.error(err);
    }
  };

  const signup = async (data) => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();

      if (response.ok) {
        navigate("/login");
        return;
      }
      throw new Error(res.message || "Authentication failed");
    } catch (err) {
      console.error(err);
    }
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("blogToken");
    localStorage.removeItem("user");
    navigate("/signin");
  };

  return (
    <AuthContext.Provider value={{ token, user, loginAction, logOut, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};

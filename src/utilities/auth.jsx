import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
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
        setUser(res.token.username);
        setToken(res.token);
        setUserId(res.token.id);
        localStorage.setItem("blogToken", res.token);
        navigate("/");
        return;
      }
      throw new Error(res.message || "Authentication failed");
    } catch (err) {
      console.error(err);
    }
  };

  const logOut = () => {
    setUser(null);
    setUserId(null);
    setToken("");
    localStorage.removeItem("blogToken");
    navigate("/signin");
  };

  return (
    <AuthContext.Provider value={{ token, user, userId, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};

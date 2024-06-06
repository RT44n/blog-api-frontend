import { getValueOrTextContent } from "@testing-library/user-event/dist/cjs/document/getValueOrTextContent.js";
import { Children, createContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ Children }) => {
  const [user, setUser] = useState(null);

  const login = (user) => {
    setUser(user);
  };

  return (
    <AuthContext.Provider value={{ user, login }}>
      {Children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

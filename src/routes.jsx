import App from "./App";
import ErrorPage from "./components/ErrorPage";
import { Signin } from "./components/Signin";
import AuthProvider from "./utilities/auth";

const routes = [
  {
    path: "/",
    element: (
      <AuthProvider>
        <App />
      </AuthProvider>
    ),
    errorElement: <ErrorPage />,
  },

  {
    path: "Login",
    element: (
      <AuthProvider>
        <Signin />
      </AuthProvider>
    ),
  },
];

export default routes;

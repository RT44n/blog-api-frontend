import App from "./App";
import { EditPost } from "./components/EditPage";
import ErrorPage from "./components/ErrorPage";
import { Signin } from "./components/Signin";
import AuthProvider from "./utilities/auth";
import { WritePost } from "./components/WritePage";
import { Signup } from "./components/Signup";

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
    path: "signin",
    element: (
      <AuthProvider>
        <Signin />
      </AuthProvider>
    ),
  },
  {
    path: "edit/:id",
    element: (
      <AuthProvider>
        <EditPost></EditPost>
      </AuthProvider>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "write",
    element: (
      <AuthProvider>
        <WritePost></WritePost>
      </AuthProvider>
    ),
    errorElement: <ErrorPage />,
  },

  {
    path: "signup",
    element: (
      <AuthProvider>
        <Signup></Signup>
      </AuthProvider>
    ),
  },
];

export default routes;

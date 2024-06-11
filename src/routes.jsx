import App from "./App";
import { EditPost } from "./components/EditPage";
import ErrorPage from "./components/ErrorPage";
import { Signin } from "./components/Signin";
import AuthProvider from "./utilities/auth";
import { WritePost } from "./components/WritePage";

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
  {
    path: "Edit/:id",
    element: (
      <AuthProvider>
        <EditPost></EditPost>
      </AuthProvider>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "Write",
    element: (
      <AuthProvider>
        <WritePost></WritePost>
      </AuthProvider>
    ),
    errorElement: <ErrorPage />,
  },
];

export default routes;

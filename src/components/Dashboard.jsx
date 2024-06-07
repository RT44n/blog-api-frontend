import { Header } from "./Header";
import { Content } from "./Content";
import { Sidebar } from "./Sidebar";
import { Navigate } from "react-router-dom";
import { useAuth } from "../utilities/auth";

function Dashboard() {
  const user = useAuth();
  if (!user.token) return <Navigate to="/login" />;
  return (
    <>
      <Header />
      <div className="container mx-auto px-4 lg:px-0 max-w-7xl">
        <Content />
        <Sidebar />
      </div>
    </>
  );
}

export default Dashboard;

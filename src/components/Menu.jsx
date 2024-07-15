import { ProfileImage } from "./ProfileImage";
import { TfiWrite } from "react-icons/tfi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../utilities/auth";

export const Menu = () => {
  const user = useAuth();
  const navigate = useNavigate();

  const handleWriteClick = () => {
    navigate("/write");
  };

  return (
    <div className="flex flex-row items-center space-x-8">
      <div
        onClick={handleWriteClick}
        className="flex flex-row items-center space-x-2 cursor-pointer"
      >
        <TfiWrite className="h-5 w-5" />
        <p className="py-6">Write</p>
      </div>
      {user.token ? (
        <>
          <Link to="/dashboard">Dashboard</Link>
          <ProfileImage />
        </>
      ) : (
        <p className="py-6">
          <Link to="/signin">Sign In</Link>
        </p>
      )}
    </div>
  );
};

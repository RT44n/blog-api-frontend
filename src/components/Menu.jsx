import { IoNotificationsOutline } from "react-icons/io5";
import { ProfileImage } from "./ProfileImage";
import { TfiWrite } from "react-icons/tfi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../utilities/auth";

export const Menu = () => {
  const user = useAuth();
  const navigate = useNavigate();
  return (
    <div className="flex flex-row items-center space-x-8">
      <div
        onClick={() => {
          navigate("/write");
        }}
        className="flex flex-row items-center space-x-2 cursor-pointer"
      >
        <TfiWrite className="h-5 w-5"></TfiWrite>
        <p className="py-6">Write</p>
      </div>
      {!user ? ( // Change this line
        <p className="py-6">
          <Link to="/signin">Sign In</Link>
        </p>
      ) : (
        <>
          <Link to="/dashboard">Dashboard</Link>

          <IoNotificationsOutline className="h-6 w-6"></IoNotificationsOutline>
          <ProfileImage></ProfileImage>
        </>
      )}
    </div>
  );
};

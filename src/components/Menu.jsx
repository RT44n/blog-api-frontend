import { IoNotificationsOutline } from "react-icons/io5";
import { ProfileImage } from "./ProfileImage";
import { TfiWrite } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";

export const Menu = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-row items-center space-x-8">
      <div
        onClick={() => {
          navigate("/write");
        }}
        className="flex flex-row items-center space-x-2 cursor-pointer "
      >
        <TfiWrite className="h-5 w-5"></TfiWrite>
        <p className="py-6">Write</p>
      </div>
      <IoNotificationsOutline className="h-6 w-6"></IoNotificationsOutline>
      <ProfileImage></ProfileImage>
    </div>
  );
};

import { IoNotificationsOutline } from "react-icons/io5";
import { ProfileImage } from "./ProfileImage";
import { TfiWrite } from "react-icons/tfi";

export const Menu = () => {
  return (
    <div className="flex flex-row items-center space-x-8">
      <div className="flex flex-row items-center space-x-2 ">
        <TfiWrite className="h-5 w-5"></TfiWrite>
        <p>Write</p>
      </div>
      <IoNotificationsOutline className="h-6 w-6"></IoNotificationsOutline>
      <ProfileImage></ProfileImage>
    </div>
  );
};

import { TbShare3 } from "react-icons/tb";
import { MdModeEditOutline } from "react-icons/md";
import { SlOptionsVertical } from "react-icons/sl";

export const PostCard = ({ author, date, title, text, tag, status }) => {
  return (
    <div className="p-2 max-w-2xl max-h-60">
      <div className="flex flex-row items-center min-h-4 text-sm space-x-2">
        <img
          className="rounded-full max-w-7"
          src="images/default-avatar-icon-of-social-media-user-vector.jpg"
          alt=""
        />
        <p>{author.username}</p>
        <p className="text-slate-700">{date}</p>
        <p>{status}</p>
      </div>
      <div className="">
        <div className="py-2">
          <p className="text-xl font-bold">{title}</p>
          <p className="postText text base leading-6  overflow-hidden relative">
            {text}
          </p>
        </div>
        <div className="flex flex-row justify-between items-center">
          <p className="rounded-full bg-gray-200 px-3">{tag}</p>
          <div className="flex flex-row space-x-2 ">
            <TbShare3 className="h-5 w-5" />
            <MdModeEditOutline className="h-5 w-5" />
            <SlOptionsVertical className="h-5 w-5" />
          </div>
        </div>
      </div>
    </div>
  );
};

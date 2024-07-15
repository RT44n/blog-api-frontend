import { TbShare3 } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const convertTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  const localDate = date.toLocaleDateString();
  const localTime = date.toLocaleTimeString();
  return `${localDate} ${localTime}`;
};

export const DisplayPostCard = ({
  author,
  date,
  title,
  text,
  tag,

  _id,
}) => {
  const navigate = useNavigate();
  const handleCardClick = (id) => {
    navigate(`/post/${id}`);
  };

  return (
    <div
      onClick={() => handleCardClick(_id)}
      className="p-2 max-w-2xl max-h-60 border-b-2"
    >
      <div className="flex flex-row items-center min-h-4 text-sm space-x-2">
        <img
          className="rounded-full max-w-7"
          src="/images/default-avatar-icon-of-social-media-user-vector.jpg"
          alt="User Avatar"
        />
        <p>{author.username}</p>
        <p className="text-slate-700">{convertTimestamp(date)}</p>
      </div>
      <div className="py-2">
        <p className="text-xl font-bold">{title}</p>
        <p className="postText text-base leading-6 overflow-hidden relative">
          {text}
        </p>
      </div>
      <div className="flex flex-row justify-between items-center">
        <p className="rounded-full bg-gray-200 px-3">{tag}</p>
        <div className="flex flex-row space-x-2">
          <TbShare3 className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
};

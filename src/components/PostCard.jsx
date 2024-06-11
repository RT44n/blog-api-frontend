import { TbShare3 } from "react-icons/tb";
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export const PostCard = ({ author, date, title, text, tag, status, _id }) => {
  const navigate = useNavigate();

  const handleEditClick = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/posts/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch post data");
      }

      const postData = await response.json();
      navigate(`/Edit/${id}`, { state: { post: postData } });
    } catch (error) {
      console.error("Error fetching post data:", error.message);
    }
  };

  return (
    <div className="p-2 max-w-2xl max-h-60">
      <div className="flex flex-row items-center min-h-4 text-sm space-x-2">
        <img
          className="rounded-full max-w-7"
          src="images/default-avatar-icon-of-social-media-user-vector.jpg"
          alt="User Avatar"
        />
        <p>{author.username}</p>
        <p className="text-slate-700">{date}</p>
        <p>{status}</p>
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
          <MdModeEditOutline
            onClick={() => handleEditClick(_id)}
            className="h-5 w-5 cursor-pointer"
          />
          <MdDelete />
          <dialog>
            <p>Are you sure you want to Delete this post?</p>
            <button>Yes</button>
            <button>No</button>
          </dialog>
        </div>
      </div>
    </div>
  );
};

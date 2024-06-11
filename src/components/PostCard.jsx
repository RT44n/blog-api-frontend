import { TbShare3 } from "react-icons/tb";
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const PostCard = ({ author, date, title, text, tag, status, _id }) => {
  const [showDialog, setShowDialog] = useState(false);
  const navigate = useNavigate();
  const handleDeleteClick = () => {
    setShowDialog(true);
  };

  const handleConfirmDelete = () => {};

  const handleCancelDelete = () => {
    setShowDialog(false);
  };

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
            data-testid="edit"
            onClick={() => handleEditClick(_id)}
            className="h-5 w-5 cursor-pointer"
          />
          <MdDelete data-testid="delete" onClick={handleDeleteClick} />
          {showDialog && (
            <dialog className="bg-white mx-auto overflow-y-auto flex items-center justify-center border-2 border-slate-400 rounded-lg ">
              <div className="p-6">
                <p className="text-lg font-semibold mb-4">
                  Are you sure you want to delete this post?
                </p>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={handleConfirmDelete}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  >
                    Yes
                  </button>
                  <button
                    onClick={handleCancelDelete}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                  >
                    No
                  </button>
                </div>
              </div>
            </dialog>
          )}
        </div>
      </div>
    </div>
  );
};

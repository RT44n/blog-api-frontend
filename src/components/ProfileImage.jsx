import { useEffect, useState } from "react";

export const ProfileImage = () => {
  const user = localStorage.getItem("user");
  const [userAvatar, setUserAvatar] = useState("");

  useEffect(() => {
    if (user) {
      setUserAvatar(user);
    }
  }, [user]);

  return (
    <div className="rounded-full bg-gray-700 min-w-8 min-h-8 flex items-center justify-center text-white">
      {userAvatar && userAvatar[0] ? userAvatar[0].toUpperCase() : "?"}
    </div>
  );
};

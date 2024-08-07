import { useNavigate } from "react-router-dom";
import { Logo } from "./Logo";
import { Menu } from "./Menu";

export const Header = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-row justify-between min-h-14 border-b px-5">
      <div className="py-3" onClick={handleLogoClick}>
        <Logo />
      </div>
      <Menu />
    </div>
  );
};

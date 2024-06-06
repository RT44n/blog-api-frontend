import { Logo } from "./Logo";
import { Menu } from "./Menu";
export const Header = () => {
  return (
    <div className="flex flex-row justify-between min-h-14 border-b px-5">
      <Logo></Logo>
      <Menu></Menu>
    </div>
  );
};

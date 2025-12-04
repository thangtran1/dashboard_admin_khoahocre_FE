import  { FC } from "react";
import Logo from "@/ui/logo";
import { X } from "lucide-react";
import { headerData } from "@/constants/data";
import { Link } from "react-router";
import { useLocation } from "react-router";
import SocialMedia from "./SocialMedia";
import { useOutsideClick } from "@/hooks/index-fake";
interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideMenu: FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { pathname } = useLocation();
  const sidebarRef = useOutsideClick<HTMLDivElement>(onClose);
  return (
    <div
      className={`fixed inset-y-0 h-screen left-0 z-50 w-full bg-black/50  shadow-xl ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } `}
    >
      <div
        ref={sidebarRef}
        className="min-w-72 max-w-96 bg-background h-screen p-10 border-r border-primary flex flex-col gap-6"
      >
        <div className="flex items-center justify-between gap-5">
          <Logo />
          <button
            onClick={onClose}
            className="hover:text-primary "
          >
            <X />
          </button>
        </div>

        <div className="flex flex-col space-y-3.5 font-semibold">
          {headerData?.map((item) => (
            <Link
              to={item?.href}
              key={item?.title}
              className={`text-foreground hover:text-primary  ${
                pathname === item?.href && "text-primary"
              }`}
            >
              {item?.title}
            </Link>
          ))}
        </div>
        <SocialMedia />
      </div>
    </div>
  );
};

export default SideMenu;

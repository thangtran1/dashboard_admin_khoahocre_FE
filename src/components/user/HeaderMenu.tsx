"use client";
import { headerData } from "@/constants/data";
import { Link } from "react-router";
import { useLocation } from "react-router";

const HeaderMenu = () => {
  const { pathname } = useLocation();

  return (
    <div className="hidden md:inline-flex w-2/3 items-center justify-center gap-7 text-sm capitalize font-semibold">
      {headerData?.map((item) => (
        <Link
          key={item?.title}
          to={item?.href}
          className={`text-base !text-foreground hover:!text-primary hover:cursor-pointer relative group ${
            pathname === item?.href && "!text-primary"
          }`}
        >
          {item?.title}
          <span
  className={`absolute -bottom-0.5 left-1/2 w-0 h-0.5 bg-primary group-hover:w-1/2 group-hover:left-0 ${
    pathname === item?.href ? "w-1/2 left-0" : ""
  }`}
/>
<span
  className={`absolute -bottom-0.5 right-1/2 w-0 h-0.5 bg-primary group-hover:w-1/2 group-hover:right-0 ${
    pathname === item?.href ? "w-1/2 right-0" : ""
  }`}
/>
        </Link>
      ))}
    </div>
  );
};

export default HeaderMenu;

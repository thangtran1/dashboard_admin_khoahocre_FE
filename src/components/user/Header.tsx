import Logo from "@/ui/logo";
import SearchBar from "./SearchBar";
import MobileMenu from "./MobileMenu";
import { Link } from "react-router";
import { Logs } from "lucide-react";
import HeaderMenu from "./HeaderMenu";
import CartIcon from "./CartIcon";
import FavoriteButton from "./FavoriteButton";
import SignIn from "@/pages/user/public/SignIn";
import clsx from "clsx";
import { contentWrapper } from "@/utils/use-always";
import OrderIcon from "./OrderIcon";

const Header = () => {
  // Fake user state - có thể thay đổi thành true để test UI với user đăng nhập
  const user = null; // Set to null để hiển thị như chưa đăng nhập
  const orders = []; // Fake orders array

  return (
    <header className="sticky top-0 z-50 py-5 px-4 sm:px-6 lg:px-0 backdrop-blur-md">

      <div className={clsx("flex items-center justify-between mx-auto", contentWrapper)}>
        <div className="w-auto md:w-1/3 flex items-center gap-2.5 justify-start md:gap-0">
          <MobileMenu />
          <Logo />
        </div>
        <HeaderMenu />
        <div className="w-auto md:w-1/3 flex items-center justify-end gap-5">
          <SearchBar />
          <CartIcon />
          <FavoriteButton />
          <OrderIcon />

          {user && (
            <Link
              to={"/orders"}
              className="group relative !text-foreground hover:!text-primary"
            >
              <Logs />
              <span className="absolute -top-1 -right-1 text-white h-3.5 w-3.5 rounded-full text-xs font-semibold flex items-center justify-center">
                {orders?.length ? orders?.length : 0}
              </span>
            </Link>
          )}

            {!user && <SignIn />}
        </div>
      </div>
    </header>
  );
};

export default Header;

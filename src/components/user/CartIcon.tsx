"use client";
import useStore from "@/store/store";
import { ShoppingBag } from "lucide-react";
import { Link } from "react-router";

const CartIcon = () => {
  const { items } = useStore();
  return (
    <Link to={"/cart"} className="group relative !text-foreground hover:!text-primary">
      <ShoppingBag  className="w-5 h-5 hover:cursor-pointer" />
      <span className="absolute border border-border bg-foreground text-background -top-1 -right-1  h-3.5 w-3.5 rounded-full text-xs font-semibold flex items-center justify-center">
        {items?.length ? items?.length : 0}
      </span>
    </Link>
  );
};

export default CartIcon;

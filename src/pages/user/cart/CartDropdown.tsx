import { ShoppingCart, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

const cartItems = [
  {
    id: "fx-dream",
    title: "Khóa Học FX Dream Trading 2025",
    image:
      "https://khoahocre.com/wp-content/uploads/2025/05/Facebook-ads-Noti-360x360.png",
    price: 999000,
    quantity: 1,
  },
  {
    id: "fb-adss",
    title: "Facebook Ads 2025",
    image:
      "https://khoahocre.com/wp-content/uploads/2025/05/Facebook-ads-Noti-360x360.png",
    price: 149000,
    quantity: 1,
  },
  {
    id: "fb-adsss",
    title: "Facebook Ads 2025",
    image:
      "https://khoahocre.com/wp-content/uploads/2025/05/Facebook-ads-Noti-360x360.png",
    price: 149000,
    quantity: 1,
  },
  {
    id: "fb-adssss",
    title: "Facebook Ads 2025",
    image:
      "https://khoahocre.com/wp-content/uploads/2025/05/Facebook-ads-Noti-360x360.png",
    price: 149000,
    quantity: 1,
  },
  {
    id: "fb-adsssss",
    title: "Facebook Ads 2025",
    image:
      "https://khoahocre.com/wp-content/uploads/2025/05/Facebook-ads-Noti-360x360.png",
    price: 149000,
    quantity: 1,
  },
  {
    id: "fb-adssssss",
    title: "Facebook Ads 2025",
    image:
      "https://khoahocre.com/wp-content/uploads/2025/05/Facebook-ads-Noti-360x360.png",
    price: 149000,
    quantity: 1,
  },
];

export default function CartDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="relative group md:static">
      <div
        className="cursor-pointer flex items-center gap-1"
        onClick={() => setIsOpen((prev: boolean) => !prev)}
      >
        <ShoppingCart className="w-5 h-5" />
        <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
          {cartItems.length}
        </span>
      </div>

      <div
        className={`
    absolute right-0 top-5 z-50 w-[320px] bg-background border shadow-lg rounded-xl p-4
    transition-all duration-200
    ${
      isOpen
        ? "opacity-100 pointer-events-auto"
        : "opacity-0 pointer-events-none"
    }
    md:group-hover:opacity-100 md:group-hover:pointer-events-auto
  `}
      >
        <div className="space-y-3 text-sm text-foreground max-h-[320px] overflow-y-auto">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-start gap-3 border-b pb-3">
              <img
                src={item.image}
                className="w-14 h-14 object-cover rounded"
              />
              <div className="flex-1">
                <Link
                  to={`/course/${item.id}`}
                  className="font-medium hover:underline"
                >
                  {item.title}
                </Link>
                <div className="text-xs text-muted-foreground">
                  {item.quantity} × {item.price.toLocaleString()} ₫
                </div>
              </div>
              <X
                size={14}
                className="cursor-pointer text-primary hover:text-error"
              />
            </div>
          ))}
        </div>

        <div className="border w-fit mt-2 rounded-lg p-2 border-border gap-2 flex items-center text-primary text-sm">
          <div>Tạm tính:</div>
          <div className="text-error text-xl">{total.toLocaleString()} ₫</div>
        </div>

        <div className="flex gap-2 mt-4">
          <Link
            to="/cart"
            className="w-1/2 border border-primary text-center py-2 rounded-lg text-sm"
            onClick={() => setIsOpen(false)}
          >
            Xem giỏ hàng
          </Link>
          <Link
            to="/thanh-toan"
            className="w-1/2 border border-primary text-center py-2 rounded-lg text-sm"
            onClick={() => setIsOpen(false)}
          >
            Thanh toán
          </Link>
        </div>
      </div>
    </div>
  );
}

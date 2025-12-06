import Title from "@/ui/title";
import { Link } from "react-router";
import { getFakeBrands } from "@/constants/fakeData";
import { GitCompareArrows, Headset, ShieldCheck, Truck } from "lucide-react";
import SeeMore from "@/ui/see-more";

const extraData = [
  {
    title: "Free Delivery",
    description: "Free shipping over $100",
    icon: <Truck size={40} />,
  },
  {
    title: "Free Return",
    description: "30 days return guarantee",
    icon: <GitCompareArrows size={40} />,
  },
  {
    title: "Customer Support",
    description: "Friendly 24/7 customer support",
    icon: <Headset size={40} />,
  },
  {
    title: "Money Back Guarantee",
    description: "Quality checked by our team",
    icon: <ShieldCheck size={40} />,
  },
];

const ShopByBrands = async () => {
  const brands = await getFakeBrands();

  return (
    <div className="space-y-2">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Title className="text-2xl font-semibold">Thương hiệu phổ biến</Title>
        <SeeMore to="/shop">Xem thêm</SeeMore>
      </div>

      {/* Wrapper */}
      <div className="border border-border p-2 rounded-xl shadow-sm space-y-6">

        {/* Brands */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
          {brands?.map((brand) => (
            <Link
              key={brand?._id}
              to={`/shop?brand=${brand?.slug?.current}`}
              className="
                border border-border h-24 rounded-lg flex items-center justify-center
                hover:shadow-md
                transition-all duration-300
              "
            >
              <img
                src={brand?.image?.asset?.url || "/images/brands/brand_1.webp"}
                alt="brandImage"
                className="w-28 h-20 object-contain opacity-80 hover:opacity-100 transition"
              />
            </Link>
          ))}
        </div>

        {/* Extra Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {extraData.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 rounded-xl border border-border hover:border-primary/30 hover:shadow-md transition-all duration-300 group bg-primary/5"
            >
              <div className="p-3 rounded-full bg-primary/5 group-hover:bg-primary/20 transition-all flex items-center justify-center">
                <span className="text-primary group-hover:scale-110 transition-transform">
                  {item.icon}
                </span>
              </div>

              <div className="text-sm">
                <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {item.title}
                </p>
                <p className="text-muted-foreground text-xs mt-0.5">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ShopByBrands;

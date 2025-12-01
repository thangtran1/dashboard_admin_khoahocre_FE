import Title from "@/components/user/Title";
import { Link } from "react-router";
import { getFakeBrands } from "@/constants/fakeData";
import { GitCompareArrows, Headset, ShieldCheck, Truck } from "lucide-react";

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
    <>
    <div className="flex items-center justify-between">
    <Title>Shop By Brands</Title>
    <Link to={"/shop"} className="font-semibold">
      View all →
    </Link>
  </div>
    <div className="border border-border p-3 rounded-xl shadow-sm">
      {/* Brand Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {brands?.map((brand) => (
          <Link
            key={brand?._id}
            to={`/shop?brand=${brand?.slug?.current}`}
            className="border border-border h-24 rounded-lg flex items-center justify-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10 p-3 rounded-xl border border-border shadow-sm">
        {extraData.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-3 rounded-xl border border-transparent hover:border-primary/20 hover:shadow-md transition-all duration-300 group"
          >
            <div className="p-3 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-all flex items-center justify-center">
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
    </>
  );
};

export default ShopByBrands;

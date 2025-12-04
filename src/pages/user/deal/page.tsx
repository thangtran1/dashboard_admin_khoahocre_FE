
import ProductCard from "@/pages/user/public/ProductCard";
import Title from "@/ui/title";
import { getFakeDealProducts } from "@/constants/fakeData";

const DealPage = async () => {
  const products = await getFakeDealProducts();
  return (
    <div className="py-5 bg-deal-bg">
        <Title className="mb-5 underline underline-offset-4 decoration-[1px] text-base uppercase tracking-wide">
          Hot Deals of the Week
        </Title>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {products?.map((product: any) => (
            <ProductCard key={product?._id} product={product} />
          ))}
        </div>
    </div>
  );
};

export default DealPage;

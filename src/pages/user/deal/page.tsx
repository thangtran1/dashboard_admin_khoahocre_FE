
import ProductCard from "@/pages/user/public/ProductCard";
import Title from "@/ui/title";
import { getFakeDealProducts } from "@/constants/fakeData";

const DealPage = () => {
  const products = getFakeDealProducts();
  return (
    <div>
      <Title className="text-lg mb-5 uppercase tracking-wide">
        Hot Deals of the Week
      </Title>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
        {products?.map((product: any) => (
          <ProductCard key={product?._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default DealPage;

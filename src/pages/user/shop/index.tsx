"use client";
import { Product } from "@/types";
import { useEffect, useState } from "react";
import Title from "@/ui/title";
import CategoryList from "@/components/user/shop/CategoryList";
import BrandList from "@/components/user/shop/BrandList";
import PriceList from "@/components/user/shop/PriceList";
import { getFakeCategories, getFakeProducts } from "@/constants/fakeData";
import { getFakeBrands } from "@/constants/fakeData";
import { Link, Loader2, ShoppingBag, RefreshCw, Search } from "lucide-react";
import ProductCard from "@/pages/user/public/ProductCard";

const Shop = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const brandParams = typeof window !== "undefined"
    ? new URLSearchParams(window.location.search).get("brand")
    : null;

  const categoryParams = typeof window !== "undefined"
    ? new URLSearchParams(window.location.search).get("category")
    : null;

  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    categoryParams || null
  );
  const [selectedBrand, setSelectedBrand] = useState<string | null>(
    brandParams || null
  );
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);

  // Fetch categories & brands ONCE
  useEffect(() => {
    const load = async () => {
      const cats = await getFakeCategories(6);
      const brs = await getFakeBrands();
      setCategories(cats);
      setBrands(brs);
    };
    load();
  }, []);

  // Fetch products on filter change
  const fetchProducts = async () => {
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 500));

    let filtered = getFakeProducts();

    // category filter
    if (selectedCategory) {
      const cat = categories.find(
        (c) => c.slug?.current === selectedCategory
      );
      filtered = filtered.filter(
        (p) => p.category?._ref === cat?._id
      );
    }

    // brand filter
    if (selectedBrand) {
      const br = brands.find((b) => b.slug?.current === selectedBrand);
      filtered = filtered.filter((p) => p.brand?._ref === br?._id);
    }

    // price filter
    if (selectedPrice) {
      const [min, max] = selectedPrice.split("-").map(Number);
      filtered = filtered.filter(
        (p) => p.price >= min && p.price <= max
      );
    }

    setProducts(filtered as Product[]);
    setLoading(false);
  };

  // re-fetch products when filters or data ready
  useEffect(() => {
    if (categories.length > 0 && brands.length > 0) {
      fetchProducts();
    }
  }, [categories, brands, selectedCategory, selectedBrand, selectedPrice]);

  return (
    <div>
      <div className="sticky top-0 z-10 mb-5">
        <div className="flex items-center justify-between">
          <Title className="text-lg uppercase tracking-wide">
            Get the products as your needs
          </Title>

          {(selectedCategory || selectedBrand || selectedPrice) && (
            <button
              onClick={() => {
                setSelectedCategory(null);
                setSelectedBrand(null);
                setSelectedPrice(null);
              }}
              className="text-primary underline text-sm mt-2 font-medium"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-2 border-t border-border">
        <div className="md:sticky md:top-20 md:self-start md:h-[calc(100vh-160px)] md:overflow-y-auto md:min-w-64 pb-5 md:border-r border-r scrollbar-hide">
          <CategoryList
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <BrandList
            brands={brands}
            selectedBrand={selectedBrand}
            setSelectedBrand={setSelectedBrand}
          />
          <PriceList
            selectedPrice={selectedPrice}
            setSelectedPrice={setSelectedPrice}
          />
        </div>

        <div className="flex-1 pt-2">
          <div
            className={
              products.length > 0
                ? "h-[calc(100vh-160px)] overflow-y-auto pr-2 scrollbar-hide"
                : "pr-2"
            }
          >
            {loading ? (
              <div className="p-20 flex flex-col gap-2 items-center justify-center">
                <Loader2 className="w-10 h-10 text-primary animate-spin" />
                <p className="font-semibold tracking-wide text-base">
                  Đang tải sản phẩm . . .
                </p>
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 py-2">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                <div className="w-28 h-28 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center shadow-md mb-6">
                  <Search className="w-14 h-14 text-primary opacity-80" />
                </div>

                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Không có sản phẩm
                </h2>

                <p className="text-sm text-muted-foreground max-w-xs leading-relaxed mb-6">
                  Rất tiếc, hiện tại không có sản phẩm nào phù hợp với bộ lọc của bạn.
                </p>

                <div className="flex items-center gap-3">

                  <button
                    onClick={() => {
                      setSelectedCategory(null);
                      setSelectedBrand(null);
                      setSelectedPrice(null);
                    }}
                    className="px-5 py-2.5 rounded-lg border border-border hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 flex items-center gap-2 text-sm font-medium"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Làm mới
                  </button>

                  <Link to="/shop">
                    <button className="px-5 py-2.5 rounded-lg border border-border hover:bg-green-50 hover:border-green-300 transition-all duration-300 flex items-center gap-2 text-sm font-medium">
                      <ShoppingBag className="w-4 h-4" />
                      Xem tất cả
                    </button>
                  </Link>
                </div>
              </div>


            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Shop;

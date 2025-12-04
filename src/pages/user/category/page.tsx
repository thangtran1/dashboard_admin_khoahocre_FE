"use client";
import { Category, Product } from "@/types";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { getFakeProducts } from "@/constants/fakeData";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, Package } from "lucide-react";
import NoProductAvailable from "@/pages/user/public/NoProductAvailable";
import ProductCard from "@/components/user/products/ProductCard";

interface Props {
  categories: Category[];
  slug?: string;
}

const CategoryPage = ({ categories, slug }: Props) => {
  const [currentSlug, setCurrentSlug] = useState(slug || "all");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const navigate = useNavigate();

  const handleCategoryChange = (newSlug: string) => {
    if (newSlug === currentSlug) return;
    setCurrentSlug(newSlug);
    navigate(`/category/${newSlug}`);
  };

  const fetchProducts = async (categorySlug?: string) => {
    setLoading(true);
    try {
      const allProducts = getFakeProducts();

      if (!categorySlug || categorySlug === "all") {
        setProducts(allProducts as any);
        return;
      }

      const category = categories.find(cat => cat.slug?.current === categorySlug);
      if (!category) {
        setProducts([]);
        return;
      }

      const filteredProducts = allProducts.filter(
        product => product.category?._ref === category._id
      );

      setProducts(filteredProducts as any);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentSlug);
  }, [currentSlug, categories]);

  const currentCategory = categories.find(cat => cat.slug?.current === currentSlug);

  return (
    <div className="pb-3 flex flex-row items-start gap-2">
      {/* Sidebar */}
      <div
        className={`rounded-lg shadow-sm border transition-all duration-300
          ${isSidebarCollapsed ? "w-12  " : "w-52"}
        `}
      >
        {/* Header */}
        <div className="p-4 bg-primary/90 flex justify-between items-center">
          {!isSidebarCollapsed && (
            <h3 className="font-bold text-lg text-foreground flex items-center gap-2">
              <Package className="w-5 h-5" /> Danh mục
            </h3>
          )}
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="text-foreground text-sm font-medium hover:text-gray-200"
          >
            {isSidebarCollapsed ? "»" : "«"}
          </button>
        </div>

        {/* Categories List */}
        <div className="flex flex-col">
          {categories?.map(item => (
            <button
            key={item._id}
            onClick={() => handleCategoryChange(item.slug?.current as string)}
            className={`group flex items-center gap-2 px-3 py-3 border-b hover:bg-primary/10
                transition-colors duration-200 relative
                ${item.slug?.current === currentSlug ? "bg-primary/10 text-primary border-l-2 border-l-primary" : "text-foreground"}
            `}
        >
              {/* Icon thay cho image nếu muốn */}
              <Package className="w-5 h-5" />

              {/* Text category chỉ hiện khi sidebar không collapsed hoặc hover */}
              <span
                className={`transition-opacity duration-300 whitespace-nowrap
                  ${isSidebarCollapsed ? "opacity-0 absolute left-16 shadow-md px-2 py-1 rounded-md group-hover:opacity-100" : "opacity-100"}
                `}
              >
                {item.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="flex-1 min-w-0">
        {currentCategory && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-1 rounded-lg shadow-sm border p-3"
          >
            <h2 className="text-2xl font-bold text-primary capitalize mb-1">
              {currentCategory.name}
            </h2>
            {currentCategory.description && (
              <p className="text-foreground text-sm">{currentCategory.description}</p>
            )}
            {!loading && products.length > 0 && (
              <p className="text-sm text-primary mt-2 font-medium">
                {products.length} Sản phẩm có sẵn
              </p>
            )}
          </motion.div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 min-h-80 space-y-4 text-center rounded-lg shadow-sm border">
            <motion.div
              className="flex items-center space-x-2 text-blue-600"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <Loader2 className="w-6 h-6 animate-spin" />
              <span className="font-medium">Đang tải sản phẩm...</span>
            </motion.div>
          </div>
        ) : products?.length > 0 ? (
          <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.4 }}
  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 
             h-[100vh] overflow-y-auto py-2"
>
  {products?.map((product, index) => (
    <AnimatePresence key={product._id}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05, duration: 0.3 }}
      >
        <ProductCard product={product} />
      </motion.div>
    </AnimatePresence>
  ))}
</motion.div>
        ) : (
          <NoProductAvailable selectedTab={currentSlug} className="mt-0 w-full" />
        )}
      </div>
    </div>
  );
};

export default CategoryPage;

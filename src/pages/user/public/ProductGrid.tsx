"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import HomeTabbar from "./HomeTabbar";
import { productType } from "@/constants/data";
import { Product } from "@/types";
import { getFakeProducts } from "@/constants/fakeData";
import ProductCard from "./ProductCard";
import NoProductAvailable from "./NoProductAvailable";

const ProductGrid = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  // Lấy tab từ URL, nếu không có thì dùng tab đầu tiên
  const defaultTab = productType[0]?.title || "";
  const tabFromUrl = searchParams.get("tab");
  const selectedTab = tabFromUrl && productType.some(t => t.title === tabFromUrl)
    ? tabFromUrl
    : defaultTab;

  // Hàm đổi tab và cập nhật URL
  const handleTabSelect = useCallback((tab: string) => {
    setSearchParams({ tab });
  }, [setSearchParams]);

  // Hàm fetch products
  const fetchProducts = useCallback(async (tab: string) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const allProducts = getFakeProducts();
      const filteredProducts = allProducts.filter(product => {
        if (tab.toLowerCase() === "gadget") {
          return ["Smartphones", "Tablets", "Smart Watch", "Headphones"].includes(product.category?.name);
        }
        if (tab.toLowerCase() === "appliances") {
          return ["Laptops", "Air Conditioners", "Washing Machines"].includes(product.category?.name);
        }
        if (tab.toLowerCase() === "refrigerators") {
          return ["Refrigerators", "Freezers"].includes(product.category?.name);
        }
        if (tab.toLowerCase() === "others") {
          return ["Gaming", "Home Decor", "Sports & Fitness"].includes(product.category?.name);
        }
        return true;
      });
      setProducts(filteredProducts as Product[]);
    } catch (error) {
      console.log("Product fetching Error", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts(selectedTab);
  }, [selectedTab, fetchProducts]);

  // Callback cho NoProductAvailable - Làm mới (reload filter hiện tại)
  const handleRefresh = useCallback(() => {
    fetchProducts(selectedTab);
  }, [selectedTab, fetchProducts]);

  // Callback cho NoProductAvailable - Xem tất cả (reset về tab đầu tiên)
  const handleViewAll = useCallback(() => {
    setSearchParams({ tab: defaultTab });
  }, [setSearchParams, defaultTab]);

  return (
    <div className="flex flex-col lg:px-0 my-2">
      <HomeTabbar selectedTab={selectedTab} onTabSelect={handleTabSelect} />
      {loading ? (
        <div className="flex flex-col items-center justify-center py-10 min-h-80 space-y-4 text-center rounded-lg w-full mt-10">
          <div className="relative flex flex-col items-center justify-center">
            <Loader2
              className="h-10 w-10 animate-spin text-primary relative z-10"
              style={{ animationDuration: "0.8s" }}
            />
            <span>Đang tải sản phẩm...</span>
          </div>
        </div>
      ) : products?.length ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5 mt-2">
          {products?.map((product) => (
            <AnimatePresence key={product?._id}>
              <motion.div
                layout
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <ProductCard key={product?._id} product={product} />
              </motion.div>
            </AnimatePresence>
          ))}
        </div>
      ) : (
        <NoProductAvailable
          onRefresh={handleRefresh}
          onViewAll={handleViewAll}
        />
      )}
    </div>
  );
};

export default ProductGrid;

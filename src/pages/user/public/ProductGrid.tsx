"use client";

import { useEffect, useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import HomeTabbar from "./HomeTabbar";
import { productType } from "@/constants/data";
import { Product } from "@/types";
import { getFakeProducts } from "@/constants/fakeData";
import ProductCard from "./ProductCard";
import NoProductAvailable from "./NoProductAvailable";

const ProductGrid = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState(productType[0]?.title || "");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Simulate loading time
        await new Promise(resolve => setTimeout(resolve, 500));
        const allProducts = getFakeProducts();
        // Filter products based on selected tab with proper categorization
        const filteredProducts = allProducts.filter(product => {
          if (selectedTab.toLowerCase() === "gadget") {
            // GADGET: Smartphones, Tablets, Smart Watch, Headphones
            return ["Smartphones", "Tablets", "Smart Watch", "Headphones"].includes(product.category?.name);
          }
          if (selectedTab.toLowerCase() === "appliances") {
            // APPLIANCES: Laptops, Air Conditioners, Washing Machines
            return ["Laptops", "Air Conditioners", "Washing Machines"].includes(product.category?.name);
          }
          if (selectedTab.toLowerCase() === "refrigerators") {
            // REFRIGERATORS: Refrigerators, Freezers
            return ["Refrigerators", "Freezers"].includes(product.category?.name);
          }
          if (selectedTab.toLowerCase() === "others") {
            // OTHERS: Gaming, Home Decor, Sports & Fitness
            return ["Gaming", "Home Decor", "Sports & Fitness"].includes(product.category?.name);
          }
          return true; // Show all for any other tabs
        });
        setProducts(filteredProducts as Product[]);
      } catch (error) {
        console.log("Product fetching Error", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedTab]);

  return (
    <div className="flex flex-col lg:px-0 my-2">
      <HomeTabbar selectedTab={selectedTab} onTabSelect={setSelectedTab} />
      {loading ? (
        <div className="flex flex-col items-center justify-center py-10 min-h-80 space-y-4 text-center  rounded-lg w-full mt-10">
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
          <>
            {products?.map((product) => (
              <AnimatePresence key={product?._id}>
                <m.div
                  layout
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <ProductCard key={product?._id} product={product} />
                </m.div>
              </AnimatePresence>
            ))}
          </>
        </div>
      ) : (
        <NoProductAvailable selectedTab={selectedTab} />
      )}
    </div>
  );
};

export default ProductGrid;

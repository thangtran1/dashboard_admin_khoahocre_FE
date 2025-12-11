"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import HomeTabbar from "./HomeTabbar";
import ProductCard from "./ProductCard";
import NoProductAvailable from "./NoProductAvailable";
import { productService } from "@/api/services/product";
import { ProductStatus } from "@/types/enum";
import { useTranslation } from "react-i18next";

// 3 tab sản phẩm
export

  const ProductGrid = () => {
    const { t } = useTranslation();
    const productType = [
      { title: t("product.new"), value: "new" },
      { title: t("product.bestSeller"), value: "bestSeller" },
      { title: t("product.featured"), value: "featured" },
    ];
    const [searchParams, setSearchParams] = useSearchParams();
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    // Lấy tab từ URL, nếu không có → default tab đầu tiên
    const defaultTab = productType[0]?.value || "";
    const tabFromUrl = searchParams.get("tab");
    const selectedTab = tabFromUrl && productType.some(t => t.value === tabFromUrl)
      ? tabFromUrl
      : defaultTab;

    // Hàm đổi tab và cập nhật URL
    const handleTabSelect = useCallback((tab: string) => {
      setSearchParams({ tab });
    }, [setSearchParams]);

    // Fetch products và lọc theo tab
    const fetchProducts = useCallback(async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 500)); // fake delay
        const response = await productService.getAllProducts(1, 100, {
          status: ProductStatus.ACTIVE,
        });
        const allProducts = response.data.data;

        const filteredProducts = allProducts.filter(product => {
          switch (selectedTab) {
            case "new":
              return product.isNew;
            case "bestSeller":
              return product.isBestSeller;
            case "featured":
              return product.isFeatured;
            default:
              return true;
          }
        });

        setProducts(filteredProducts);
      } catch (error) {
        console.log("Product fetching Error", error);
      } finally {
        setLoading(false);
      }
    }, [selectedTab]);

    useEffect(() => {
      fetchProducts();
    }, [selectedTab, fetchProducts]);

    // Callback refresh hiện tại
    const handleRefresh = useCallback(() => {
      fetchProducts();
    }, [fetchProducts]);

    // Callback xem tất cả → reset về tab đầu tiên
    const handleViewAll = useCallback(() => {
      setSearchParams({ tab: defaultTab });
    }, [setSearchParams, defaultTab]);

    return (
      <div className="flex flex-col lg:px-0 my-2">
        <HomeTabbar productType={productType} selectedTab={selectedTab} onTabSelect={handleTabSelect} />

        {loading ? (
          <div className="flex flex-col items-center justify-center py-10 min-h-80 space-y-4 text-center rounded-lg w-full mt-10">
            <Loader2
              className="h-10 w-10 animate-spin text-primary relative z-10"
              style={{ animationDuration: "0.8s" }}
            />
            <span>Đang tải sản phẩm...</span>
          </div>
        ) : products?.length ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5 mt-2">
            {products.map(product => (
              <AnimatePresence key={product._id}>
                <motion.div
                  layout
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <ProductCard key={product._id} product={product} />
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

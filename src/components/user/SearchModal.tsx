"use client";

import React, { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader } from "@/components/user/dialog";
import { Input } from "@/components/user/input";
import { Search, X, Clock, TrendingUp, ShoppingBag } from "lucide-react";
import { getFakeProducts } from "@/constants/fakeData";
import { Product } from "@/types";
import { Link } from "react-router";
import { m, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Suggested searches
  const suggestedSearches = [
    "iPhone 15 Pro Max",
    "MacBook Pro",
    "Samsung Galaxy",
    "AirPods Pro",
    "PlayStation 5",
    "Smart Watch",
    "Gaming Laptop",
    "Wireless Headphones"
  ];

  // Popular categories for suggestions
  const popularCategories = [
    { name: "Smartphones", icon: "📱" },
    { name: "Laptops", icon: "💻" },
    { name: "Headphones", icon: "🎧" },
    { name: "Gaming", icon: "🎮" },
    { name: "Smart Watch", icon: "⌚" },
    { name: "Tablets", icon: "📱" }
  ];

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("recentSearches");
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Search function
  const performSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const allProducts = getFakeProducts();
      const filtered = allProducts.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description?.toLowerCase().includes(query.toLowerCase()) ||
        product.category?.name.toLowerCase().includes(query.toLowerCase()) ||
        product.brand?.name.toLowerCase().includes(query.toLowerCase())
      );
      
      setSearchResults(filtered.slice(0, 8) as Product[]); // Limit to 8 results
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle search input change
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      performSearch(searchQuery);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  // Save search to recent searches
  const saveRecentSearch = (query: string) => {
    if (!query.trim()) return;
    
    const updated = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  };

  // Handle search suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    saveRecentSearch(suggestion);
  };

  // Handle search submit (Enter key)
  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      saveRecentSearch(searchQuery);
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      onClose();
    }
  };

  // Handle product click
  const handleProductClick = (product: Product) => {
    saveRecentSearch(searchQuery);
    onClose();
  };

  // Clear recent searches
  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="!max-w-2xl max-h-[80vh] p-0 overflow-hidden">
        <DialogHeader className="p-0">
          {/* Search Header */}
          <div className="flex items-center gap-3 p-4 border-b border-border">
            <Search className="w-5 h-5 text-foreground" />
            <Input
              ref={inputRef}
              placeholder="Tìm kiếm sản phẩm..."
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
              className="border-0 bg-transparent text-lg focus-visible:ring-0 focus-visible:ring-offset-0"
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === "Enter") {
                  handleSearchSubmit();
                }
              }}
            />
            <button
              onClick={onClose}
              className="p-1 hover:bg-secondary rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </DialogHeader>

        <div className="overflow-y-auto max-h-[calc(80vh-80px)]">
  {/* Search Results */}
  {searchQuery ? (
    <div className="p-4">
      <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
        <ShoppingBag className="w-4 h-4" />
        Kết quả tìm kiếm ({searchResults.length})
      </h3>

      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <div className="w-6 h-6 border-2 border-foreground border-t-transparent rounded-full animate-spin"></div>
          <span className="ml-2 text-foreground">Đang tìm kiếm...</span>
        </div>
      ) : searchResults.length > 0 ? (
        <>
          <AnimatePresence>
            <div className="space-y-2">
              {searchResults.map((product, index) => (
                <m.div
                  key={product._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={`/product/${product.slug?.current || product._id}`}
                    onClick={() => handleProductClick(product)}
                    className="flex items-center gap-3 p-3 hover:bg-secondary rounded-lg transition-colors group"
                  >
                    <div className="w-12 h-12 bg-secondary rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={product.images?.[0]?.asset?.url || "/images/products/product_1.png"}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-foreground truncate group-hover:text-foreground transition-colors">
                        {product.name}
                      </h4>
                      <p className="text-sm text-foreground truncate">
                        {product.category?.name} • {product.brand?.name}
                      </p>
                      <p className="text-sm font-semibold text-foreground">
                        ${product.price}
                      </p>
                    </div>
                  </Link>
                </m.div>
              ))}
            </div>
          </AnimatePresence>

          <div className="mt-4 pt-4 border-t">
            <button
              onClick={handleSearchSubmit}
              className="w-full p-3 text-center bg-foreground hover:bg-foreground/90 text-white rounded-lg transition-colors font-medium"
            >
              Xem tất cả {searchResults.length} kết quả →
            </button>
          </div>
        </>
      ) : (
        <div className="text-center py-8 text-foreground">
          <Search className="w-12 h-12 mx-auto mb-2 text-foreground" />
          <p>Không tìm thấy sản phẩm nào</p>
          <p className="text-sm">Thử tìm kiếm với từ khóa khác</p>
        </div>
      )}
    </div>
  ) : (
    /* Suggestions when no search query */
    <div className="p-4 space-y-6">
      {/* Recent Searches */}
      {recentSearches.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Tìm kiếm gần đây
            </h3>
            <button
              onClick={clearRecentSearches}
              className="text-xs text-foreground hover:underline"
            >
              Xóa tất cả
            </button>
          </div>
          <div className="space-y-1">
            {recentSearches.map((search, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(search)}
                className="flex items-center gap-3 w-full p-2 text-left hover:bg-secondary rounded-lg transition-colors"
              >
                <Clock className="w-4 h-4 text-foreground" />
                <span className="text-foreground">{search}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Popular Categories */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <TrendingUp className="w-4 h-4" />
          Danh mục phổ biến
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {popularCategories.map((category, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(category.name)}
              className="flex items-center gap-3 p-3 text-left hover:bg-secondary rounded-lg transition-colors border border-border"
            >
              <span className="text-xl">{category.icon}</span>
              <span className="text-foreground font-medium">{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Suggested Searches */}
      <div>
          <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <Search className="w-4 h-4" />
          Gợi ý tìm kiếm
        </h3>
        <div className="flex flex-wrap gap-2">
          {suggestedSearches.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="px-3 py-2 text-sm bg-secondary hover:bg-secondary/90 rounded-full transition-colors text-foreground"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      {/* Search Tips */}
      <div className="bg-secondary rounded-lg p-4">
        <h4 className="text-sm font-semibold text-foreground mb-2">💡 Mẹo tìm kiếm</h4>
        <ul className="text-xs text-foreground space-y-1">
          <li>• Tìm theo tên sản phẩm: "iPhone 15"</li>
          <li>• Tìm theo thương hiệu: "Samsung", "Apple"</li>
          <li>• Tìm theo danh mục: "Laptop", "Headphones"</li>
        </ul>
      </div>
    </div>
  )}
</div>

      </DialogContent>
    </Dialog>
  );
};

export default SearchModal;

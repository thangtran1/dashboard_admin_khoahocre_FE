"use client";

import { cn } from "@/lib/utils";
import { m } from "framer-motion";
import { Search, RefreshCw, ShoppingBag, ArrowLeft } from "lucide-react";
import { Button } from "@/components/user/button";
import { Link } from "react-router";

const NoProductAvailable = ({
  selectedTab,
  className,
}: {
  selectedTab?: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-5 min-h-96 space-y-6 text-center rounded-2xl w-full border border-border",
        className
      )}
    >
      {/* Empty state illustration */}
      <m.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="relative"
      >
        <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-4 shadow-lg">
          <Search className="w-16 h-16 text-primary" />
        </div>
        {/* Floating elements */}
        <m.div
          animate={{ y: [-5, 5, -5] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute -top-2 -right-2 w-6 h-6 bg-warning rounded-full opacity-80"
        />
        <m.div
          animate={{ y: [5, -5, 5] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
          className="absolute -bottom-1 -left-3 w-4 h-4 bg-error rounded-full opacity-80"
        />
      </m.div>

      {/* Main message */}
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="space-y-3"
      >
        <h2 className="text-3xl font-bold text-foreground">
          Không Tìm Thấy Sản Phẩm
        </h2>
        <p className="text-foreground max-w-md mx-auto leading-relaxed">
          Rất tiếc, hiện tại không có sản phẩm nào phù hợp với tiêu chí{" "}
          {selectedTab && (
            <span className="font-semibold text-primary bg-primary/10 px-2 py-1 rounded-md">
              "{selectedTab}"
            </span>
          )}{" "}
          của bạn.
        </p>
      </m.div>

      {/* Status indicator */}
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="flex items-center space-x-3 bg-background rounded-full px-6 py-3 shadow-md border"
      >
        <m.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        >
          <RefreshCw className="w-5 h-5 text-success" />
        </m.div>
        <span className="text-success font-medium">
          Chúng tôi đang cập nhật sản phẩm mới
        </span>
      </m.div>

      {/* Suggestions */}
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="space-y-4 w-full max-w-md"
      >
        <p className="text-sm text-foreground mb-4">
          Bạn có thể thử những gợi ý sau:
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Button
            variant="outline"
            className="flex items-center gap-2 h-12 border-2 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300"
            onClick={() => window.location.reload()}
          >
            <RefreshCw className="w-4 h-4" />
            Làm mới trang
          </Button>
          
          <Link to="/shop">
            <Button
              variant="outline"
              className="w-full flex items-center gap-2 h-12 border-2 hover:border-green-300 hover:bg-green-50 transition-all duration-300"
            >
              <ShoppingBag className="w-4 h-4" />
              Xem tất cả
            </Button>
          </Link>
        </div>

        <Link to="/" className="block">
          <Button
            variant="default"
            className="w-full flex items-center gap-2 h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Về trang chủ
          </Button>
        </Link>
      </m.div>

      {/* Additional help */}
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="pt-4 border-t border-border w-full max-w-md"
      >
        <p className="text-xs text-foreground">
          Cần hỗ trợ? Liên hệ với chúng tôi qua{" "}
          <a href="mailto:support@shop.com" className="text-primary hover:underline">
            support@shop.com
          </a>
        </p>
      </m.div>
    </div>
  );
};

export default NoProductAvailable;

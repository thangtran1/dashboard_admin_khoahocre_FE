"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Search, RefreshCw, ShoppingBag } from "lucide-react";

const NoProductAvailable = ({
  className,
}: {
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-5 min-h-96 space-y-6 text-center rounded-2xl w-full border border-border",
        className
      )}
    >
      <div className="flex flex-col items-center justify-center pt-4 text-center">
        <div className="w-28 h-28 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center shadow-md mb-6">
          <Search className="w-14 h-14 text-primary opacity-80" />
        </div>

        <h2 className="text-2xl font-bold text-foreground mb-2">
          Không có sản phẩm
        </h2>

        <p className="text-sm text-muted-foreground max-w-xs leading-relaxed mb-3">
          Rất tiếc, hiện tại không có sản phẩm nào phù hợp với bộ lọc của bạn.
        </p>

        {/* Status indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex items-center space-x-3 bg-background rounded-full px-6 py-3 shadow-md border"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          >
            <RefreshCw className="w-5 h-5 text-success" />
          </motion.div>
          <span className="text-success font-medium">
            Chúng tôi đang cập nhật sản phẩm mới
          </span>
        </motion.div>
        <p className="text-sm text-foreground my-3">
          Bạn có thể thử những gợi ý sau:
        </p>

        <div className="flex items-center gap-3">

          <button
            onClick={() => {
            }}
            className="px-5 cursor-pointer py-2.5 rounded-lg border border-border hover:!bg-primary/10 hover:border-primary transition-all duration-300 flex items-center gap-2 text-sm font-medium"
          >
            <RefreshCw className="w-4 h-4" />
            Làm mới
          </button>

          <button onClick={() => {
          }} className="px-5 cursor-pointer py-2.5 rounded-lg border border-border hover:!bg-primary/10 hover:border-primary transition-all duration-300 flex items-center gap-2 text-sm font-medium">
            <ShoppingBag className="w-4 h-4" />
            Xem tất cả
          </button>
        </div>
      </div>
      {/* Additional help */}
      <div
        className="pt-4 border-t border-border w-full max-w-md"
      >
        <p className="text-xs text-foreground">
          Cần hỗ trợ? Liên hệ với chúng tôi qua{" "}
          <a href="mailto:thangtrandz04@gmail.com" className="text-primary hover:underline">
            thangtrandz04@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default NoProductAvailable;

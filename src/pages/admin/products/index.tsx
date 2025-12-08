import { Icon } from "@/components/icon";
import { CardTitle } from "@/ui/card";
import ProductsManagement from "./components/ProductsManagement";

export default function ProductsPage() {
    return (
        <div className="bg-card text-card-foreground px-6 py-5 flex flex-col gap-4 rounded-xl border shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-3">
                        <div className="p-2.5 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl">
                            <Icon icon="solar:box-bold-duotone" className="h-7 w-7 text-primary" />
                        </div>
                        Quản lý Sản phẩm
                    </CardTitle>
                    <p className="text-muted-foreground mt-2 ml-14">
                        Quản lý toàn bộ sản phẩm trong hệ thống
                    </p>
                </div>
            </div>

            {/* Content */}
            <ProductsManagement />
        </div>
    );
}

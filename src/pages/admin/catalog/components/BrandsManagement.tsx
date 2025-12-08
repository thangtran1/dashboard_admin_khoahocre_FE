import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@/components/icon";
import { Button, Input, Popconfirm, Select } from "antd";
import { Badge } from "@/ui/badge";
import { brandService, type Brand, type CreateBrandDto } from "@/api/services/brands";
import { BrandStatus } from "@/types/enum";
import { toast } from "sonner";
import BrandModal from "./BrandModal";
import { PlusCircleOutlined } from "@ant-design/icons";

const { Option } = Select;
export default function BrandsManagement() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<BrandStatus | "all">("all");
  const [featuredFilter, setFeaturedFilter] = useState<"all" | "featured" | "not-featured">("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 12;

  const fetchBrands = async () => {
    try {
      setLoading(true);
      const response = await brandService.getAllBrands(page, limit, {
        search: searchTerm || undefined,
        status: statusFilter !== "all" ? statusFilter : undefined,
        isFeatured: featuredFilter === "featured" ? true : featuredFilter === "not-featured" ? false : undefined,
      });
      
      if (response.success) {
        setBrands(response.data.data);
        setTotal(response.data.pagination.total);
      }
    } catch (error) {
      console.error("Error fetching brands:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, [page, searchTerm, statusFilter, featuredFilter]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setPage(1);
  };

  const handleStatusFilter = (value: string) => {
    setStatusFilter(value as BrandStatus | "all");
    setPage(1);
  };

  const handleFeaturedFilter = (value: string) => {
    setFeaturedFilter(value as "all" | "featured" | "not-featured");
    setPage(1);
  };

  const handleCreateBrand = () => {
    setEditingBrand(null);
    setModalOpen(true);
  };

  const handleEditBrand = (brand: Brand) => {
    setEditingBrand(brand);
    setModalOpen(true);
  };

  const handleDeleteBrand = async (id: string) => {
    try {
      const response = await brandService.deleteBrand(id);
      if (response.success) {
        toast.success("Xóa thương hiệu thành công");
        fetchBrands();
      }
    } catch (error) {
      console.error("Error deleting brand:", error);
      toast.error("Lỗi khi xóa thương hiệu");
    }
  };

  const handleSaveBrand = async (data: CreateBrandDto) => {
    try {
      if (editingBrand) {
        const response = await brandService.updateBrand(editingBrand._id, data);
        if (response.success) {
          toast.success("Cập nhật thương hiệu thành công");
        }
      } else {
        const response = await brandService.create(data);
        if (response.success) {
          toast.success("Tạo thương hiệu thành công");
        }
      }
      setModalOpen(false);
      fetchBrands();
    } catch (error) {
      console.error("Error saving brand:", error);
    }
  };

  const getStatusColor = (status?: BrandStatus) => {
    switch (status) {
      case BrandStatus.ACTIVE:
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case BrandStatus.INACTIVE:
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  const getStatusText = (status?: BrandStatus) => {
    switch (status) {
      case BrandStatus.ACTIVE:
        return "Hoạt động";
      case BrandStatus.INACTIVE:
        return "Không hoạt động";
      default:
        return "Không xác định";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center"
      >
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            Quản lý Thương hiệu
          </h2>
          <p className="text-muted-foreground mt-1">
            Tổng cộng {total} thương hiệu
          </p>
        </div>
        <Button
          onClick={handleCreateBrand}
          type="primary"
          size="large"
          icon={<PlusCircleOutlined />}
        >
          Thêm thương hiệu
        </Button>
      </motion.div>

      {/* Filters */}
      <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.1 }}
>
  <div className="border rounded-xl p-4">
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
      
      {/* Input tìm kiếm chiếm 2 cột */}
      <div className="col-span-1 sm:col-span-2">
        <label className="block text-sm font-medium mb-2">Tìm kiếm</label>
        <Input
          placeholder="Tìm kiếm thương hiệu..."
          value={searchTerm}
          size="large"
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full border-0 bg-muted focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Select trạng thái */}
      <div className="sm:col-span-1">
        <label className="block text-sm font-medium mb-2">Trạng thái</label>
        <Select
          size="large"
          value={statusFilter}
          onChange={(value) => handleStatusFilter(value)}
          className="w-full"
        >
          <Option value="all">Tất cả trạng thái</Option>
          <Option value={BrandStatus.ACTIVE}>Hoạt động</Option>
          <Option value={BrandStatus.INACTIVE}>Không hoạt động</Option>
        </Select>
      </div>

      {/* Select nổi bật */}
      <div className="sm:col-span-1">
        <label className="block text-sm font-medium mb-2">Nổi bật</label>
        <Select
          size="large"
          value={featuredFilter}
          onChange={(value) => handleFeaturedFilter(value)}
          className="w-full"
        >
          <Option value="all">Tất cả</Option>
          <Option value="featured">Nổi bật</Option>
          <Option value="not-featured">Không nổi bật</Option>
        </Select>
      </div>

    </div>
  </div>
</motion.div>



      {/* Brands Grid */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center gap-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
            <span className="text-slate-600 dark:text-slate-400">Đang tải thương hiệu...</span>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {brands.map((brand, index) => (
              <motion.div
                key={brand._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -5 }}
              >
                <div className="hover:shadow-xl border rounded-xl transition-all duration-300 group overflow-hidden">
                  <div className="relative">
                    {brand.logo && (
                      <div className="h-32 bg-white dark:bg-slate-800 flex items-center justify-center p-4">
                        <img 
                          src={brand.logo} 
                          alt={brand.name}
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                    )}
                    {!brand.logo && (
                      <div className="h-32 bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 flex items-center justify-center">
                        <Icon icon="solar:star-bold-duotone" className="w-12 h-12 text-orange-600 dark:text-orange-400" />
                      </div>
                    )}
                    <div className="absolute top-3 right-3 flex gap-2">
                      <Badge className={getStatusColor(brand.status)}>
                        {getStatusText(brand.status)}
                      </Badge>
                      {brand.isFeatured && (
                        <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                          <Icon icon="solar:star-bold" className="w-3 h-3 mr-1" />
                          Nổi bật
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                          {brand.name}
                        </h3>
                        {brand.description && (
                          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">
                            {brand.description}
                          </p>
                        )}
                        {brand.website && (
                          <a 
                            href={brand.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 dark:text-blue-400 hover:underline mt-1 block"
                          >
                            {brand.website}
                          </a>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                        <span>Sản phẩm: {brand.productCount || 0}</span>
                        <span>#{brand.sortOrder || 0}</span>
                      </div>
                      
                      <div className="flex gap-2 pt-2">
                        <Button
                          onClick={() => handleEditBrand(brand)}
                          variant="outlined"
                          color="primary"
                        >
                          Chỉnh sửa
                        </Button>
                        <Popconfirm
                            title="Bạn có chắc muốn xóa thương hiệu này?"
                            description="Hành động này không thể hoàn tác."
                            okText="Xóa"
                            cancelText="Hủy"
                            okButtonProps={{ danger: true }}
                            onConfirm={() => handleDeleteBrand(brand._id)}
                          >
                            <Button danger>Xóa</Button>
                          </Popconfirm>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Pagination */}
      {total > limit && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center"
        >
          <div className="flex gap-2">
            <Button
              variant="outlined"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="border-0 bg-white dark:bg-slate-800 shadow-lg"
            >
              <Icon icon="solar:arrow-left-bold" className="w-4 h-4" />
            </Button>
            
            <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-lg shadow-lg">
              <span className="text-sm text-slate-600 dark:text-slate-400">
                Trang {page} / {Math.ceil(total / limit)}
              </span>
            </div>
            
            <Button
              variant="outlined"
              onClick={() => setPage(page + 1)}
              disabled={page >= Math.ceil(total / limit)}
              className="border-0 bg-white dark:bg-slate-800 shadow-lg"
            >
              <Icon icon="solar:arrow-right-bold" className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>
      )}

      {/* Brand Modal */}
      <BrandModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveBrand}
        brand={editingBrand}
      />
    </div>
  );
}

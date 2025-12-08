import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@/components/icon";
import { Badge } from "@/ui/badge";
import { categoryService, type Category, type CreateCategoryDto } from "@/api/services/category";
import { CategoryStatus } from "@/types/enum";
import { toast } from "sonner";
import CategoryModal from "./CategoryModal";
import { Button, Input, Popconfirm, Select } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";

const { Option } = Select;
export default function CategoriesManagement() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<CategoryStatus | "all">("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 12;

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await categoryService.getAllCategories(page, limit, {
        search: searchTerm || undefined,
        status: statusFilter !== "all" ? statusFilter : undefined,
      });
      
      if (response.success) {
        setCategories(response.data.data);
        setTotal(response.data.pagination.total);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [page, searchTerm, statusFilter]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setPage(1);
  };

  const handleStatusFilter = (value: string) => {
    setStatusFilter(value as CategoryStatus | "all");
    setPage(1);
  };

  const handleCreateCategory = () => {
    setEditingCategory(null);
    setModalOpen(true);
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setModalOpen(true);
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      const response = await categoryService.deleteCategory(id);
      if (response.success) {
        toast.success("Xóa danh mục thành công");
        fetchCategories();
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Lỗi khi xóa danh mục");
    }
  };

  const handleSaveCategory = async (data: CreateCategoryDto) => {
    try {
      if (editingCategory) {
        const response = await categoryService.updateCategory(editingCategory._id, data);
        if (response.success) {
          toast.success("Cập nhật danh mục thành công");
        }
      } else {
        const response = await categoryService.create(data);
        if (response.success) {
          toast.success("Tạo danh mục thành công");
        }
      }
      setModalOpen(false);
      fetchCategories();
    } catch (error) {
      console.error("Error saving category:", error);
      toast.error("Lỗi khi lưu danh mục");
    }
  };

  const getStatusColor = (status?: CategoryStatus) => {
    switch (status) {
      case CategoryStatus.ACTIVE:
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case CategoryStatus.INACTIVE:
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  const getStatusText = (status?: CategoryStatus) => {
    switch (status) {
      case CategoryStatus.ACTIVE:
        return "Hoạt động";
      case CategoryStatus.INACTIVE:
        return "Không hoạt động";
      default:
        return "Không xác định";
    }
  };

  return (
    <div className="">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center"
      >
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            Quản lý Danh mục
          </h2>
          <p className="text-muted-foreground mt-1">
            Tổng cộng {total} danh mục
          </p>
        </div>

        <Button
                type="primary"
          onClick={handleCreateCategory}
                size="large"
                icon={<PlusCircleOutlined />}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Thêm danh mục
              </Button>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="border rounded-xl p-4 mt-4"
      >
         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
  <div className="col-span-2 relative">
    <label className="block text-sm font-medium mb-2">Tìm kiếm</label>
    <Icon
      icon="solar:magnifer-bold"
      className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400"
    />
    <Input
      placeholder="Tìm kiếm danh mục..."
      value={searchTerm}
      size="large"
      onChange={(e) => handleSearch(e.target.value)}
      className="pl-10 border-0 bg-muted focus:ring-2 focus:ring-primary w-full"
    />
  </div>

  {/* Select trạng thái */}
  <div>
    <label className="block text-sm font-medium mb-2">Trạng thái</label>
    <Select
      size="large"
      placeholder="Lọc theo trạng thái"
      value={statusFilter || undefined}
      onChange={(value) => handleStatusFilter(value)}
      allowClear
      className="w-full"
    >
      <Option value={CategoryStatus.ACTIVE}>Hoạt động</Option>
      <Option value={CategoryStatus.INACTIVE}>Không hoạt động</Option>
    </Select>
  </div>
</div>

      </motion.div>

      {/* Categories Grid */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center gap-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="text-slate-600 dark:text-slate-400">Đang tải danh mục...</span>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 mt-4"
        >
          <AnimatePresence>
            {categories.map((category, index) => (
              <motion.div
                key={category._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -5 }}
              >
                <div className="hover:shadow-xl border rounded-xl transition-all duration-300 group overflow-hidden">
                  <div className="relative">
                    {category.image && (
                      <div className="h-32 bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                        <img 
                          src={category.image} 
                          alt={category.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    {!category.image && (
                      <div className="h-32 bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                        <Icon icon="solar:folder-bold-duotone" className="w-12 h-12 text-primary" />
                      </div>
                    )}
                    <div className="absolute top-3 right-3">
                      <Badge className={getStatusColor(category.status)}>
                        {getStatusText(category.status)}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {category.name}
                        </h3>
                        {category.description && (
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                            {category.description}
                          </p>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>Sản phẩm: {category.productCount || 0}</span>
                        <span>#{category.sortOrder || 0}</span>
                      </div>
                      
                      <div className="flex gap-2 pt-2">
                        <Button
                          onClick={() => handleEditCategory(category)}
                          variant="outlined"
                          color="primary"
                        >
                          Chỉnh sửa
                        </Button>
                          <Popconfirm
                            title="Bạn có chắc muốn xóa danh mục này?"
                            description="Hành động này không thể hoàn tác."
                            okText="Xóa"
                            cancelText="Hủy"
                            okButtonProps={{ danger: true }}
                            onConfirm={() => handleDeleteCategory(category._id)}
                          >
                            <Button danger  >Xóa</Button>
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

      {/* Category Modal */}
      <CategoryModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveCategory}
        category={editingCategory}
      />
    </div>
  );
}

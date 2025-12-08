import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Label } from "@/ui/label";
import { Button, Input, Select } from "antd";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/ui/dialog";
import { type Category, type CreateCategoryDto } from "@/api/services/category";
import { CategoryStatus } from "@/types/enum";
import { Textarea } from "@/ui/textarea";
const { Option } = Select;

interface CategoryModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: CreateCategoryDto) => void;
  category?: Category | null;
}

export default function CategoryModal({ open, onClose, onSave, category }: CategoryModalProps) {
  const [formData, setFormData] = useState<CreateCategoryDto>({
    name: "",
    slug: "",
    description: "",
    image: "",
    status: CategoryStatus.ACTIVE,
    sortOrder: 0,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        slug: category.slug || "",
        description: category.description || "",
        image: category.image || "",
        status: category.status || CategoryStatus.ACTIVE,
        sortOrder: category.sortOrder || 0,
      });
    } else {
      setFormData({
        name: "",
        slug: "",
        description: "",
        image: "",
        status: CategoryStatus.ACTIVE,
        sortOrder: 0,
      });
    }
  }, [category, open]);

  const handleInputChange = (field: keyof CreateCategoryDto, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Auto-generate slug from name
    if (field === 'name' && typeof value === 'string') {
      const slug = value
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      
      setFormData(prev => ({
        ...prev,
        slug
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await onSave(formData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="!max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl text-foreground">
            {category ? "Chỉnh sửa danh mục" : "Thêm danh mục mới"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-foreground">
                  Tên danh mục *
                </Label>
                <Input
                  size="large"
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Nhập tên danh mục"
                  className="border-0 bg-muted focus:ring-2 focus:ring-primary w-full"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug" className="text-sm font-medium text-foreground">
                  Slug
                </Label>
                <Input
                  size="large"
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => handleInputChange('slug', e.target.value)}
                  placeholder="duong-dan-url"
                  className="border-0 bg-muted focus:ring-2 focus:ring-primary w-full"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium text-foreground">
                Mô tả
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Nhập mô tả cho danh mục"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image" className="text-sm font-medium text-foreground">
                Hình ảnh (URL)
              </Label>
              <Input
                size="large"
                id="image"
                value={formData.image}
                onChange={(e) => handleInputChange('image', e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="border-0 bg-muted focus:ring-2 focus:ring-primary w-full"
              />
              {formData.image && (
                <div className="mt-2">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-lg border-2 border-border p-2"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>
          </motion.div>

          {/* Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-foreground">
              Cài đặt
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="status" className="text-sm font-medium text-foreground">
                  Trạng thái
                </Label>
                <Select
                  size="large"
                  placeholder="Trạng thái"
                  value={formData.status || undefined}
                  onChange={(value) => handleInputChange('status', value as CategoryStatus)}
                  className="w-full"
                  getPopupContainer={(trigger) => trigger.parentElement!}
                >
                  <Option value={CategoryStatus.ACTIVE}>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        Hoạt động
                      </div>
                    </Option>
                    <Option value={CategoryStatus.INACTIVE}>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        Không hoạt động
                      </div>
                    </Option>
                  </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sortOrder" className="text-sm font-medium text-foreground">
                  Thứ tự sắp xếp
                </Label>
                <Input
                  size="large"
                    id="sortOrder"
                  type="number"
                  value={formData.sortOrder}
                  onChange={(e) => handleInputChange('sortOrder', parseInt(e.target.value) || 0)}
                  placeholder="0"
                  className="border-0 bg-muted focus:ring-2 focus:ring-primary w-full"
                />
              </div>
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex gap-3 pt-6 border-t border-border"
          >
            <Button
              size="large"
              onClick={onClose}
              className="flex-1"
              disabled={loading}
              danger
            >
              Hủy
            </Button>
            <Button
              color="primary"
              variant="outlined"
              htmlType="submit"
              size="large"
              className="flex-1"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                  Đang lưu...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  {category ? "Cập nhật" : "Tạo mới"}
                </div>
              )}
            </Button>
          </motion.div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

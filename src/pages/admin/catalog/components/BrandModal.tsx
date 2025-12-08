import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button, Input } from "antd";
import { Label } from "@/ui/label";
import { Textarea } from "@/ui/textarea";
import { Select } from "antd";
import { Switch } from "@/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/ui/dialog";
import { type Brand, type CreateBrandDto } from "@/api/services/brands";
import { BrandStatus } from "@/types/enum";
const { Option } = Select;

interface BrandModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: CreateBrandDto) => void;
  brand?: Brand | null;
}

export default function BrandModal({ open, onClose, onSave, brand }: BrandModalProps) {
  const [formData, setFormData] = useState<CreateBrandDto>({
    name: "",
    slug: "",
    description: "",
    logo: "",
    website: "",
    status: BrandStatus.ACTIVE,
    sortOrder: 0,
    isFeatured: false,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (brand) {
      setFormData({
        name: brand.name,
        slug: brand.slug || "",
        description: brand.description || "",
        logo: brand.logo || "",
        website: brand.website || "",
        status: brand.status || BrandStatus.ACTIVE,
        sortOrder: brand.sortOrder || 0,
        isFeatured: brand.isFeatured || false,
      });
    } else {
      setFormData({
        name: "",
        slug: "",
        description: "",
        logo: "",
        website: "",
        status: BrandStatus.ACTIVE,
        sortOrder: 0,
        isFeatured: false,
      });
    }
  }, [brand, open]);

  const handleInputChange = (field: keyof CreateBrandDto, value: string | number | boolean) => {
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
            {brand ? "Chỉnh sửa thương hiệu" : "Thêm thương hiệu mới"}
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
                  Tên thương hiệu *
                </Label>
                <Input
                  size="large"
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Nhập tên thương hiệu"
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
                placeholder="Nhập mô tả cho thương hiệu"
                rows={4}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="logo" className="text-sm font-medium text-foreground">
                  Logo (URL)
                </Label>
                <Input
                  size="large"
                    id="logo"
                  value={formData.logo}
                  onChange={(e) => handleInputChange('logo', e.target.value)}
                  placeholder="https://example.com/logo.jpg"
                  className="border-0 bg-muted focus:ring-2 focus:ring-primary w-full"
                />
                {formData.logo && (
                  <div className="mt-2">
                    <img
                      src={formData.logo}
                      alt="Logo Preview"
                      className="w-32 h-20 object-contain bg-muted rounded-lg border-2 border-border p-2"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="website" className="text-sm font-medium text-foreground">
                  Website
                </Label>
                <Input
                  size="large"
                  id="website"
                  value={formData.website || undefined}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  placeholder="https://example.com"
                  className="border-0 bg-muted focus:ring-2 focus:ring-primary w-full"
                />
              </div>
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
            onChange={(value) => handleInputChange('status', value as BrandStatus)}
            className="w-full"
            getPopupContainer={(trigger) => trigger.parentElement!}
          >
            <Option value={BrandStatus.ACTIVE}>Hoạt động</Option>
            <Option value={BrandStatus.INACTIVE}>Không hoạt động</Option>
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

            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="space-y-1">
                <Label className="text-sm font-medium text-foreground">
                  Thương hiệu nổi bật
                </Label>
                <p className="text-xs text-muted-foreground">
                  Hiển thị thương hiệu này trong danh sách nổi bật
                </p>
              </div>
              <Switch
                checked={formData.isFeatured}
                onCheckedChange={(checked) => handleInputChange('isFeatured', checked)}
              />
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
            danger
            size="large"
              onClick={onClose}
              disabled={loading}
              className="flex-1"
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
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Đang lưu...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  {brand ? "Cập nhật" : "Tạo mới"}
                </div>
              )}
            </Button>
          </motion.div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

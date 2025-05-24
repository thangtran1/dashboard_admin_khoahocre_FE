"use client";

import { useState, useEffect } from "react";
import { Table, Input } from "antd";
import { toast } from "sonner";
import { Button, useDisclosure } from "@heroui/react";
import { Trash2, Pencil, Plus } from "lucide-react";
import {
  ALIGN_CENTER,
  buttonCancel,
  buttonConfirm,
  inputClass,
} from "@/utils/use-always";
import categoryApi from "@/api/services/categoryApi";
import ModalCreateEditCategory from "./modal-create-edit";
import ModalDeleteCategory from "./modal-delete";
import dayjs from "dayjs";

export default function CategoryPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<any | null>(null);
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [editName, setEditName] = useState("");
  const [editCode, setEditCode] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onClose: onDeleteModalClose,
  } = useDisclosure();

  const {
    isOpen: isEditModalOpen,
    onOpen: onEditModalOpen,
    onClose: onEditModalClose,
  } = useDisclosure();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await categoryApi.getCategories();
        setCategories(res.data.data);
      } catch {
        toast.error("Failed to load categories", { closeButton: true });
      }
    };

    fetchData();
  }, []);

  const createCategory = async (code: string, name: string) => {
    try {
      const res = await categoryApi.createCategory({ code, name });
      setCategories((prev) => [...prev, res.data.category]);
      toast.success("Category created", {
        closeButton: true,
      });
    } catch (e) {
      throw new e();
    }
  };

  const updateCategory = async (oldCode: string) => {
    try {
      const res = await categoryApi.updateCategory(oldCode, {
        code: editCode,
        name: editName,
      });
      const updated = res.data.category;

      setCategories((prev) =>
        prev.map((cat) => (cat.code === oldCode ? updated : cat))
      );
      toast.success("Category updated", {
        closeButton: true,
      });
    } catch (err) {
      throw new err();
    }
  };

  const handleSaveCategory = async () => {
    if (!editName.trim() || !editCode.trim()) {
      toast.error("Code and name are required", {
        closeButton: true,
      });
      return;
    }

    if (mode === "create") {
      await createCategory(editCode, editName);
    } else if (mode === "edit" && selectedCategory?.code) {
      await updateCategory(selectedCategory.code);
    }
    onEditModalClose();
  };

  const handleDeleteConfirm = async () => {
    if (!selectedCategory) {
      toast.error("No category selected", { closeButton: true });
      return;
    }

    try {
      await categoryApi.deleteCategory(selectedCategory.code);
      setCategories((prev) =>
        prev.filter((cat) => cat.code !== selectedCategory.code)
      );
      toast.success("Category deleted", {
        closeButton: true,
      });
      onDeleteModalClose();
    } catch (e) {
      throw new e();
    }
  };

  const filteredCategories = categories.filter(
    (cat) =>
      cat?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat?.code?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { title: "ID", dataIndex: "id" },
    { title: "Code", dataIndex: "code" },
    { title: "Name", dataIndex: "name" },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (value: string) => dayjs(value).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      render: (value: string) => dayjs(value).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "Actions",
      align: ALIGN_CENTER,
      render: (_: unknown, record: any) => (
        <div className="flex justify-center gap-1">
          <Button
            className={buttonConfirm}
            size="sm"
            onPress={() => {
              setMode("edit");
              setSelectedCategory(record);
              setEditName(record.name);
              setEditCode(record.code);
              onEditModalOpen();
            }}
          >
            <Pencil size={16} />
            Edit
          </Button>
          <Button
            className={buttonCancel}
            variant="light"
            size="sm"
            onPress={() => {
              setSelectedCategory(record);
              onDeleteModalOpen();
            }}
          >
            <Trash2 size={16} />
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">
            Manage Categories
          </h2>
          <p className="text-sm text-muted-foreground">
            Create, update, and delete category data
          </p>
        </div>
        <Button
          className={buttonConfirm}
          onPress={() => {
            setMode("create");
            setSelectedCategory(null);
            setEditName("");
            setEditCode("");
            onEditModalOpen();
          }}
        >
          <Plus size={16} className="mr-1" />
          Create New
        </Button>
      </div>

      <div>
        <Input
          placeholder="Search by code or name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={inputClass}
        />
      </div>

      <div className="overflow-auto">
        <Table
          dataSource={filteredCategories}
          columns={columns}
          rowKey="id"
          className="min-w-[700px]"
          bordered
          pagination={{ pageSize: 8 }}
        />
      </div>

      {(isEditModalOpen || isDeleteModalOpen) && (
        <div className="fixed inset-0 bg-black/50 z-40" />
      )}

      <ModalCreateEditCategory
        isOpen={isEditModalOpen}
        onClose={onEditModalClose}
        mode={mode}
        editName={editName}
        setEditName={setEditName}
        editCode={editCode}
        setEditCode={setEditCode}
        handleSave={handleSaveCategory}
      />

      <ModalDeleteCategory
        isOpen={isDeleteModalOpen}
        onClose={onDeleteModalClose}
        category={selectedCategory}
        handleDelete={handleDeleteConfirm}
      />
    </div>
  );
}

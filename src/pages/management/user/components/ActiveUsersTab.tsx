import { useState } from "react";
import { Button } from "antd";
import {
  User,
  CreateUserReq,
  UpdateUserReq,
} from "@/api/services/userManagementApi";
import { PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import { useUserManagement } from "../hooks/useUserManagement";
import UserFilters from "./userFilters";
import UserTable from "./userTable";
import UserEditModal from "./userEditModal";

export default function ActiveUsersTab() {
  const { t } = useTranslation();
  const {
    users,
    loading,
    selectedUsers,
    filters,
    pagination,
    handleCreate,
    handleUpdateUser,
    handleSoftDelete,
    handleUpdateRole,
    handleUpdateStatus,
    handleDeleteMany,
    handleFilterChange,
    handlePageChange,
    handleSelectUser,
    handleSelectAll,
    handleClearFilters,
    refreshData,
  } = useUserManagement(false); // false = active users

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  // ========== MODAL HANDLERS ==========

  const handleOpenCreateModal = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const handleSubmit = async (values: CreateUserReq | UpdateUserReq) => {
    let success = false;
    if (editingUser) {
      success = await handleUpdateUser(editingUser.id, values as UpdateUserReq);
    } else {
      success = await handleCreate(values as CreateUserReq);
    }

    if (success) {
      handleCloseModal();
    }

    return success;
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex gap-3 justify-end">
        <Button
          color="cyan"
          variant="outlined"
          icon={<ReloadOutlined />}
          onClick={refreshData}
          size="large"
          loading={loading}
        >
          {t("sys.user-management.refresh")}
        </Button>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleOpenCreateModal}
          size="large"
        >
          {t("sys.user-management.add-user")}
        </Button>
      </div>

      {/* Filters */}
      <UserFilters
        filters={filters}
        selectedUsers={selectedUsers}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        onDeleteMany={() => handleDeleteMany(selectedUsers as string[])}
      />

      {/* User Table */}
      <UserTable
        users={users}
        loading={loading}
        selectedUsers={selectedUsers}
        pagination={pagination}
        onSelectUser={handleSelectUser}
        onSelectAll={handleSelectAll}
        onEdit={handleEdit}
        onDelete={handleSoftDelete}
        onUpdateRole={handleUpdateRole}
        onUpdateStatus={handleUpdateStatus}
        onPageChange={handlePageChange}
      />

      {/* Modal */}
      <UserEditModal
        isOpen={isModalOpen}
        editingUser={editingUser}
        loading={loading}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

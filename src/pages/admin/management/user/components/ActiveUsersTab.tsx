import { useState } from "react";
import { User, UpdateUserReq } from "@/api/services/userManagementApi";

import { useUserManagement } from "../hooks/useUserManagement";
import CommonUserFilters from "./CommonUserFilters";
import UserActionBar from "./UserActionBar";
import UserTable from "./userTable";
import UserEditModal from "./userEditModal";

export default function ActiveUsersTab() {
  const {
    users,
    loading,
    selectedUsers,
    filters,
    pagination,
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
  } = useUserManagement(false); // false = active users

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  // ========== MODAL HANDLERS ==========

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const handleSubmit = async (values: UpdateUserReq) => {
    const success = await handleUpdateUser(editingUser!.id, values);
    if (success) {
      handleCloseModal();
    }
    return success;
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <CommonUserFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
      />

      {/* Action Bar */}
      <UserActionBar
        selectedUsers={selectedUsers}
        tabType="active"
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
      {editingUser && (
        <UserEditModal
          isOpen={isModalOpen}
          editingUser={editingUser}
          loading={loading}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}

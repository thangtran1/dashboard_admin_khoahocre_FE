import { Button } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import { useUserManagement } from "../hooks/useUserManagement";
import DeletedUserFilters from "./DeletedUserFilters";
import DeletedUserTable from "./DeletedUserTable";

export default function DeletedUsersTab() {
  const { t } = useTranslation();
  const {
    users,
    loading,
    selectedUsers,
    filters,
    pagination,
    handleDelete,
    handleRestore,
    handleDeleteMany,
    handleRestoreMany,
    handleFilterChange,
    handlePageChange,
    handleSelectUser,
    handleSelectAll,
    handleClearFilters,
    refreshData,
  } = useUserManagement(true); // true = deleted users

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
      </div>

      {/* Filters */}
      <DeletedUserFilters
        filters={filters}
        selectedUsers={selectedUsers}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        onRestoreMany={() => handleRestoreMany(selectedUsers as string[])}
        onDeleteMany={() => handleDeleteMany(selectedUsers as string[])}
      />

      {/* Deleted User Table */}
      <DeletedUserTable
        users={users}
        loading={loading}
        selectedUsers={selectedUsers}
        pagination={pagination}
        onSelectUser={handleSelectUser}
        onSelectAll={handleSelectAll}
        onRestore={handleRestore}
        onDelete={handleDelete}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

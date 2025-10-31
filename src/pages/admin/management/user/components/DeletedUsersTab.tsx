import { useUserManagement } from "../hooks/useUserManagement";
import CommonUserFilters from "./CommonUserFilters";
import UserActionBar from "./UserActionBar";
import DeletedUserTable from "./DeletedUserTable";

export default function DeletedUsersTab() {
  const {
    users,
    loading,
    selectedUsers,
    filters,
    pagination,
    handleRestore,
    handleDeleteMany,
    handleFilterChange,
    handlePageChange,
    handleSelectUser,
    handleSelectAll,
    handleClearFilters,
  } = useUserManagement(true); // true = deleted users

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
        tabType="deleted"
        onDeleteMany={() => handleDeleteMany(selectedUsers)}
        onRestore={handleRestore}
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
        onDelete={handleDeleteMany}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

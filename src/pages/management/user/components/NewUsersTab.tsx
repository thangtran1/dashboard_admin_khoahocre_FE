import { useUserManagement } from "../hooks/useUserManagement";
import CommonUserFilters from "./CommonUserFilters";
import UserActionBar from "./UserActionBar";
import NewUserTable from "./NewUserTable";

export default function NewUsersTab() {
  const {
    users,
    loading,
    selectedUsers,
    filters,
    pagination,
    handleSoftDelete,
    handleDeleteMany,
    handleFilterChange,
    handlePageChange,
    handleSelectUser,
    handleSelectAll,
    handleClearFilters,
  } = useUserManagement(false, true); // false = not deleted, true = new users

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
        tabType="new"
        onDeleteMany={() => handleDeleteMany(selectedUsers as string[])}
      />

      {/* New User Table */}
      <NewUserTable
        users={users}
        loading={loading}
        selectedUsers={selectedUsers}
        pagination={pagination}
        onSelectUser={handleSelectUser}
        onSelectAll={handleSelectAll}
        onDelete={handleSoftDelete}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

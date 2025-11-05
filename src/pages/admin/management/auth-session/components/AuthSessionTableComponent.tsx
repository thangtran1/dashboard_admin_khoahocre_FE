import { useUserManagement } from "../hooks/useUserManagement";
import FilterSession from "./filter-session";
import AuthSessionTable from "./AuthSessionTable";

export default function AuthSessionTableComponent() {
  const {
    users,
    loading,
    filters,
    pagination,
    handleFilterChange,
    handlePageChange,
    handleClearFilters,
  } = useUserManagement();

  return (
    <div className="space-y-6">
      <FilterSession
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
      />

      <AuthSessionTable
        users={users}
        loading={loading}
        pagination={pagination}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

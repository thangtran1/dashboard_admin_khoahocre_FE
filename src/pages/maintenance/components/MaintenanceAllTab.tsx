import { useState } from "react";
import { Maintenance } from "@/api/services/maintenanceApi";

import { useMaintence } from "../hooks/useMaintence";
import MaintenanceActionBar from "./MaintenanceActionBar";
import MaintenanceTable from "./MaintenanceTable";
import CommonMaintenanceFilters from "./CommonMaintenanceFilters";
import MaintenanceDetailModal from "./MaintenanceDetailModal";

export default function MaintenanceAllTab() {
  const {
    maintenances,
    loading,
    selectedMaintenances,
    filters,
    pagination,
    handleDelete,
    handleStartNow,
    handleStop,
    handleCancel,
    handleDeleteMany,
    handleFilterChange,
    handlePageChange,
    handleSelectMaintenance,
    handleSelectAll,
    handleClearFilters,
  } = useMaintence(false); // false = all maintenances

  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedMaintenance, setSelectedMaintenance] = useState<Maintenance | null>(null);

  // ========== MODAL HANDLERS ==========

  const handleDetail = (maintenance: Maintenance) => {
    setSelectedMaintenance(maintenance);
    setIsDetailModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedMaintenance(null);
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <CommonMaintenanceFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
      />

      {/* Action Bar */}
      <MaintenanceActionBar
        selectedMaintenances={selectedMaintenances}
        tabType="all"
        onDeleteMany={() => handleDeleteMany(selectedMaintenances)}
      />

      {/* Maintenance Table */}
      <MaintenanceTable
        maintenances={maintenances}
        loading={loading}
        selectedMaintenances={selectedMaintenances}
        pagination={pagination}
        onSelectMaintenance={handleSelectMaintenance}
        onSelectAll={handleSelectAll}
        onDetail={handleDetail}
        onDelete={handleDelete}
        onStartNow={handleStartNow}
        onStop={handleStop}
        onCancel={handleCancel}
        onPageChange={handlePageChange}
      />

      {/* Detail Modal */}
      <MaintenanceDetailModal
        isOpen={isDetailModalOpen}
        maintenance={selectedMaintenance}
        onClose={handleCloseDetailModal}
      />
    </div>
  );
}

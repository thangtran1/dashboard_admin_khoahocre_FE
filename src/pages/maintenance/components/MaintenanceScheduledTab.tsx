import { useState } from "react";
import { Maintenance } from "@/api/services/maintenanceApi";

import { useMaintence } from "../hooks/useMaintence";
import CommonMaintenanceFilters from "./CommonMaintenanceFilters";
import MaintenanceScheduledTable from "./MaintenanceScheduledTable";
import MaintenanceActionBar from "./MaintenanceActionBar";
import MaintenanceDetailModal from "./MaintenanceDetailModal";

export default function MaintenanceScheduledTab() {
  const {
    maintenances,
    loading,
    selectedMaintenances,
    filters,
    pagination,
    handleStartNow,
    handleCancel,
    handleDeleteMany,
    handleFilterChange,
    handlePageChange,
    handleSelectMaintenance,
    handleSelectAll,
    handleClearFilters,
  } = useMaintence(true); // true = scheduled only

  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedMaintenance, setSelectedMaintenance] = useState<Maintenance | null>(null);

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
      <CommonMaintenanceFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
      />

      <MaintenanceActionBar
        selectedMaintenances={selectedMaintenances}
        tabType="scheduled"
        onDeleteMany={() => handleDeleteMany(selectedMaintenances)}
      />

      <MaintenanceScheduledTable
        maintenances={maintenances}
        loading={loading}
        selectedMaintenances={selectedMaintenances}
        pagination={pagination}
        onSelectMaintenance={handleSelectMaintenance}
        onSelectAll={handleSelectAll}
        onDetail={handleDetail}
        onStartNow={handleStartNow}
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

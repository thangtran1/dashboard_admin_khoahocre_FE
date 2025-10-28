import { ReactNode, useEffect, useState } from "react";
import maintenanceApi from "@/api/services/maintenanceApi";
import LoadingMaintenance from "@/components/admin/loading-maintenance";

interface MaintenanceGuardProps {
  children: ReactNode;
  redirectUrl: string;
  delayMs?: number;
}

const MaintenanceGuard = ({
  children,
  redirectUrl,
  delayMs = 1000,
}: MaintenanceGuardProps) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkMaintenance = async () => {
      try {
        const response = await maintenanceApi.getCurrentStatus();
        const isUnderMaintenance = response.data.data.isUnderMaintenance;

        setTimeout(() => {
          if (isUnderMaintenance) {
            window.location.href = redirectUrl;
          } else {
            setLoading(false);
          }
        }, delayMs);
      } catch (err) {
        setTimeout(() => setLoading(false), delayMs);
      }
    };

    checkMaintenance();
  }, [redirectUrl, delayMs]);

  if (loading) {
    return <LoadingMaintenance />;
  }

  return <>{children}</>;
};

export default MaintenanceGuard;

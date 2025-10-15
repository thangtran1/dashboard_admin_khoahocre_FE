import { Card, CardContent } from "@/ui/card";
import { Icon } from "@/components/icon";
import { useTranslation } from "react-i18next";

interface DatabaseInfo {
  dbName: string;
  collectionsCount: number;
  dataSize: string;
  storageSize: string;
  indexes: number;
  timestamp: string;
  collections: string[];
}

interface StatItem {
  title: string;
  value: string | number;
  color: string;
  icon: string;
  isArray?: boolean;
}

export default function DatabaseInfoCard({
  dbInfo,
}: {
  dbInfo: DatabaseInfo | null;
}) {
  const { t } = useTranslation();
  if (!dbInfo) return null;

  const stats: StatItem[] = [
    {
      title: t("sys.database.collections-count"),
      value: dbInfo.collectionsCount,
      color: "blue",
      icon: "lucide:database",
    },
    {
      title: t("sys.database.data-size"),
      value: dbInfo.dataSize,
      color: "green",
      icon: "lucide:server",
    },
    {
      title: t("sys.database.storage-size"),
      value: dbInfo.storageSize,
      color: "red",
      icon: "lucide:hard-drive",
    },
    {
      title: t("sys.database.indexes"),
      value: dbInfo.indexes,
      color: "purple",
      icon: "lucide:hash",
    },
  ];

  // Helper: ánh xạ màu sắc Tailwind an toàn
  const colorMap: Record<string, string> = {
    blue: "from-blue-50 to-blue-100 border-blue-200 text-blue-800",
    green: "from-green-50 to-green-100 border-green-200 text-green-800",
    red: "from-red-50 to-red-100 border-red-200 text-red-800",
    purple: "from-purple-50 to-purple-100 border-purple-200 text-purple-800",
    teal: "from-teal-50 to-teal-100 border-teal-200 text-teal-800",
  };

  return (
    <div className="space-y-6">
      {/* Thông tin tổng quan */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card
            key={stat.title}
            className={`bg-gradient-to-br ${
              colorMap[stat.color]
            } border rounded-2xl`}
          >
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium opacity-80">{stat.title}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
              <div
                className={`p-3 bg-white/70 rounded-full border border-muted`}
              >
                <Icon
                  icon={stat.icon}
                  className={`h-6 w-6 text-${stat.color}-600`}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Danh sách collections */}

      <Card
        key={t("sys.database.collections")}
        className={`bg-gradient-to-br ${colorMap["teal"]} border rounded-2xl`}
      >
        <CardContent className="px-4 flex items-center justify-between">
          <div>
            <p className="text-base font-bold opacity-80">
              {t("sys.database.collections")}
            </p>
            <p className="text-base mt-1">{dbInfo.collections.join(", ")}</p>
          </div>
          <div className={`p-3 bg-white/70 rounded-full border border-muted`}>
            <Icon icon="lucide:list" className={`h-6 w-6 text-teal-600`} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

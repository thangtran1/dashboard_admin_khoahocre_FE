import { Select } from "antd";
import { Icon } from "@/components/icon";
import { useTranslation } from "react-i18next";
import { Separator } from "@/ui/separator";

export type CreateMethod = "single" | "bulk";

interface CreateMethodSelectorProps {
  value: CreateMethod;
  onChange: (method: CreateMethod) => void;
}

export default function CreateMethodSelector({
  value,
  onChange,
}: CreateMethodSelectorProps) {
  const { t } = useTranslation();

  const options = [
    {
      label: (
        <div className="flex items-center gap-2">
          <Icon icon="lucide:user-plus" className="h-5 w-5 text-blue-600" />
          {t("management.user.single-create")}
        </div>
      ),
      value: "single",
    },
    {
      label: (
        <div className="flex items-center gap-2">
          <Icon icon="lucide:upload" className="h-5 w-5 text-green-600" />
          {t("management.user.bulk-create")}
        </div>
      ),
      value: "bulk",
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <Icon icon="lucide:settings" className="h-5 w-5 text-primary" />
        {t("management.user.create-method")}
      </h3>

      <div className="flex gap-4">
        <Select
          size="large"
          value={value}
          onChange={(val) => onChange(val as CreateMethod)}
          options={options}
          className="w-1/2"
        />
      </div>

      <Separator className="my-6" />
    </div>
  );
}

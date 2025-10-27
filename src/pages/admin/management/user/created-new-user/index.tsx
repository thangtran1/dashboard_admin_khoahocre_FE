import { Card, Typography, Breadcrumb } from "antd";
import { Icon } from "@/components/icon";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Separator } from "@/ui/separator";

import CreateMethodSelector, {
  CreateMethod,
} from "./components/CreateMethodSelector";
import SingleCreateForm from "./components/SingleCreateForm";
import BulkCreateForm from "./components/BulkCreateForm";

const { Title } = Typography;

export default function CreatedNewUser() {
  const { t } = useTranslation();
  const [createMethod, setCreateMethod] = useState<CreateMethod>("single");

  return (
    <Card className="!bg-background">
      <Breadcrumb style={{ marginBottom: "8px" }}>
        <Breadcrumb.Item>
          <Link to="/management/user">{t("sys.user-management.title")}</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          {t("sys.user-management.create-new-user")}
        </Breadcrumb.Item>
      </Breadcrumb>

      <Title level={3}>
        <Icon icon="lucide:user-plus" className="h-6 w-6 text-primary mr-2" />
        {t("sys.user-management.create-new-user")}
      </Title>

      <Separator className="my-4" />

      <CreateMethodSelector value={createMethod} onChange={setCreateMethod} />

      {createMethod === "single" ? <SingleCreateForm /> : <BulkCreateForm />}
    </Card>
  );
}

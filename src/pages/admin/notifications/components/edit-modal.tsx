import { Button, Form, Input, Modal, Select, Space } from "antd";
import { Notification } from "@/types/entity";
import { useTranslation } from "react-i18next";
import { Icon } from "@/components/icon";
import { useEffect } from "react";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (values: Notification) => void;
  notification: Notification | null;
}

export default function EditModal({
  isOpen,
  onClose,
  onUpdate,
  notification,
}: EditModalProps) {
  const [editForm] = Form.useForm<Notification>();
  const { t } = useTranslation();
  useEffect(() => {
    if (notification) {
      editForm.setFieldsValue(notification);
    }
  }, [notification, editForm]);
  return (
    <Modal
      title={
        <div className="flex items-center gap-2">
          <Icon icon="lucide:edit" className="h-5 w-5 text-blue-600" />
          {t("sys.notification.edit-notification")}
        </div>
      }
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={600}
    >
      <Form form={editForm} layout="vertical" onFinish={onUpdate}>
        <Form.Item
          name="title"
          label={t("sys.notification.title")}
          rules={[
            {
              required: true,
              message: t("sys.notification.title-required"),
            },
            { max: 100, message: t("sys.notification.title-max") },
          ]}
        >
          <Input placeholder={t("sys.notification.title-placeholder")} />
        </Form.Item>

        <Form.Item
          name="content"
          label={t("sys.notification.content")}
          rules={[
            {
              required: true,
              message: t("sys.notification.content-required"),
            },
            { max: 2000, message: t("sys.notification.content-max") },
          ]}
        >
          <Input.TextArea
            placeholder={t("sys.notification.content-placeholder")}
            rows={3}
            maxLength={2000}
            showCount
          />
        </Form.Item>

        <Form.Item
          name="type"
          label={t("sys.notification.type")}
          rules={[
            {
              required: true,
              message: t("sys.notification.type-required"),
            },
          ]}
        >
          <Select
            placeholder={t("sys.notification.type-placeholder")}
            options={[
              { value: "system", label: t("sys.notification.system") },
              {
                value: "promotion",
                label: t("sys.notification.promotion"),
              },
              {
                value: "maintenance",
                label: t("sys.notification.maintenance"),
              },
              { value: "update", label: t("sys.notification.update") },
            ]}
          />
        </Form.Item>

        <Form.Item style={{ marginBottom: 0, textAlign: "right" }}>
          <Space>
            <Button size="large" danger onClick={onClose}>
              {t("sys.notification.cancel")}
            </Button>
            <Button
              size="large"
              color="primary"
              variant="outlined"
              htmlType="submit"
            >
              {t("sys.notification.update")}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
}

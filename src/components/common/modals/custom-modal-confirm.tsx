import { Button, Modal } from "antd";
import { useTranslation } from "react-i18next";

interface CustomConfirmModalProps {
  visible: boolean;
  password?: string;
  filename?: string | null;
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  description: string;
}

export default function CustomConfirmModal({
  visible,
  password,
  filename,
  onConfirm,
  onCancel,
  title,
  description,
}: CustomConfirmModalProps) {
  const { t } = useTranslation();
  return (
    <Modal
      centered
      open={visible}
      title={<div className="text-center text-xl font-bold">{title}</div>}
      onOk={onConfirm}
      onCancel={onCancel}
      footer={
        <div className="flex justify-center gap-4">
          <Button danger size="large" onClick={onCancel}>
            {t("sys.modal-confirm.cancel")}
          </Button>
          <Button
            color="primary"
            variant="outlined"
            size="large"
            onClick={onConfirm}
          >
            {t("sys.modal-confirm.confirm")}
          </Button>
        </div>
      }
    >
      <div className="text-center">
        <p>{description}</p>
        {password && (
          <p>
            <span className="font-bold">
              {t("sys.modal-confirm.new-password")}:
            </span>{" "}
            {password}
          </p>
        )}
        {filename && (
          <p>
            <span className="font-bold">{t("sys.database.filename")}:</span>{" "}
            {filename}
          </p>
        )}
      </div>
    </Modal>
  );
}

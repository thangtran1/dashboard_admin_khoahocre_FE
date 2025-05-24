import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import { buttonCancel, buttonConfirm, inputClass } from "@/utils/use-always";
import { X } from "lucide-react";

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "create" | "edit";
  email: string;
  setEmail: (val: string) => void;
  name: string;
  setName: (val: string) => void;
  role: string;
  setRole: (val: string) => void;
  password?: string;
  setPassword?: (val: string) => void;
  handleSave: () => void;
}

export default function ModalCreateEditUser({
  isOpen,
  onClose,
  mode,
  email,
  setEmail,
  name,
  setName,
  role,
  setRole,
  password,
  setPassword,
  handleSave,
}: EditUserModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onClose}
      placement="center"
      className="z-50"
      hideCloseButton
    >
      <ModalContent className="bg-card text-foreground rounded-lg shadow-xl">
        <ModalHeader className="text-xl font-semibold flex justify-between items-center">
          {mode === "edit" ? "Chỉnh sửa người dùng" : "Tạo người dùng mới"}
          <Button
            className="w-7 h-7 flex hover:bg-muted items-center justify-center rounded-full border cursor-pointer p-0"
            onPress={onClose}
            aria-label="Close"
            variant="light"
          >
            <X size={18} />
          </Button>
        </ModalHeader>
        <ModalBody className="space-y-1">
          <div>
            <label className="text-sm">Email</label>
            <div className="mt-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Nhập email người dùng"
                className={inputClass}
              />
            </div>
          </div>

          {mode === "create" && setPassword && (
            <div>
              <label className="text-sm">Mật khẩu</label>
              <div className="mt-1">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nhập mật khẩu"
                  className={inputClass}
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-sm">Tên</label>
            <div className="mt-1">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nhập tên người dùng"
                className={inputClass}
              />
            </div>
          </div>

          {mode === "edit" && (
            <div>
              <label className="text-sm">Vai trò (role)</label>
              <div className="mt-1">
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="Nhập vai trò (user/admin)"
                  className={inputClass}
                />
              </div>
            </div>
          )}
        </ModalBody>
        <ModalFooter className="flex justify-end gap-2">
          <Button className={buttonCancel} onPress={onClose}>
            Hủy
          </Button>
          <Button className={buttonConfirm} onPress={handleSave}>
            {mode === "edit" ? "Lưu" : "Tạo"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

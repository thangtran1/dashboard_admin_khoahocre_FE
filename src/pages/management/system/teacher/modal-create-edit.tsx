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

interface ModalCreateEditTeacherProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "create" | "edit";
  editName: string;
  editBio: string;
  editAvatar: string;
  setEditName: (val: string) => void;
  setEditAvatar: (val: string) => void;
  setEditBio: (val: string) => void;
  handleSave: () => void;
}

export default function ModalCreateEditTeacher({
  isOpen,
  onClose,
  mode,
  editName,
  editBio,
  editAvatar,
  setEditBio,
  setEditName,
  setEditAvatar,
  handleSave,
}: ModalCreateEditTeacherProps) {
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
          {mode === "edit" ? "Edit Teacher" : "Create New Teacher"}
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
            <label className="text-sm">Bio</label>
            <div className="mt-1">
              <input
                type="text"
                value={editBio}
                onChange={(e) => setEditBio(e.target.value)}
                placeholder="Enter bio"
                className={inputClass}
              />
            </div>
          </div>
          <div>
            <label className="text-sm">Name</label>
            <div className="mt-1">
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                placeholder="Enter teacher name"
                className={inputClass}
              />
            </div>
          </div>
          <div>
            <label className="text-sm">Avatar URL</label>
            <div className="mt-1">
              <input
                type="text"
                value={editAvatar}
                onChange={(e) => setEditAvatar(e.target.value)}
                placeholder="Enter avatar URL"
                className={inputClass}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter className="flex justify-end gap-2">
          <Button className={buttonCancel} onPress={onClose}>
            Cancel
          </Button>
          <Button className={buttonConfirm} onPress={handleSave}>
            {mode === "edit" ? "Save" : "Create"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

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

interface EditCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "create" | "edit";
  editName: string;
  editCode: string;
  setEditName: (val: string) => void;
  setEditCode: (val: string) => void;
  handleSave: () => void;
}

export default function ModalCreateEditCategory({
  isOpen,
  onClose,
  mode,
  editName,
  editCode,
  setEditCode,
  setEditName,
  handleSave,
}: EditCategoryModalProps) {
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
          {mode === "edit" ? "Edit Category" : "Create New Category"}
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
            <label className="text-sm">Code</label>
            <div className="mt-1">
              <input
                type="text"
                value={editCode}
                onChange={(e) => setEditCode(e.target.value)}
                placeholder="Enter category code"
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
                placeholder="Enter category name"
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

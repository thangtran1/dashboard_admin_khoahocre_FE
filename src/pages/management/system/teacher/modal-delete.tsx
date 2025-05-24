import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import { buttonCancel, buttonConfirm } from "@/utils/use-always";
import { X } from "lucide-react";

interface DeleteTeacherModalProps {
  isOpen: boolean;
  onClose: () => void;
  teacher: { name: string } | null;
  handleDelete: () => void;
}

export default function ModalDeleteTeacher({
  isOpen,
  onClose,
  teacher,
  handleDelete,
}: DeleteTeacherModalProps) {
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
          Delete Teacher
          <Button
            className="w-7 h-7 flex hover:bg-muted items-center justify-center rounded-full border cursor-pointer p-0"
            onPress={onClose}
            aria-label="Close"
            variant="light"
          >
            <X size={18} />
          </Button>
        </ModalHeader>
        <ModalBody className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete teacher
            <span className="font-medium ml-1 text-base text-error">
              {teacher?.name}
            </span>
            ?
          </p>
        </ModalBody>
        <ModalFooter className="flex justify-end gap-2">
          <Button className={buttonCancel} onPress={onClose}>
            Cancel
          </Button>
          <Button className={buttonConfirm} onPress={handleDelete}>
            Confirm Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

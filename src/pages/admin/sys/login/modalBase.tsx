import type { ReactNode } from "react";

import { Modal } from "antd";
import { motion } from "framer-motion";

interface ModalBaseProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const dropIn = {
  hidden: { opacity: 0, y: -20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.3 },
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.95,
    transition: { duration: 0.2 },
  },
};

const ModalBase = ({ isOpen, onClose, children }: ModalBaseProps) => {
  return (
    <Modal
      centered
      destroyOnClose
      closable={true}
      footer={null}
      maskClosable={false}
      modalRender={(node) => (
        <motion.div
          animate="visible"
          exit="exit"
          initial="hidden"
          variants={dropIn}
        >
          {node}
        </motion.div>
      )}
      open={isOpen}
      styles={{ mask: { backgroundColor: "rgba(0,0,0,0.5)" } }}
      width={400}
      onCancel={onClose}
    >
      {children}
    </Modal>
  );
};

export default ModalBase;

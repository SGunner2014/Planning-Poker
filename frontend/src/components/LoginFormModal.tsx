import { useApp } from "@/context/AppContext";
import { Modal } from "antd";

interface LoginFormModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const LoginFormModal = ({ isOpen, setIsOpen }: LoginFormModalProps) => {
  // const { updateApp } = useApp();

  return (
    <>
      <Modal open={isOpen} closable={false} title="Choose a username">
        <p>Test</p>
      </Modal>
    </>
  );
};

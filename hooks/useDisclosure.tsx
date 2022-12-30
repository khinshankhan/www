// https://chakra-ui.com/docs/hooks/use-disclosure
import { useState, useCallback } from "react";

interface UseDisclosureProps {
  defaultIsOpen?: boolean;
  handleOpen?: () => void;
  handleClose?: () => void;
}

export const useDisclosure = ({
  defaultIsOpen = false,
  handleOpen = () => {},
  handleClose = () => {},
}: UseDisclosureProps) => {
  const [isOpen, setOpen] = useState(defaultIsOpen);

  const onOpen = useCallback(() => {
    setOpen(true);
    handleOpen();
  }, [setOpen, handleOpen]);

  const onClose = useCallback(() => {
    setOpen(false);
    handleClose();
  }, [setOpen, handleClose]);

  const onToggle = useCallback(() => {
    if (isOpen) {
      onClose();
    } else {
      onOpen();
    }
  }, [onClose, onOpen]);

  return {
    isOpen,
    onOpen,
    onClose,
    onToggle,
  };
};

export default useDisclosure;

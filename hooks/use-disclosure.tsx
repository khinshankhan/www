// https://chakra-ui.com/docs/hooks/use-disclosure
import { useState, useCallback } from "react";
import { useCallbackRef } from "./use-callback-ref";

interface UseDisclosureProps {
  defaultIsOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

export function useDisclosure({
  defaultIsOpen = false,
  onOpen: onOpenProp = () => {},
  onClose: onCloseProp = () => {},
}: UseDisclosureProps) {
  const handleOpen = useCallbackRef(onOpenProp);
  const handleClose = useCallbackRef(onCloseProp);

  const [isOpen, setIsOpen] = useState(defaultIsOpen);

  const onClose = useCallback(() => {
    setIsOpen(false);
    handleClose?.();
  }, [handleClose]);

  const onOpen = useCallback(() => {
    setIsOpen(true);
    handleOpen?.();
  }, [handleOpen]);

  const onToggle = useCallback(() => {
    if (isOpen) {
      onClose();
    } else {
      onOpen();
    }
  }, [isOpen, onOpen, onClose]);

  return {
    isOpen,
    onOpen,
    onClose,
    onToggle,
  };
}

export default useDisclosure;

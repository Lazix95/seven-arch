import { useState } from 'react';

export function useDialog<T, M = never>(callback: (context: T, message: M) => void) {
  const [isOpen, setIsOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState<T | null>(null);

  function open(context?: T) {
    setDialogContent(context ?? null);
    setIsOpen(true);
  }

  function close(message?: M) {
    callback(dialogContent!, message!);
    setIsOpen(false);
    setDialogContent(null);
  }

  return { isOpen, open, close };
}

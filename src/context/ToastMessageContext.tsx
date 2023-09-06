import { createContext, useMemo, ReactNode, useState, useContext } from 'react';
import { Alert, Snackbar } from '@mui/material';

interface ToastMessageContextValues {
  showToastMessage: (message: string, type?: 'success' | 'error' | 'warning' | 'info') => void;
  closeToastMessage: () => void;
}

const ToastMessageContext = createContext<ToastMessageContextValues>({ showToastMessage: () => {}, closeToastMessage: () => {} });

export const useToastMessage = () => {
  return useContext(ToastMessageContext);
};

export function ToastMessageProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<'success' | 'error' | 'warning' | 'info' | undefined>('success');
  const [message, setMessage] = useState('');

  function showToastMessage(message: string, type: 'success' | 'error' | 'warning' | 'info' = 'success') {
    setMessage(message);
    setType(type);
    setOpen(true);
  }

  function closeToastMessage() {
    setOpen(false);
    setMessage('');
    setType('success');
  }

  const providerValue = useMemo(
    () => ({
      showToastMessage,
      closeToastMessage,
    }),
    [],
  );
  return (
    <>
      <Snackbar open={open} autoHideDuration={4000} anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }} onClose={closeToastMessage}>
        <Alert onClose={closeToastMessage} severity={type} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
      <ToastMessageContext.Provider value={providerValue}>{children}</ToastMessageContext.Provider>;
    </>
  );
}

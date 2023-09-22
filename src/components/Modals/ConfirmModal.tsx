import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { Button, DialogContentText, useMediaQuery, useTheme } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import { ReactNode } from 'react';

export interface ConfirmModalProps {
  readonly isOpen: boolean;
  readonly title: ReactNode;
  readonly content: ReactNode;
  readonly onClose: () => void;
  readonly onConfirm: () => void;
}

export function ConfirmModal({ isOpen, title, content, onConfirm, onClose }: ConfirmModalProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Dialog open={isOpen} fullScreen={fullScreen} onClose={onClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onConfirm} autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

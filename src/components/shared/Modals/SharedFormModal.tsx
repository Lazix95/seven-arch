import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { getNamedChild } from '@/utils/SharedReactUtils';
import { Divider } from '@mui/material';
import styles from './SharedModals.module.scss';

export interface SharedFormModalProps {
  readonly open: boolean | undefined;
  readonly title: string;
  readonly onClose: () => void;
  readonly children: React.ReactNode;
}

export const SharedFormModalChildrenNames = {
  actions: 'actions',
  content: 'content',
};

export function SharedFormModal({ open, title, children, onClose }: SharedFormModalProps) {
  const Content = getNamedChild(children, SharedFormModalChildrenNames.content);
  const Actions = getNamedChild(children, SharedFormModalChildrenNames.actions);

  return (
    <Dialog className={styles.dialogAllowOverflow} open={Boolean(open)} onClose={onClose} maxWidth={'xs'} sx={{ overflow: 'visible' }} componentsProps={{}} fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <Divider />
      <DialogContent>{Content}</DialogContent>
      <Divider />
      <DialogActions className={'u-pa--3'}>{Actions}</DialogActions>
    </Dialog>
  );
}

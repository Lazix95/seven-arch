import { InputBaseComponentProps, TextField, TextFieldProps } from '@mui/material';
import React, { ElementType, ReactNode } from 'react';
import { SharedGridItem, SharedGridItemProps } from './SharedGridItem';
import styles from './SharedOutlinedContainer.module.scss';
import clsx from 'clsx';

interface SharedOutlineContainerProps extends SharedGridItemProps {
  children: ReactNode;
  centerText?: boolean;
  label?: React.ReactNode;
  noPadding?: boolean;
  center?: boolean;
  style?: Record<string, unknown>;
}

// eslint-disable-next-line react/display-name
const InputComponent = React.forwardRef<HTMLDivElement>((props, ref) => <div {...props} ref={ref} />);

export const SharedOutlinedContainer = ({ children, noPadding, label, className, center = true, ...rest }: SharedOutlineContainerProps) => {
  return (
    <SharedGridItem className={clsx({ [styles.noPaddings]: noPadding }, className)} centerText={center} {...rest}>
      <TextField
        fullWidth={true}
        variant="outlined"
        label={label}
        multiline
        InputLabelProps={{ component: 'span', shrink: true } as unknown as TextFieldProps['InputLabelProps']}
        InputProps={{
          inputComponent: InputComponent as ElementType<InputBaseComponentProps>,
        }}
        inputProps={{ children: children }}
      />
    </SharedGridItem>
  );
};

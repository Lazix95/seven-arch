import { InputBaseComponentProps, TextField, TextFieldProps } from '@mui/material';
import React, { ElementType, ReactNode } from 'react';
import { SharedGridItem, SharedGridItemProps } from './SharedGridItem';

interface SharedOutlineContainerProps extends SharedGridItemProps {
  children: ReactNode;
  centerText?: boolean;
  label: React.ReactNode;
  style?: Record<string, unknown>;
}

// eslint-disable-next-line react/display-name
const InputComponent = React.forwardRef<HTMLDivElement>((props, ref) => <div {...props} ref={ref} />);

export const SharedOutlinedContainer = ({ children, label, ...rest }: SharedOutlineContainerProps) => {
  return (
    <SharedGridItem centerText {...rest}>
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

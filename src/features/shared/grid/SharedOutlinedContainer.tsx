import { InputBaseComponentProps, TextField } from '@mui/material';
import React, { ElementType, ReactNode } from 'react';
import { SharedGridItem, SharedGridItemProps } from './SharedGridItem';

interface SharedOutlineContainerProps extends SharedGridItemProps {
  children: ReactNode;
  centerText?: boolean;
  label: string;
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
        InputLabelProps={{ shrink: true }}
        InputProps={{
          inputComponent: InputComponent as ElementType<InputBaseComponentProps>,
        }}
        inputProps={{ children: children }}
      />
    </SharedGridItem>
  );
};

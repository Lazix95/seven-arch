import { ChangeEvent } from 'react';
import { Checkbox, FormControlLabel, CheckboxProps, FormControlLabelProps } from '@mui/material';

export interface SharedCheckboxProps extends Omit<FormControlLabelProps, 'onChange' | 'label' | 'checked' | 'control'> {
  onChange?: (payload: { event: ChangeEvent<HTMLInputElement>; checked: boolean }) => void;
  checked?: boolean;
  label?: string;
  checkboxProps?: Omit<CheckboxProps, 'checked' | 'label'>;
}

export function SharedCheckbox({ checkboxProps, checked, label = '', onChange, ...rest }: SharedCheckboxProps) {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onChange?.({ event, checked: event.target.checked });
  }

  return (
    <FormControlLabel
      sx={{ pb: '23px' }}
      {...rest}
      control={<Checkbox sx={{ pb: 0, pt: 0 }} {...checkboxProps} onChange={handleChange} checked={checked} />}
      label={label}
    />
  );
}

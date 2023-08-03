import { TextFieldProps } from '@mui/material';
import { SharedGridItem } from '../grid/SharedGridItem';
import { SharedTextField, SharedTextFieldProps } from './SharedTextField';

export function SharedGridInput(props: SharedTextFieldProps) {
  return (
    <SharedGridItem xs={6} md={4} lg={3}>
      <SharedTextField {...props} />
    </SharedGridItem>
  );
}

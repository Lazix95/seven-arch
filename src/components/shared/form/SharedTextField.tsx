import { TextField, TextFieldProps } from '@mui/material';

export type SharedTextFieldProps = TextFieldProps & { errorText?: string; password?: boolean };

export function SharedTextField(props: SharedTextFieldProps) {
  const { password, errorText, ...rest } = props;

  const optionals = {
    ...(props.password && { type: 'password' }),
  };

  return <TextField margin={'none'} variant={'outlined'} required fullWidth size={'small'} error={!!errorText} helperText={errorText || ' '} {...optionals} {...rest} />;
}

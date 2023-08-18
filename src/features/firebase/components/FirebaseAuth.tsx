import { Avatar, Box, Checkbox, Container, FormControlLabel, Typography } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { SharedTextField } from '@/features/shared/form/SharedTextField';
import { useState, ChangeEvent } from 'react';
import { SharedButton } from '@/features/shared/SharedButton';

export interface FirebaseAuthProps {
  onSubmit?: (email: string, password: string) => void;
  error?: boolean;
  isLoading?: boolean;
}

export function FirebaseAuth({ onSubmit, error, isLoading }: FirebaseAuthProps) {
  const [fields, setFields] = useState<{ email: string; password: string }>({ email: '', password: '' });

  const loginErrorText = error ? 'Wrong Email or Password' : '';

  function handleFieldChange(event: ChangeEvent<HTMLInputElement>) {
    const elem = event.target;
    setFields((oldFields) => ({ ...oldFields, [elem.name]: elem.value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit?.(fields.email, fields.password);
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <SharedTextField value={fields.email} onChange={handleFieldChange} label="Email Address" name="email" errorText={loginErrorText} />
          <SharedTextField value={fields.password} onChange={handleFieldChange} label="Password" name="password" password errorText={loginErrorText} />

          <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
          <SharedButton submit loading={isLoading} btnType={'LoadingButton'} fullWidth sx={{ mt: 1, mb: 2 }}>
            Sign In
          </SharedButton>
        </Box>
      </Box>
    </Container>
  );
}

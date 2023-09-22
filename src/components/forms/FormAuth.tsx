import { Avatar, Box, Checkbox, Container, FormControlLabel, Typography } from '@mui/material';

import { SharedTextField } from '@/components/shared/form/SharedTextField';
import { useState, ChangeEvent } from 'react';
import { SharedButton } from '@/components/shared/form/SharedButton';
import { LockOutlined } from '@/components/shared/icons/materialUiIcons';
import { SharedHeading } from '@/components/shared/text/SharedHeading';
import { func } from 'prop-types';
import { SharedCheckbox } from '@/components/shared/form/SharedCheckbox';

export interface FirebaseAuthProps {
  onSubmit?: (email: string, password: string, rememberMe: boolean) => void;
  error?: boolean;
  isLoading?: boolean;
}

export function FormAuth({ onSubmit, error, isLoading }: FirebaseAuthProps) {
  const [fields, setFields] = useState<{ email: string; password: string; rememberMe: boolean }>({ email: '', password: '', rememberMe: false });

  const loginErrorText = error ? 'Wrong Email or Password' : '';

  function handleFieldChange(event: ChangeEvent<HTMLInputElement>) {
    const elem = event.target;
    setFields((oldFields) => ({ ...oldFields, [elem.name]: elem.value }));
  }

  function handleRememberMeChange(value: boolean) {
    setFields((oldFields) => ({ ...oldFields, rememberMe: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit?.(fields.email, fields.password, fields.rememberMe);
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlined />
        </Avatar>
        <SharedHeading className={'u-mb--3'} level={5}>
          Sign in
        </SharedHeading>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <SharedTextField value={fields.email} onChange={handleFieldChange} label="Email Address" name="email" error={!!loginErrorText} />
          <SharedTextField value={fields.password} onChange={handleFieldChange} label="Password" name="password" password errorText={loginErrorText} />
          <SharedCheckbox checked={fields.rememberMe} onChange={(e) => handleRememberMeChange(e.checked)} label={'Remember Me'} />

          <SharedButton submit loading={isLoading} btnType={'LoadingButton'} fullWidth sx={{ mb: 2 }}>
            Sign In
          </SharedButton>
        </Box>
      </Box>
    </Container>
  );
}

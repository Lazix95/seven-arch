import { Autocomplete, TextField } from '@mui/material';
import { socialNetworksMap } from '@/constants/socialNetworkItems';

export interface SharedAutoCompleteProps {
  readonly label: string;
  readonly value: unknown;
  readonly options?: { label: string; value: unknown }[];
  readonly onChange: (value: { label: string; value: unknown } | null) => void;
}

export function SharedAutoComplete({ label, value, onChange, options }: SharedAutoCompleteProps) {
  return (
    <Autocomplete
      size={'small'}
      value={options?.find((item) => item.value === value)}
      fullWidth
      disablePortal
      options={options || []}
      onChange={(e, v) => onChange(v)}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
}

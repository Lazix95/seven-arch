import { Autocomplete, AutocompleteProps, TextField } from '@mui/material';
import { socialNetworksMap } from '@/constants/socialNetworkItems';

type a = Omit<AutocompleteProps<any, any, any, any>, 'onChange' | 'options' | 'renderInput'>;

export interface SharedAutoCompleteProps extends a {
  readonly label: string;
  readonly value: unknown;
  readonly options?: { label: string; value: unknown }[];
  readonly onChange: (value: { label: string; value: unknown } | null) => void;
  readonly className?: string;
  readonly nonClearable?: boolean;
}

export function SharedAutoComplete({ label, value, onChange, options, nonClearable = true, ...rest }: SharedAutoCompleteProps) {
  return (
    <Autocomplete
      size={'small'}
      value={options?.find((item) => item.value === value) ?? null}
      fullWidth
      disablePortal
      clearIcon={nonClearable ? null : undefined}
      options={options || []}
      onChange={(e, v) => onChange(v)}
      {...rest}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
}

import { SharedGridSwitch } from '@/components/shared/form/SharedGridSwitch';
import { SharedGridItem } from '@/components/shared/grid/SharedGridItem';
import { Divider } from '@mui/material';
import { SharedButton } from '@/components/shared/form/SharedButton';

export interface AdminSharedArticleInterfaceLargeProps {
  readonly state?: boolean;
  readonly onStateChange?: (state: boolean) => void;
  readonly onBtnClick?: () => void;
}

export function AdminSharedArticleInterfaceLarge({ state, onStateChange, onBtnClick }: AdminSharedArticleInterfaceLargeProps) {
  return (
    <>
      <SharedGridSwitch label={'State:'} value={state} onChange={onStateChange} />
      <SharedGridItem className={'u-pt--2'} xs={12}>
        <Divider />
      </SharedGridItem>

      <SharedGridItem xs={12}>
        <SharedButton fullWidth onClick={onBtnClick}>
          Manage Article
        </SharedButton>
      </SharedGridItem>
    </>
  );
}

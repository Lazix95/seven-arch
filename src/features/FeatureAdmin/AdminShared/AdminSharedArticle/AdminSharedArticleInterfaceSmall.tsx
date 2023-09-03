import { SharedGridSwitch } from '@/features/shared/form/SharedGridSwitch';
import { SharedGridItem } from '@/features/shared/grid/SharedGridItem';
import { Divider } from '@mui/material';
import { SharedButton } from '@/features/shared/SharedButton';
import { SharedIf } from '@/features/shared/SharedIf';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

export interface AdminSharedArticleInterfaceSmallProps {
  readonly state?: boolean;
  readonly onStateChange?: (state: boolean) => void;
  readonly onBtnClick?: () => void;
  readonly dragAndDrop?: boolean;
}

export function AdminSharedArticleInterfaceSmall({ state, dragAndDrop, onStateChange, onBtnClick }: AdminSharedArticleInterfaceSmallProps) {
  return (
    <>
      <SharedGridItem className={'u-center--x'} xs={5}>
        <SharedIf If={dragAndDrop}>
          <DragIndicatorIcon style={{ marginRight: '-15px', zIndex: 2 }} className={'dndHandle'} />
        </SharedIf>
        <SharedGridSwitch label={'State:'} value={state} onChange={onStateChange} />
      </SharedGridItem>
      <SharedGridItem className={'u-start--x'} xs={1}>
        <Divider orientation={'vertical'} />
      </SharedGridItem>

      <SharedGridItem xs={6}>
        <SharedButton fullWidth onClick={onBtnClick}>
          Manage Article
        </SharedButton>
      </SharedGridItem>
    </>
  );
}

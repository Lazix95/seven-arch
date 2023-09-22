import { SharedGridSwitch } from '@/components/shared/form/SharedGridSwitch';
import { SharedGridItem } from '@/components/shared/grid/SharedGridItem';
import { Divider } from '@mui/material';
import { SharedButton } from '@/components/shared/form/SharedButton';
import { SharedIf } from '@/components/shared/util/SharedIf';
import { DragIndicatorIcon } from '@/components/shared/icons/materialUiIcons';

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

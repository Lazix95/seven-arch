import ReactDragListView from 'react-drag-listview';
import { ReactNode } from 'react';
import { SharedIf } from '@/components/shared/util/SharedIf';
import { SharedGridContainer } from '@/components/shared/grid/SharedGridContainer';
import { DivProps } from '@/models/generalModels';

export interface SharedDragAndDropProps {
  onDragEnd: (fromIndex: number, toIndex: number) => void;
  children: ReactNode;
  nodeSelector?: string;
  handleSelector?: string;
  style?: DivProps['style'];
  className?: DivProps['className'];
}

export function SharedDragAndDrop({ onDragEnd, children, style, className, nodeSelector = 'div.DragElement', handleSelector = '.dndHandle' }: SharedDragAndDropProps) {
  const reactDragListViewProps = {
    nodeSelector,
    handleSelector,
    lineClassName: 'DragLine',
  } as any;

  const EE = <div></div>;

  return (
    <ReactDragListView className={className} onDragEnd={onDragEnd} {...reactDragListViewProps}>
      {children}
    </ReactDragListView>
  );
}

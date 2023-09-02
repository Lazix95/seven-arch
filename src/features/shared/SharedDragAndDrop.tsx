import ReactDragListView from 'react-drag-listview';
import { ReactNode } from 'react';

export interface SharedDragAndDropProps {
  onDragEnd: (fromIndex: number, toIndex: number) => void;
  children: ReactNode;
  nodeSelector?: string;
  handleSelector?: string;
}

export function SharedDragAndDrop({ onDragEnd, children, nodeSelector = 'div.DragElement', handleSelector = '.dndHandle' }: SharedDragAndDropProps) {
  const reactDragListViewProps = {
    nodeSelector,
    handleSelector,
    lineClassName: 'DragLine',
  } as any;

  return (
    <ReactDragListView onDragEnd={onDragEnd} {...reactDragListViewProps}>
      {children}
    </ReactDragListView>
  );
}

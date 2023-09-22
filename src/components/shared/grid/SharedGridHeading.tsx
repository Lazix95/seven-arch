import { ReactNode } from 'react';
import { SharedHeading, SharedHeadingProps } from '../text/SharedHeading';
import { SharedGridItem } from './SharedGridItem';

export interface SharedGridHeadingProps extends SharedHeadingProps {
  readonly children?: ReactNode;
  readonly text?: string;
}

export function SharedGridHeading(props: SharedGridHeadingProps) {
  const { text, children, ...rest } = props;
  return (
    <SharedGridItem centerText>
      <SharedHeading {...rest}>{children ?? text}</SharedHeading>
    </SharedGridItem>
  );
}

import { SharedFirebaseImage } from '@/features/firebase/components/FirebaseImage/SharedFirebaseImage';
import { SharedGridContainer } from '../SharedDrawer/SharedGridContainer';
import { SharedGridItem } from '../grid/SharedGridItem';
import { FirebaseImage } from '@/features/firebase/utils/firebaseImageUtils';
import { SharedGridHeading } from '../grid/SharedGridHeading';
import { SharedHeading } from '../SharedHeading';
import { getNamedChild } from '@/utils/SharedReactUtils';
import { ReactNode, useMemo } from 'react';
import { SharedIf } from '../SharedIf';

export interface SharedArticleProps {
  title?: string;
  text?: string;
  image: FirebaseImage;
  children?: ReactNode;
}

export const SharedArticleChildrenNames = {
  append: 'append',
  prepend: 'prepen',
} as const;

export function SharedArticle({ image, title, text, children }: SharedArticleProps) {
  const AppendChild = useMemo(() => getNamedChild(children, SharedArticleChildrenNames.append), [children]);
  const PrependChild = useMemo(() => getNamedChild(children, SharedArticleChildrenNames.prepend), [children]);

  const imageWidth = useMemo(() => {
    if (!!AppendChild || !!PrependChild) return 8;
    return 12;
  }, [AppendChild, PrependChild]);

  return (
    <SharedGridContainer spacing={2}>
      <SharedGridItem xs={12}>
        <SharedHeading fontWeight={500} color={'white'} level={4}>
          {title}
        </SharedHeading>
      </SharedGridItem>

      <SharedIf RIf={!!AppendChild}>
        <SharedGridItem xs={4} style={{ height: '351px' }}>
          {AppendChild}
        </SharedGridItem>
      </SharedIf>

      <SharedGridItem xs={imageWidth} style={{ height: '351px' }}>
        <SharedFirebaseImage image={image} text={text} />
      </SharedGridItem>

      <SharedIf RIf={!!PrependChild}>
        <SharedGridItem xs={4} style={{ height: '351px' }}>
          {PrependChild}
        </SharedGridItem>
      </SharedIf>
    </SharedGridContainer>
  );
}

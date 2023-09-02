import { ReactNode } from 'react';
import { SharedGridItem } from '@/features/shared/grid/SharedGridItem';
import { SharedHeading } from '@/features/shared/SharedHeading';
import { AdminSharedArticle, MainArticleSubmitPayload, SubArticleSubmitPayload } from '@/features/FeatureAdmin/AdminShared/AdminSharedArticle';
import { SharedButton } from '@/features/shared/SharedButton';
import { SharedForm } from '@/features/shared/form/SharedForm';
import { Article } from '@/models/articleModels';
import { SharedIf } from '@/features/shared/SharedIf';

export interface AdminSharedFormProps {
  readonly title: string;
  readonly subTitle?: string;
  readonly article?: Article;
  readonly isMainArticle?: boolean;
  readonly noArticle?: boolean;
  readonly noSubmitBtn?: boolean;
  readonly initialLoading?: boolean;
  readonly isSubmitLoading?: boolean;
  readonly spacing?: number;
  readonly onSubmit?: () => void;
  readonly onArticleSubmit?: (payload: MainArticleSubmitPayload) => void;
  readonly children?: ReactNode;
  readonly formGrid?: boolean;
}

export function AdminSharedForm({
  title,
  subTitle,
  article,
  isMainArticle,
  noArticle,
  noSubmitBtn,
  initialLoading,
  isSubmitLoading,
  onSubmit,
  onArticleSubmit,
  spacing,
  formGrid,
  children,
}: AdminSharedFormProps) {
  return (
    <SharedForm spacing={spacing} grid={formGrid} isLoading={initialLoading} onSubmit={onSubmit}>
      <SharedGridItem centerText>
        <SharedHeading level={4}>{title}</SharedHeading>
      </SharedGridItem>

      <SharedIf If={subTitle}>
        <SharedGridItem centerText>
          <SharedHeading level={5}>{subTitle}</SharedHeading>
        </SharedGridItem>
      </SharedIf>

      <SharedIf If={!noArticle}>
        <AdminSharedArticle article={article} isMainArticle={isMainArticle} onSubmitArticle={onArticleSubmit} />
      </SharedIf>

      <SharedGridItem xs={12}>{children}</SharedGridItem>

      <SharedIf If={!noSubmitBtn}>
        <SharedGridItem>
          <SharedButton fullWidth btnType={'LoadingButton'} loading={isSubmitLoading} type={'submit'}>
            Save
          </SharedButton>
        </SharedGridItem>
      </SharedIf>
    </SharedForm>
  );
}

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
  readonly article?: Article;
  readonly isMainArticle?: boolean;
  readonly noArticle?: boolean;
  readonly initialLoading?: boolean;
  readonly isSubmitLoading?: boolean;
  readonly onSubmit?: () => void;
  readonly onMainArticleSubmit?: (payload: MainArticleSubmitPayload) => void;
  readonly onSubArticleSubmit?: (payload: SubArticleSubmitPayload) => void;
  readonly children?: ReactNode;
}

export function AdminSharedForm({
  title,
  article,
  isMainArticle,
  noArticle,
  initialLoading,
  isSubmitLoading,
  onSubmit,
  onMainArticleSubmit,
  onSubArticleSubmit,
}: AdminSharedFormProps) {
  return (
    <SharedForm isLoading={initialLoading} onSubmit={onSubmit}>
      <SharedGridItem centerText>
        <SharedHeading level={4}>{title}</SharedHeading>
      </SharedGridItem>

      <SharedIf If={!noArticle}>
        <AdminSharedArticle article={article} isMainArticle={isMainArticle} onSubmitMainArticle={onMainArticleSubmit} onSubmitSubArticle={onSubArticleSubmit} />
      </SharedIf>

      <SharedGridItem>
        <SharedButton fullWidth btnType={'LoadingButton'} loading={isSubmitLoading} type={'submit'}>
          Save
        </SharedButton>
      </SharedGridItem>
    </SharedForm>
  );
}

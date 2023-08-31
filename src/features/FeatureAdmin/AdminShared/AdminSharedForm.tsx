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
  readonly onArticleSubmit?: (payload: MainArticleSubmitPayload) => void;
  readonly children?: ReactNode;
}

export function AdminSharedForm({ title, article, isMainArticle, noArticle, initialLoading, isSubmitLoading, onSubmit, onArticleSubmit }: AdminSharedFormProps) {
  return (
    <SharedForm isLoading={initialLoading} onSubmit={onSubmit}>
      <SharedGridItem centerText>
        <SharedHeading level={4}>{title}</SharedHeading>
      </SharedGridItem>

      <SharedIf If={!noArticle}>
        <AdminSharedArticle article={article} isMainArticle={isMainArticle} onSubmitArticle={onArticleSubmit} />
      </SharedIf>

      <SharedGridItem>
        <SharedButton fullWidth btnType={'LoadingButton'} loading={isSubmitLoading} type={'submit'}>
          Save
        </SharedButton>
      </SharedGridItem>
    </SharedForm>
  );
}

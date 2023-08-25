import { SharedForm } from '@/features/shared/form/SharedForm';
import { SharedGridItem } from '@/features/shared/grid/SharedGridItem';
import { SharedHeading } from '@/features/shared/SharedHeading';
import { SharedButton } from '@/features/shared/SharedButton';
import { AdminSharedArticle, MainArticleSubmitPayload } from '@/features/FeatureAdmin/AdminShared/AdminSharedArticle';
import { Article } from '@/models/articleModels';
import { useState } from 'react';

export interface FeatureAdminNewsViewProps {
  article?: Article;
  initialLoading?: boolean;
  isSubmitLoading?: boolean;
  handleArticleSubmit?: (payload: MainArticleSubmitPayload) => void;
  handleSubmit?: () => void;
}

export function FeatureAdminNewsView({ article, initialLoading, isSubmitLoading, handleSubmit, handleArticleSubmit }: FeatureAdminNewsViewProps) {
  const [articlePayload, setArticlePayload] = useState<MainArticleSubmitPayload | null>(null);

  function handleFormSubmit() {
    if (articlePayload) {
      handleArticleSubmit?.(articlePayload);
    }

    handleSubmit?.();
  }

  return (
    <SharedForm isLoading={initialLoading} onSubmit={handleFormSubmit}>
      <SharedGridItem centerText>
        <SharedHeading level={4}> News </SharedHeading>
      </SharedGridItem>

      <AdminSharedArticle article={article} isMainArticle onSubmitMainArticle={(payload) => setArticlePayload(payload)} />

      <SharedGridItem>
        <SharedButton fullWidth btnType={'LoadingButton'} loading={isSubmitLoading} type={'submit'}>
          Save
        </SharedButton>
      </SharedGridItem>
    </SharedForm>
  );
}

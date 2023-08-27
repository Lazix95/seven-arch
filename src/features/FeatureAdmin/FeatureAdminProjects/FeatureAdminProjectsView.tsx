import { AdminSharedForm } from '@/features/FeatureAdmin/AdminShared/AdminSharedForm';
import { MainArticleSubmitPayload } from '@/features/FeatureAdmin/AdminShared/AdminSharedArticle';
import { useState } from 'react';
import { Article } from '@/models/articleModels';
import { func } from 'prop-types';

export interface FeatureAdminProjectsViewProps {
  article?: Article;
  initialLoading?: boolean;
  isSubmitLoading?: boolean;
  onArticleSubmit?: (payload: MainArticleSubmitPayload) => void;
  onSubmit?: () => void;
}

export function FeatureAdminProjectsView({ article, initialLoading, isSubmitLoading, onSubmit, onArticleSubmit }: FeatureAdminProjectsViewProps) {
  const [articlePayload, setArticlePayload] = useState<MainArticleSubmitPayload | null>(null);

  function handleFormSubmit() {
    console.log('handleFormSubmit', articlePayload);
    if (articlePayload) {
      onArticleSubmit?.(articlePayload);
    }

    onSubmit?.();
  }

  return (
    <AdminSharedForm
      title={'Projects'}
      article={article}
      initialLoading={initialLoading}
      isSubmitLoading={isSubmitLoading}
      isMainArticle={true}
      onMainArticleSubmit={(payload) => setArticlePayload(payload)}
      onSubmit={handleFormSubmit}
    />
  );
}

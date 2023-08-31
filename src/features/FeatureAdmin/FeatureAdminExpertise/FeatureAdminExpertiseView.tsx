import { useState } from 'react';
import { MainArticleSubmitPayload } from '@/features/FeatureAdmin/AdminShared/AdminSharedArticle';
import { AdminSharedForm } from '@/features/FeatureAdmin/AdminShared/AdminSharedForm';
import { Article } from '@/models/articleModels';

export interface FeatureAdminExpertiseViewProps {
  article?: Article;
  initialLoading?: boolean;
  isSubmitLoading?: boolean;
  onArticleSubmit?: (payload: MainArticleSubmitPayload) => void;
  onSubmit?: () => void;
}

export function FeatureAdminExpertiseView({ article, initialLoading, isSubmitLoading, onSubmit, onArticleSubmit }: FeatureAdminExpertiseViewProps) {
  return (
    <AdminSharedForm
      title={'Expertise'}
      article={article}
      initialLoading={initialLoading}
      isSubmitLoading={isSubmitLoading}
      isMainArticle={true}
      onArticleSubmit={onArticleSubmit}
      onSubmit={onSubmit}
    />
  );
}

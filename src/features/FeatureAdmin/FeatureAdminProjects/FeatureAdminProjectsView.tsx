import { AdminSharedForm } from '@/features/FeatureAdmin/AdminShared/AdminSharedForm';
import { useState } from 'react';
import { Article, MainArticleSubmitPayload } from '@/models/articleModels';
import { func } from 'prop-types';

export interface FeatureAdminProjectsViewProps {
  article?: Article;
  initialLoading?: boolean;
  isSubmitLoading?: boolean;
  onArticleSubmit?: (payload: MainArticleSubmitPayload) => void;
  onSubmit?: () => void;
}

export function FeatureAdminProjectsView({ article, initialLoading, isSubmitLoading, onSubmit, onArticleSubmit }: FeatureAdminProjectsViewProps) {
  async function handleFormSubmit() {
    onSubmit?.();
  }

  return (
    <AdminSharedForm
      title={'Projects'}
      article={article}
      initialLoading={initialLoading}
      isSubmitLoading={isSubmitLoading}
      isMainArticle={true}
      onArticleSubmit={onArticleSubmit}
      onSubmit={handleFormSubmit}
    />
  );
}

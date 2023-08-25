import { SharedOutlinedContainer } from '@/features/shared/grid/SharedOutlinedContainer';
import { SharedGridSwitch } from '@/features/shared/form/SharedGridSwitch';
import { useState } from 'react';
import { SharedIf } from '@/features/shared/SharedIf';
import { SharedAutoComplete } from '@/features/shared/form/SharedAutoComplete';
import { Article, ArticleFeatureType } from '@/models/articleModels';
import { SharedGridContainer } from '@/features/shared/grid/SharedGridContainer';
import { SharedGridItem } from '@/features/shared/grid/SharedGridItem';
import { SharedTextField } from '@/features/shared/form/SharedTextField';
import { SharedImageUpload } from '@/features/shared/SharedImageUpload/SharedImageUpload';
import { SharedButton } from '@/features/shared/SharedButton';
import { SharedFormModal, SharedFormModalChildrenNames } from '@/features/shared/Modals/SharedFormModal';
import { SharedNamedChild } from '@/features/shared/SharedNamedChild';

export interface AdminSharedArticleProps {
  article?: Article;
  isMainArticle?: boolean;
  onSubmit?: (payload: ArticleSubmitPayload) => void;
}

export function AdminSharedArticle({ isMainArticle, article, onSubmit }: AdminSharedArticleProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isActive, setIsActive] = useState(article?.state ?? false);
  const [feature, setFeature] = useState<ArticleFeatureType | null>(article?.feature?.type ?? null);
  const [title, setTitle] = useState(article?.title ?? '');
  const [content, setContent] = useState(article?.content ?? '');
  const [image, setImage] = useState<File | null>();

  function handleCancel() {
    setIsModalOpen(false);
    setIsActive(true);
    setFeature(null);
    setTitle('');
    setContent('');
    setImage(null);
  }

  function handleSubmit() {
    onSubmit?.({
      title,
      type: feature as ArticleFeatureType,
      content,
      state: isActive,
      image,
    });
  }

  const options = [
    { label: 'None', value: null },
    { label: 'News Teller', value: 'newsTeller' },
    { label: 'Description', value: 'description' },
  ];

  return (
    <SharedOutlinedContainer label={'Home page Article Settings'}>
      <SharedGridContainer centerX={false} spacing={0}>
        <SharedGridSwitch label={'State:'} value={isActive} onChange={setIsActive} />
        <SharedButton fullWidth disabled={!isActive} onClick={() => setIsModalOpen(true)}>
          Manage Article
        </SharedButton>

        <SharedFormModal open={isModalOpen} title={'Manage Article'} onClose={() => setIsModalOpen(false)}>
          <SharedNamedChild name={SharedFormModalChildrenNames.content}>
            <SharedIf If={isActive}>
              <SharedAutoComplete className={'u-mb--5'} label={'Article Feature'} value={feature} options={options} onChange={(e) => setFeature(e?.value as ArticleFeatureType)} />
            </SharedIf>

            <SharedIf If={isActive && isMainArticle}>
              <SharedGridItem xs={12}>
                <SharedTextField label={'Title'} value={title} onChange={(e) => setTitle(e.target.value)} />
              </SharedGridItem>
            </SharedIf>

            <SharedIf If={isActive && !!feature}>
              <SharedGridItem xs={12} className={''}>
                <SharedTextField label={'Content'} value={content} onChange={(e) => setContent(e.target.value)} />
              </SharedGridItem>
            </SharedIf>

            <SharedGridItem xs={12}>
              <SharedImageUpload label={'Article Image'} previewUrl={article?.imageUrl} onChange={(_, file) => setImage(file)} />
            </SharedGridItem>
          </SharedNamedChild>

          <SharedNamedChild name={SharedFormModalChildrenNames.actions}>
            <SharedButton onClick={handleCancel}>Cancel</SharedButton>
            <SharedButton onClick={handleSubmit}>Submit</SharedButton>
          </SharedNamedChild>
        </SharedFormModal>
      </SharedGridContainer>
    </SharedOutlinedContainer>
  );
}

export interface ArticleSubmitPayload {
  title?: string;
  type: ArticleFeatureType;
  content: string;
  image: File | null | undefined;
  state?: boolean;
}

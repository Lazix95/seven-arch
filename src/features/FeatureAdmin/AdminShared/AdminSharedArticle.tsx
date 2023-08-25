import { SharedOutlinedContainer } from '@/features/shared/grid/SharedOutlinedContainer';
import { SharedGridSwitch } from '@/features/shared/form/SharedGridSwitch';
import { useCallback, useEffect, useState } from 'react';
import { SharedIf } from '@/features/shared/SharedIf';
import { SharedAutoComplete } from '@/features/shared/form/SharedAutoComplete';
import { Article, ArticleFeature, ArticleFeatureType } from '@/models/articleModels';
import { SharedGridContainer } from '@/features/shared/grid/SharedGridContainer';
import { SharedGridItem } from '@/features/shared/grid/SharedGridItem';
import { SharedTextField } from '@/features/shared/form/SharedTextField';
import { SharedImageUpload } from '@/features/shared/SharedImageUpload/SharedImageUpload';
import { SharedButton } from '@/features/shared/SharedButton';
import { SharedFormModal, SharedFormModalChildrenNames } from '@/features/shared/Modals/SharedFormModal';
import { SharedNamedChild } from '@/features/shared/SharedNamedChild';
import { Divider } from '@mui/material';

export interface AdminSharedArticleProps {
  article?: Article;
  isMainArticle?: boolean;
  onSubmitMainArticle?: (payload: MainArticleSubmitPayload) => void;
  onSubmitSubArticle?: (payload: SubArticleSubmitPayload) => void;
}

export function AdminSharedArticle({ isMainArticle, article, onSubmitMainArticle, onSubmitSubArticle }: AdminSharedArticleProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [feature, setFeature] = useState<ArticleFeatureType | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [featureContent, setFeatureContent] = useState('');
  const [image, setImage] = useState<File | null>();
  const [size, setSize] = useState<'small' | 'large'>('large');

  const fillForm = useCallback(() => {
    if (article) {
      setIsActive(article.state);
      setFeature(article.feature?.type ?? null);
      setTitle(article.title ?? '');
      setContent(article.content ?? '');
      setFeatureContent(article.feature?.content ?? '');
      setSize(article.size ?? 'large');
    }
  }, [article]);

  useEffect(() => {
    fillForm();
  }, [article, fillForm]);

  function handleCancel() {
    setIsModalOpen(false);
    fillForm();
  }

  function handleSubmit() {
    let payload: MainArticleSubmitPayload | SubArticleSubmitPayload;

    if (isMainArticle) {
      payload = {
        type: 'main',
        title,
        feature: feature ? { type: feature, content: featureContent } : null,
        size,
        ...(image && { image }),
        content,
        state: isActive,
      };
    } else {
      payload = {
        type: 'sub',
        ...(image && { image }),
        content,
        state: isActive,
      };
    }

    setIsModalOpen(false);
    payload.type === 'main' ? onSubmitMainArticle?.(payload) : onSubmitSubArticle?.(payload);
  }

  const featureOptions = [
    { label: 'None', value: null },
    { label: 'News Teller', value: 'newsTeller' },
    { label: 'Description', value: 'description' },
  ];

  const sizeOptions = [
    { label: 'Small', value: 'small' },
    { label: 'Large', value: 'large' },
  ];

  return (
    <SharedOutlinedContainer label={'Home page Article Settings'}>
      <SharedGridContainer centerX={false} spacing={2}>
        <SharedGridSwitch label={'State:'} value={isActive} onChange={setIsActive} />
        <SharedGridItem className={'u-pt--2'} xs={12}>
          <Divider />
        </SharedGridItem>

        <SharedGridItem xs={12}>
          <SharedButton disabled={!isActive} fullWidth onClick={() => setIsModalOpen(true)}>
            Manage Article
          </SharedButton>
        </SharedGridItem>

        <SharedFormModal open={isModalOpen} title={'Manage Article'} onClose={() => setIsModalOpen(false)}>
          <SharedNamedChild name={SharedFormModalChildrenNames.content}>
            <SharedIf If={isActive}>
              <SharedIf If={isMainArticle}>
                <SharedAutoComplete
                  className={'u-mb--5'}
                  label={'Article Feature'}
                  value={feature}
                  options={featureOptions}
                  onChange={(e) => setFeature(e?.value as ArticleFeatureType)}
                />
              </SharedIf>

              <SharedIf If={isMainArticle}>
                <SharedGridItem xs={12}>
                  <SharedTextField label={'Title'} value={title} onChange={(e) => setTitle(e.target.value)} />
                </SharedGridItem>
              </SharedIf>

              <SharedGridItem xs={12}>
                <SharedTextField label={'Content'} value={content} onChange={(e) => setContent(e.target.value)} />
              </SharedGridItem>

              <SharedIf RIf={isMainArticle}>
                <SharedAutoComplete className={'u-mb--5'} label={'Size'} value={size} options={sizeOptions} onChange={(e) => setSize(e?.value as 'large' | 'small')} />
              </SharedIf>
            </SharedIf>

            <SharedIf If={isActive && isMainArticle && !!feature}>
              <SharedGridItem xs={12} className={''}>
                <SharedTextField multiline label={'Feature Content'} value={featureContent} onChange={(e) => setFeatureContent(e.target.value)} />
              </SharedGridItem>
            </SharedIf>

            <SharedGridItem xs={12}>
              <SharedImageUpload label={'Article Image'} previewUrl={article?.image?.url} onChange={(_, file) => setImage(file)} />
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

export interface MainArticleSubmitPayload {
  type: 'main';
  title?: string;
  feature: ArticleFeature | null;
  content: string;
  image?: File | null | undefined;
  state: boolean;
  size: 'small' | 'large';
}

export interface SubArticleSubmitPayload {
  type: 'sub';
  content: string;
  image?: File | null | undefined;
  state: boolean;
}

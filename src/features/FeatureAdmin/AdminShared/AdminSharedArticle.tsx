import { SharedOutlinedContainer } from '@/features/shared/grid/SharedOutlinedContainer';
import { SharedGridSwitch } from '@/features/shared/form/SharedGridSwitch';
import { useCallback, useEffect, useState } from 'react';
import { SharedIf } from '@/features/shared/SharedIf';
import { SharedAutoComplete } from '@/features/shared/form/SharedAutoComplete';
import { Article, ArticleFeature, ArticleFeatureType, SubArticle } from '@/models/articleModels';
import { SharedGridContainer } from '@/features/shared/grid/SharedGridContainer';
import { SharedGridItem } from '@/features/shared/grid/SharedGridItem';
import { SharedTextField } from '@/features/shared/form/SharedTextField';
import { SharedImageUpload } from '@/features/shared/SharedImageUpload/SharedImageUpload';
import { SharedButton } from '@/features/shared/SharedButton';
import { SharedFormModal, SharedFormModalChildrenNames } from '@/features/shared/Modals/SharedFormModal';
import { SharedNamedChild } from '@/features/shared/SharedNamedChild';
import { Divider, Typography } from '@mui/material';
import { uuidV4 } from '@/plugins/uuid';
import { addOrUpdateEntityInArray, removeEntityFromArray } from '@/utils/arrayUtils';
import { subArticleToSubArticlePayload } from '@/utils/articleUtils';
import AddIcon from '@mui/icons-material/Add';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { FirebaseImage } from '@/features/firebase/utils/firebaseImageUtils';

export interface AdminSharedArticleProps {
  article?: Article;
  isMainArticle?: boolean;
  onSubmitMainArticle?: (payload: MainArticleSubmitPayload) => void;
  onSubmitSubArticle?: (payload: SubArticleSubmitPayload) => void;
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

export function AdminSharedArticle({ isMainArticle, article, onSubmitMainArticle }: AdminSharedArticleProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubModalOpen, setIsSubModalOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [feature, setFeature] = useState<ArticleFeatureType | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [featureContent, setFeatureContent] = useState('');
  const [image, setImage] = useState<File | null>();
  const [size, setSize] = useState<'small' | 'large'>('large');
  const [subArticles, setSubArticles] = useState<SubArticleEditPayload[]>([]);

  const [subArticle, setSubArticle] = useState<SubArticleEditPayload | null>(null);

  const fillForm = useCallback(() => {
    if (article) {
      setIsActive(article.state);
      setFeature(article.feature?.type ?? null);
      setTitle(article.title ?? '');
      setContent(article.content ?? '');
      setFeatureContent(article.feature?.content ?? '');
      setSize(article.size ?? 'large');

      setSubArticles(subArticleToSubArticlePayload(article.subArticles ?? []));
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
    let payload: MainArticleSubmitPayload = {
      type: 'main',
      title,
      subArticles: subArticles.map((subArticle) => {
        const { imagePreviewUrl, oldFirebaseImage, ...restData } = subArticle;
        return { ...restData, image: subArticle.image || oldFirebaseImage };
      }),
      feature: feature ? { type: feature, content: featureContent } : null,
      size,
      ...(image && { image }),
      content,
      state: isActive,
    };

    setIsModalOpen(false);
    onSubmitMainArticle?.(payload);
  }

  function handleCreateSubArticle() {
    setIsSubModalOpen(true);
    setSubArticle({
      id: uuidV4(),
      content: '',
      link: '',
      state: true,
      image: undefined,
    });
  }

  function handleChangeSubArticle(fieldName: keyof SubArticleEditPayload, value: any) {
    setSubArticle((prev) => ({ ...prev, [fieldName]: value }) as SubArticleEditPayload);
  }

  function handleSaveSubArticle() {
    if (subArticle) {
      setSubArticles((prev) => addOrUpdateEntityInArray(prev, subArticle, 'id'));
      setIsSubModalOpen(false);
      setSubArticle(null);
    }
  }

  function handleCancelSubArticle() {
    setIsSubModalOpen(false);
    setSubArticle(null);
  }

  function handleDeleteSubArticle(subArticle: SubArticleEditPayload) {
    setSubArticles((prev) => removeEntityFromArray(prev, subArticle, 'id'));
  }

  function handleEditSubArticle(subArticle: SubArticleEditPayload) {
    setSubArticle({ ...subArticle });
    setIsSubModalOpen(true);
  }

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

        {/* Main Article Modal */}
        <SharedFormModal open={isModalOpen && !isSubModalOpen} title={'Manage Article'} onClose={() => setIsModalOpen(false)}>
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

            <SharedIf If={isMainArticle}>
              <div className={'u-end--x u-flex--space-between u-mb--2'}>
                <Typography className={'u-mr--5'}>Sub Articles</Typography>
                <SharedButton color={'primary'} disabled={!isActive} onClick={handleCreateSubArticle}>
                  <div className={'u-center--x'}>
                    <span>Add</span>
                    <AddIcon />
                  </div>
                </SharedButton>
              </div>

              <Divider />
              <SharedIf If={subArticles.length === 0}>
                <div className={'u-center--y u-pa--2'}>
                  <Typography color={'gray'}>No Sub Articles</Typography>
                </div>
              </SharedIf>

              <SharedIf If={subArticles.length > 0}>
                {subArticles.map((subArticle) => (
                  <div key={subArticle.id} className={'u-flex--space-between u-center--x'}>
                    <div className={'u-center--x u'}>
                      <Typography>{subArticle.content}</Typography>
                      <SharedIf If={!subArticle.state}>
                        <Typography style={{ border: '1px solid', borderRadius: '5px', padding: '0 5px' }} className={'u-text--gray u-text--font-10 u-ml--3'}>
                          DISABLED
                        </Typography>
                      </SharedIf>
                    </div>
                    <div style={{ width: '80px' }}>
                      <SharedButton color={'error'} btnType={'Icon'} onClick={() => handleDeleteSubArticle(subArticle)}>
                        <DeleteForeverIcon />
                      </SharedButton>
                      <SharedButton btnType={'Icon'} onClick={() => handleEditSubArticle(subArticle)}>
                        <ModeEditIcon />
                      </SharedButton>
                    </div>
                  </div>
                ))}
              </SharedIf>

              <Divider className={'u-mb--5'} />
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

        {/* Sub Article Modal */}
        <SharedFormModal open={isSubModalOpen} title={'Manage Sub Article'} onClose={() => setIsSubModalOpen(false)}>
          <SharedNamedChild name={SharedFormModalChildrenNames.content}>
            <SharedOutlinedContainer label={'Turn On/Off'} center={false} noPadding={true} className={'u-pb--5'}>
              <SharedGridSwitch gridItemProps={{ className: 'u-pl--3' }} label={'State:'} value={subArticle?.state} onChange={(state) => handleChangeSubArticle('state', state)} />
            </SharedOutlinedContainer>

            <SharedGridItem xs={12}>
              <SharedTextField label={'Content'} value={subArticle?.content} onChange={(e) => handleChangeSubArticle('content', e.target.value)} />
            </SharedGridItem>

            <SharedGridItem xs={12}>
              <SharedTextField label={'Link'} value={subArticle?.link} onChange={(e) => handleChangeSubArticle('link', e.target.value)} />
            </SharedGridItem>

            <SharedGridItem xs={12}>
              <SharedImageUpload
                label={'Article Image'}
                previewUrl={subArticle?.imagePreviewUrl}
                onChange={(_, file) => handleChangeSubArticle('image', file)}
                onPreviewUrlChange={(url) => handleChangeSubArticle('imagePreviewUrl', url)}
              />
            </SharedGridItem>
          </SharedNamedChild>

          <SharedNamedChild name={SharedFormModalChildrenNames.actions}>
            <SharedButton onClick={handleCancelSubArticle}>Cancel</SharedButton>
            <SharedButton onClick={handleSaveSubArticle}>Submit</SharedButton>
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
  subArticles?: SubArticleSubmitPayload[];
  image?: File | null | undefined;
  state: boolean;
  size: 'small' | 'large';
}

export interface SubArticleEditPayload {
  id: string;
  content: string;
  image?: File | FirebaseImage | null | undefined;
  imagePreviewUrl?: string | null;
  oldFirebaseImage?: FirebaseImage | null;
  state: boolean;
  link: string;
}

export type SubArticleSubmitPayload = Omit<SubArticleEditPayload, 'imagePreviewUrl' | 'oldFirebaseImage'>;

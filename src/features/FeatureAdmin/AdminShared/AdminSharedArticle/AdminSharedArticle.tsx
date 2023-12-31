import { SharedOutlinedContainer } from '@/components/shared/grid/SharedOutlinedContainer';
import { SharedGridSwitch } from '@/components/shared/form/SharedGridSwitch';
import { useCallback, useEffect, ReactNode } from 'react';
import { SharedIf } from '@/components/shared/util/SharedIf';
import { SharedAutoComplete } from '@/components/shared/form/SharedAutoComplete';
import { Article, ArticleFeatureType, FeatureFontSize, FeatureTextAlign, MainArticleSubmitPayload, SubArticleEditPayload } from '@/models/articleModels';
import { SharedGridContainer } from '@/components/shared/grid/SharedGridContainer';
import { SharedGridItem } from '@/components/shared/grid/SharedGridItem';
import { SharedTextField } from '@/components/shared/form/SharedTextField';
import { SharedImageUpload } from '@/components/shared/SharedImageUpload/SharedImageUpload';
import { SharedButton } from '@/components/shared/form/SharedButton';
import { FormModal, SharedFormModalChildrenNames } from '@/components/Modals/FormModal';
import { SharedNamedChild } from '@/components/shared/util/SharedNamedChild';
import { Divider, Typography } from '@mui/material';
import { uuidV4 } from '@/plugins/uuid';
import { addOrUpdateEntityInArray, removeEntityFromArray } from '@/utils/arrayUtils';
import { subArticleToSubArticlePayload } from '@/utils/articleUtils';
import { DeleteForeverIcon, ModeEditIcon, AddIcon } from '@/components/shared/icons/SharedMaterialUiIcons';
import clsx from 'clsx';
import { useContainerData } from '@/hooks/useContainerData';
import { alignOptions, featureOptions, fontSizeOptions, sizeOptions } from '@/constants/articleOptions';
import { AdminSharedArticleInterfaceLarge } from '@/features/FeatureAdmin/AdminShared/AdminSharedArticle/AdminSharedArticleInterfaceLarge';
import { AdminSharedArticleInterfaceSmall } from '@/features/FeatureAdmin/AdminShared/AdminSharedArticle/AdminSharedArticleInterfaceSmall';

export interface AdminSharedArticleContainerState {
  readonly isModalOpen?: boolean;
  readonly isSubModalOpen?: boolean;
  readonly isActive?: boolean;
  readonly feature: ArticleFeatureType | null;
  readonly title: string;
  readonly content: string;
  readonly order: number;
  readonly featureContent: string;
  readonly featureAlign: FeatureTextAlign;
  readonly featureFontSize: FeatureFontSize;
  readonly image: File | null;
  readonly imageExternalUrl: string | null;
  readonly size: 'small' | 'large';
  readonly subArticles: SubArticleEditPayload[];
  readonly subArticle: SubArticleEditPayload | null;
}

export interface AdminSharedArticleProps {
  readonly article?: Article;
  readonly label?: ReactNode;
  readonly isMainArticle?: boolean;
  readonly size?: 'small' | 'large';
  readonly order?: number;
  readonly dragAndDrop?: boolean;
  readonly className?: string;
  readonly previousPayload?: MainArticleSubmitPayload;
  readonly onSubmitArticle?: (payload: MainArticleSubmitPayload) => void;
}

export function AdminSharedArticle(props: AdminSharedArticleProps) {
  const {
    article,
    className,
    dragAndDrop,
    order,
    previousPayload,
    isMainArticle = true,
    size: articleFormSize = 'small',
    label = 'Article Settings',
    onSubmitArticle,
  } = props;

  const { state, updateState, updateObjectInState } = useContainerData<AdminSharedArticleContainerState>({
    isModalOpen: false,
    isSubModalOpen: false,
    isActive: article?.state ?? false,
    feature: article?.feature?.type ?? null,
    title: article?.title ?? '',
    content: article?.content ?? '',
    order: article?.order ?? 0,
    featureContent: article?.feature?.content ?? '',
    featureAlign: article?.feature?.align ?? 'center',
    featureFontSize: article?.feature?.fontSize ?? 'normal',
    image: null,
    imageExternalUrl: article?.imageExternalUrl ?? null,
    size: article?.size ?? 'large',
    subArticles: subArticleToSubArticlePayload(article?.subArticles ?? []),
    subArticle: null,
  });

  const fillForm = useCallback(() => {
    if (article) {
      updateState({
        isActive: previousPayload?.state ?? article.state,
        feature: previousPayload?.feature?.type ?? article.feature?.type ?? null,
        title: previousPayload?.title ?? article.title ?? '',
        content: previousPayload?.content ?? article.content ?? '',
        order: previousPayload?.order ?? order ?? 0,
        featureContent: previousPayload?.feature?.content ?? article.feature?.content ?? '',
        featureAlign: previousPayload?.feature?.align ?? article.feature?.align ?? 'center',
        featureFontSize: previousPayload?.feature?.fontSize ?? article.feature?.fontSize ?? 'normal',
        image: previousPayload?.image ?? null,
        imageExternalUrl: previousPayload?.imageExternalUrl ?? article.imageExternalUrl ?? null,
        size: previousPayload?.size ?? article.size ?? 'large',
        subArticles: previousPayload?.subArticles ?? subArticleToSubArticlePayload(article.subArticles ?? []),
      });
    }
  }, [article, previousPayload, order]);

  useEffect(() => {
    fillForm();
  }, [article]);

  useEffect(() => {
    if (order && article?.order !== order) {
      updateState({ order });
      handleSubmit({ order });
    }
  }, [order]);

  function handleCancel() {
    updateState({ isModalOpen: false });
    fillForm();
  }

  function handleSubmit(manualInput?: { state?: boolean; order?: number }) {
    let payload: MainArticleSubmitPayload = {
      type: 'main',
      title: state.title,
      feature: state.feature ? { type: state.feature, content: state.featureContent, align: state.featureAlign, fontSize: state.featureFontSize } : null,
      size: state.size,
      content: state.content,
      state: manualInput?.state ?? state.isActive ?? false,
      order: manualInput?.order ?? state.order ?? -1,
      image: state.image ?? null,
      imageExternalUrl: state.imageExternalUrl ?? null,
      subArticles: state.subArticles.map((subArticle) => {
        const { imagePreviewUrl, oldFirebaseImage, ...restData } = subArticle;
        return { ...restData, image: subArticle.image || oldFirebaseImage, imageExternalUrl: subArticle.imageExternalUrl ?? null };
      }),
    };
    updateState({ isModalOpen: false });
    onSubmitArticle?.(payload);
  }

  function handleCreateSubArticle() {
    updateState({
      isSubModalOpen: true,
      subArticle: {
        id: uuidV4(),
        content: '',
        link: '',
        state: true,
        image: null,
      },
    });
  }

  function handleChangeSubArticle(fieldName: keyof SubArticleEditPayload, value: any) {
    //updateState({ subArticle: { ...state.subArticle, [fieldName]: value } as SubArticleEditPayload });
    updateObjectInState('subArticle', { [fieldName]: value } as SubArticleEditPayload);
  }

  function handleSaveSubArticle() {
    if (state.subArticle) {
      updateState({ subArticles: addOrUpdateEntityInArray(state.subArticles, state.subArticle, 'id'), subArticle: null, isSubModalOpen: false });
    }
  }

  function handleCancelSubArticle() {
    updateState({ isSubModalOpen: false });
    updateState({ subArticle: null });
  }

  function handleDeleteSubArticle(subArticle: SubArticleEditPayload) {
    updateState({ subArticles: removeEntityFromArray(state.subArticles, subArticle, 'id') });
  }

  function handleEditSubArticle(subArticle: SubArticleEditPayload) {
    updateState({ subArticle, isSubModalOpen: true });
  }

  async function handleSetIsActive(state: boolean) {
    updateState({ isActive: state });
    handleSubmit({ state });
  }

  return (
    <SharedOutlinedContainer className={clsx({ DragElement: dragAndDrop }, className)} label={label}>
      <SharedGridContainer centerX={false} spacing={articleFormSize === 'large' ? 2 : 0} mb={articleFormSize === 'large' ? 3 : 0}>
        <SharedIf If={articleFormSize === 'large'}>
          <AdminSharedArticleInterfaceLarge state={state.isActive} onStateChange={handleSetIsActive} onBtnClick={() => updateState({ isModalOpen: true })} />
        </SharedIf>

        <SharedIf If={articleFormSize === 'small'}>
          <AdminSharedArticleInterfaceSmall
            dragAndDrop={dragAndDrop}
            state={state.isActive}
            onStateChange={handleSetIsActive}
            onBtnClick={() => updateState({ isModalOpen: true })}
          />
        </SharedIf>

        {/* Main Article Modal */}
        <FormModal open={state.isModalOpen && !state.isSubModalOpen} title={'Manage Article'} onClose={() => updateState({ isModalOpen: false })}>
          <SharedNamedChild name={SharedFormModalChildrenNames.content}>
            <SharedIf If={isMainArticle}>
              <SharedAutoComplete
                className={'u-mb--5'}
                label={'Article Feature'}
                value={state.feature}
                options={featureOptions}
                onChange={(e) => updateState({ feature: e?.value as ArticleFeatureType })}
              />
            </SharedIf>

            <SharedIf If={isMainArticle}>
              <SharedGridItem xs={12}>
                <SharedTextField label={'Title'} value={state.title} onChange={(e) => updateState({ title: e.target.value })} />
              </SharedGridItem>
            </SharedIf>

            <SharedGridItem xs={12}>
              <SharedTextField label={'Content'} value={state.content} onChange={(e) => updateState({ content: e.target.value })} />
            </SharedGridItem>

            <SharedIf RIf={isMainArticle}>
              <SharedAutoComplete
                className={'u-mb--5'}
                label={'Size'}
                value={state.size}
                options={sizeOptions}
                onChange={(e) => updateState({ size: e?.value as 'large' | 'small' })}
              />
            </SharedIf>

            <SharedIf If={isMainArticle && !!state.feature}>
              <SharedAutoComplete
                className={'u-mb--5'}
                label={'Feature Text Alignment'}
                value={state.featureAlign}
                options={alignOptions}
                onChange={(e) => updateState({ featureAlign: e?.value as FeatureTextAlign })}
              />

              <SharedAutoComplete
                className={'u-mb--5'}
                label={'Feature Font Size'}
                value={state.featureFontSize}
                options={fontSizeOptions}
                onChange={(e) => updateState({ featureFontSize: e?.value as FeatureFontSize })}
              />

              <SharedGridItem xs={12} className={''}>
                <SharedTextField
                  multiline
                  maxRows={10}
                  label={'Feature Content'}
                  value={state.featureContent ?? ''}
                  onChange={(e) => updateState({ featureContent: e.target.value })}
                />
              </SharedGridItem>
            </SharedIf>

            <SharedIf If={isMainArticle}>
              <div className={'u-end--x u-flex--space-between u-mb--2'}>
                <Typography className={'u-mr--5'}>Sub Articles</Typography>
                <SharedButton color={'primary'} onClick={handleCreateSubArticle}>
                  <div className={'u-center--x'}>
                    <span>Add</span>
                    <AddIcon />
                  </div>
                </SharedButton>
              </div>

              <Divider />
              <SharedIf If={state.subArticles.length === 0}>
                <div className={'u-center--y u-pa--2'}>
                  <Typography color={'gray'}>No Sub Articles</Typography>
                </div>
              </SharedIf>

              <SharedIf If={state.subArticles.length > 0}>
                {state.subArticles.map((subArticle, index) => (
                  <div key={subArticle.id ?? index} className={'u-flex--space-between u-center--x'}>
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
              <SharedImageUpload
                useExternalLink={true}
                externalLink={state.imageExternalUrl}
                onExternalLinkChange={(url) => updateState({ imageExternalUrl: url })}
                label={'Article Image'}
                previewUrl={article?.image?.url}
                onChange={(_, file) => updateState({ image: file })}
              />
            </SharedGridItem>
          </SharedNamedChild>

          <SharedNamedChild name={SharedFormModalChildrenNames.actions}>
            <SharedButton onClick={handleCancel}>Cancel</SharedButton>
            <SharedButton onClick={() => handleSubmit()}>Submit</SharedButton>
          </SharedNamedChild>
        </FormModal>

        {/* Sub Article Modal */}
        <FormModal open={state.isSubModalOpen} title={'Manage Sub Article'} onClose={() => updateState({ isModalOpen: false })}>
          <SharedNamedChild name={SharedFormModalChildrenNames.content}>
            <SharedOutlinedContainer label={'Turn On/Off'} center={false} noPadding={true} className={'u-pb--5'}>
              <SharedGridSwitch
                gridItemProps={{ className: 'u-pl--3' }}
                label={'State:'}
                value={state.subArticle?.state ?? false}
                onChange={(state) => handleChangeSubArticle('state', state)}
              />
            </SharedOutlinedContainer>

            <SharedGridItem xs={12}>
              <SharedTextField label={'Content'} value={state.subArticle?.content ?? ''} onChange={(e) => handleChangeSubArticle('content', e.target.value)} />
            </SharedGridItem>

            <SharedGridItem xs={12}>
              <SharedTextField label={'Link'} value={state.subArticle?.link ?? ''} onChange={(e) => handleChangeSubArticle('link', e.target.value)} />
            </SharedGridItem>

            <SharedGridItem xs={12}>
              <SharedImageUpload
                useExternalLink={true}
                externalLink={state.subArticle?.imageExternalUrl}
                onExternalLinkChange={(url) => handleChangeSubArticle('imageExternalUrl', url)}
                label={'Article Image'}
                previewUrl={state.subArticle?.imagePreviewUrl}
                onChange={(_, file) => handleChangeSubArticle('image', file)}
                onPreviewUrlChange={(url) => handleChangeSubArticle('imagePreviewUrl', url)}
              />
            </SharedGridItem>
          </SharedNamedChild>

          <SharedNamedChild name={SharedFormModalChildrenNames.actions}>
            <SharedButton onClick={handleCancelSubArticle}>Cancel</SharedButton>
            <SharedButton onClick={handleSaveSubArticle}>Submit</SharedButton>
          </SharedNamedChild>
        </FormModal>
      </SharedGridContainer>
    </SharedOutlinedContainer>
  );
}

import { SharedForm } from '@/features/shared/form/SharedForm';
import { SharedGridItem } from '@/features/shared/grid/SharedGridItem';
import { SharedHeading } from '@/features/shared/SharedHeading';
import { SharedButton } from '@/features/shared/SharedButton';
import { AdminSharedArticle, ArticleSubmitPayload } from '@/features/FeatureAdmin/AdminShared/AdminSharedArticle';

export interface FeatureAdminNewsViewProps {
  initialLoading?: boolean;
  isSubmitLoading?: boolean;
  handleArticleSubmit?: (payload: ArticleSubmitPayload) => void;
  handleSubmit?: () => void;
}

export function FeatureAdminNewsView({ initialLoading, isSubmitLoading, handleSubmit, handleArticleSubmit }: FeatureAdminNewsViewProps) {
  // function handleArticleSubmit(payload: ArticleSubmitPayload) {
  //   console.log(payload);
  // }

  return (
    <SharedForm isLoading={initialLoading} onSubmit={handleSubmit}>
      <SharedGridItem centerText>
        <SharedHeading level={4}> News </SharedHeading>
      </SharedGridItem>

      <AdminSharedArticle onSubmit={handleArticleSubmit} />

      <SharedGridItem>
        <SharedButton fullWidth btnType={'LoadingButton'} loading={isSubmitLoading} type={'submit'}>
          Save
        </SharedButton>
      </SharedGridItem>
    </SharedForm>
  );
}

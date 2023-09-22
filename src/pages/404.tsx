import { FeatureComingSoonContainer, getStaticProps } from '@/features/FeatureComingSoon/FeatureComingSoonContainer';
import { SharedHeading } from '@/components/shared/text/SharedHeading';

export { getStaticProps };

export default function Page404() {
  return (
    <div className={'u-center--y u-flex--auto-height u-flex--column'}>
      <SharedHeading level={5} className={'u-text--align-center'}>
        404 | Page Not Found
      </SharedHeading>
    </div>
  );
}

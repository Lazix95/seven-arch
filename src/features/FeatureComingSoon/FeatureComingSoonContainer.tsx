/* eslint-disable react-hooks/exhaustive-deps */
import { FeatureComingSoonView } from '@/features/FeatureComingSoon/FeatureComingSoonView';
import { createGetStaticProps } from '@/utils/ssgUtils';
import { useSystemContext } from '@/context/SystemContext';
import { useEffect } from 'react';

export const getStaticProps = createGetStaticProps([]);

export interface FeatureComingSoonContainerProps {}

export function FeatureComingSoonContainer({}: FeatureComingSoonContainerProps) {
  const { setFullWidth, resetMainViewMaxWidthToDefault } = useSystemContext();

  useEffect(() => {
    setFullWidth();
    return () => {
      resetMainViewMaxWidthToDefault();
    };
  }, []);

  return <FeatureComingSoonView />;
}

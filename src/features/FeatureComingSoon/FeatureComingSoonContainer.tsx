/* eslint-disable react-hooks/exhaustive-deps */
import { FeatureComingSoonView } from '@/features/FeatureComingSoon/FeatureComingSoonView';
import { createGetStaticProps } from '@/utils/ssgUtils';
import { fetchBasicInfo } from '@/features/firebase/api/basicDataApi';
import { fetchSocialNetworks } from '@/features/firebase/api/socialNetworksDataApi';
import { useSystemContext } from '@/context/SystemContext';
import { useEffect } from 'react';

export const getStaticProps = createGetStaticProps([fetchBasicInfo, fetchSocialNetworks]);

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

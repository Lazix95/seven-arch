import { fetchBasicInfo } from '@/features/firebase/api/basicDataApi';
import { fetchSocialNetworks } from '@/features/firebase/api/socialNetworksDataApi';

export function convertToProps(obj: object) {
  return { props: obj };
}

export function createGetStaticProps(getMethods: GetStaticPropsFnc[], basics: GetStaticPropsFnc[] = [fetchBasicInfo, fetchSocialNetworks]) {
  return async () => {
    let responses = {};
    const rawResponses = await Promise.all([...basics, ...getMethods].map((meth) => meth()));
    rawResponses.forEach((rawResponse) => {
      responses = { ...responses, ...(rawResponse || {}) };
    });
    return convertToProps(responses);
  };
}

export type GetStaticPropsFnc = () => Promise<any>;

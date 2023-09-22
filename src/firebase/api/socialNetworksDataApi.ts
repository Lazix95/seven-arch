import { socialNetworksMap } from '@/constants/socialNetworkItems';
import { storeDocument } from '../utils/firebaseDocumentUtils';
import { DocumentSocialNetwork } from '@/models/socialNetworks';
import { getEntities } from '@/firebase/utils/firebaseEntityUtils';

export async function fetchSocialNetworks(): Promise<DataSocialNetworks> {
  const socialNetworksRaw = await getEntities<DocumentSocialNetwork>('socialNetworks');

  const socialNetworks: DocumentSocialNetwork[] = Object.values(socialNetworksMap).reduce<DocumentSocialNetwork[]>((acc, socialNetwork) => {
    const socNetRaw = socialNetworksRaw.find((socNet) => socNet.slug === socialNetwork.slug);
    const socNet: DocumentSocialNetwork = {
      id: socialNetwork.id,
      name: socialNetwork.name,
      state: socNetRaw?.state || false,
      slug: socialNetwork.slug,
      link: socNetRaw?.link || '',
      order: socNetRaw?.order || socialNetwork.order,
    };

    return [...acc, socNet];
  }, []);
  return { socialNetworks };
}

export async function saveSocialNetworks(socialNetworks: DocumentSocialNetwork[]) {
  const requests = socialNetworks.map((socialNetwork) => {
    return storeDocument('socialNetworks', `socialNetwork_${socialNetwork.slug}`, socialNetwork);
  });
  return await Promise.all(requests);
}

export interface DataSocialNetworks {
  readonly socialNetworks: DocumentSocialNetwork[];
}

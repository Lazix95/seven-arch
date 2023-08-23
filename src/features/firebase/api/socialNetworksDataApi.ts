import { socialNetworksMap } from '@/constants/socialNetworkItems';
import { getDocument, storeDocument } from '../utils/firebaseDocumentUtils';
import { DocumentSocialNetwork } from '@/models/socialNetworks';

export async function fetchSocialNetworks(): Promise<DataSocialNetworks> {
  const requests = Object.values(socialNetworksMap).map((localSocNet) => {
    const fnc = async () => ({
      data: await getDocument<DocumentSocialNetwork | undefined>('socialNetworks', `socialNetwork_${localSocNet.slug}`),
      localSocNet,
    });
    return fnc();
  });

  const socialNetworks: DocumentSocialNetwork[] = (await Promise.all(requests)).reduce<DocumentSocialNetwork[]>((acc, socialNetwork) => {
    const socNet: DocumentSocialNetwork = {
      id: socialNetwork.data?.id || socialNetwork.localSocNet.id,
      name: socialNetwork.data?.name || socialNetwork.localSocNet.name,
      state: socialNetwork.data?.state || false,
      slug: socialNetwork.localSocNet.slug,
      link: socialNetwork.data?.link || '',
      order: socialNetwork.data?.order || socialNetwork.localSocNet.order,
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

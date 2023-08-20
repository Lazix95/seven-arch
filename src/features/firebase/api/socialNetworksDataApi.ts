import { socialNetworksMap } from '@/constants/socialNetworkItems';
import { getDocument } from '../utils/firebaseDocumentUtils';
import { DocumentSocialNetwork, DocumentSocialNetworkWithIcon } from '@/models/socialNetworks';

export async function fetchSocialNetworks(options: { withIcons?: boolean } = {}): Promise<DataSocialNetworks> {
  const requests = Object.values(socialNetworksMap).map((localSocNet) => {
    const fnc = async () => ({
      data: await getDocument<DocumentSocialNetwork | undefined>('socialNetworks', `socialNetwork_${localSocNet.slug}`),
      localSocNet,
    });
    return fnc();
  });

  const socialNetworks: DocumentSocialNetworkWithIcon[] = (await Promise.all(requests)).reduce<DocumentSocialNetworkWithIcon[]>((acc, socialNetwork) => {
    const socNet: DocumentSocialNetworkWithIcon = {
      id: socialNetwork.data?.id || socialNetwork.localSocNet.id,
      name: socialNetwork.data?.name || socialNetwork.localSocNet.name,
      state: socialNetwork.data?.state || false,
      slug: socialNetwork.localSocNet.slug,
      ...(socialNetwork.data?.link && { link: socialNetwork.data.link }),
      ...(socialNetwork.data?.order && { order: socialNetwork.data.order }),
      ...(options.withIcons && { Icon: socialNetwork.localSocNet.Icon }),
    };

    return [...acc, socNet];
  }, []);
  return { socialNetworks };
}

export interface DataSocialNetworks {
  readonly socialNetworks: DocumentSocialNetworkWithIcon[];
}

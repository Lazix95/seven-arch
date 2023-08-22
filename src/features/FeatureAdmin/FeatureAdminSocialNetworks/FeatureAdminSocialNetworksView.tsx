import { SharedHeading } from '@/features/shared/SharedHeading';
import { SharedForm } from '@/features/shared/form/SharedForm';
import { SharedGridItem } from '@/features/shared/grid/SharedGridItem';
import { SharedOutlinedContainer } from '@/features/shared/grid/SharedOutlinedContainer';
import { DocumentSocialNetworkWithIcon, SocialNetworkSlug } from '@/models/socialNetworks';
import { useEffect, useState } from 'react';
import { SharedButton } from '@/features/shared/SharedButton';
import { FeatureAdminSocialNetworkToggleItem } from '@/features/FeatureAdmin/FeatureAdminSocialNetworks/components/FeatureAdminSocialNetworkToggleItem';
import { FeatureAdminSocialNetworkForm } from '@/features/FeatureAdmin/FeatureAdminSocialNetworks/components/FeatureAdminSocialNetworkForm';
import { socialNetworksMap } from '@/constants/socialNetworkItems';

export interface FeatureSocialNetworksViewProps {
  socialNetworks: DocumentSocialNetworkWithIcon[];
  isSubmitLoading: boolean;
  initLoading: boolean;
  onSubmit?: (payload: DocumentSocialNetworkWithIcon[]) => void;
}

export function FeatureAdminSocialNetworksView({ socialNetworks, initLoading, isSubmitLoading, onSubmit }: FeatureSocialNetworksViewProps) {
  const [state, setState] = useState<{ [key in SocialNetworkSlug]: DocumentSocialNetworkWithIcon }>(
    socialNetworks.reduce(
      (acc, item) => {
        acc[item.slug] = item;
        return acc;
      },
      {} as { [key in SocialNetworkSlug]: DocumentSocialNetworkWithIcon },
    ),
  );

  useEffect(() => {
    setState(
      socialNetworks.reduce(
        (acc, item) => {
          acc[item.slug] = item;
          return acc;
        },
        {} as { [key in SocialNetworkSlug]: DocumentSocialNetworkWithIcon },
      ),
    );
  }, [socialNetworks]);

  function handleSocialNetworkToggle(socialNetwork: DocumentSocialNetworkWithIcon, state: boolean) {
    setState((prevState) => ({
      ...prevState,
      [socialNetwork.slug]: {
        ...prevState[socialNetwork.slug],
        state,
      },
    }));
  }

  function handleSocialNetworkLinkChange(socialNetwork: DocumentSocialNetworkWithIcon, link: string) {
    setState((prevState) => ({
      ...prevState,
      [socialNetwork.slug]: {
        ...prevState[socialNetwork.slug],
        link,
      },
    }));
  }

  function handleSocialNetworkOrderChange(socialNetwork: DocumentSocialNetworkWithIcon, order: number | undefined) {
    const orderNumber = order ? order : socialNetworksMap[socialNetwork.slug].order;
    const socialWithNewOrder = socialNetworks.find((item) => item.order == orderNumber);

    console.log('orderNumber', orderNumber);
    console.log('socialNetwork', socialWithNewOrder);

    setState((prevState) => ({
      ...prevState,
      [socialNetwork.slug]: {
        ...prevState[socialNetwork.slug],
        order: orderNumber,
      },
      ...(socialWithNewOrder && { [socialWithNewOrder.slug]: { ...socialWithNewOrder, order: socialNetwork.order } }),
    }));
  }

  function handleSubmit() {
    onSubmit?.(Object.values(state));
  }

  return (
    <SharedForm isLoading={initLoading} spacing={3} onSubmit={handleSubmit}>
      <SharedGridItem centerText>
        <SharedHeading level={4}> Social Networks </SharedHeading>
      </SharedGridItem>

      <SharedOutlinedContainer label={'Toggle Social Networks'}>
        {socialNetworks.map((socialNetwork) => (
          <FeatureAdminSocialNetworkToggleItem key={socialNetwork.id} socialNetwork={socialNetwork} onChange={handleSocialNetworkToggle} value={state[socialNetwork.slug].state} />
        ))}
      </SharedOutlinedContainer>

      {Object.values(state)
        .filter((socialNetwork) => socialNetwork.state)
        .map((socialNetwork) => (
          <FeatureAdminSocialNetworkForm
            key={socialNetwork.id}
            socialNetwork={socialNetwork}
            linkValue={state[socialNetwork.slug].link}
            orderValue={state[socialNetwork.slug].order}
            onLinkChange={handleSocialNetworkLinkChange}
            onOrderChange={handleSocialNetworkOrderChange}
          />
        ))}

      <SharedGridItem>
        <SharedButton fullWidth btnType={'LoadingButton'} loading={isSubmitLoading} type={'submit'}>
          Save
        </SharedButton>
      </SharedGridItem>
    </SharedForm>
  );
}

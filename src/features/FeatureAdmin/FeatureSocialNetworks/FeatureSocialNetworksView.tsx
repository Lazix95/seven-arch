import { SharedHeading } from '@/features/shared/SharedHeading';
import { SharedForm } from '@/features/shared/form/SharedForm';
import { SharedGridSwitch } from '@/features/shared/form/SharedGridSwitch';
import { SharedTextField } from '@/features/shared/form/SharedTextField';
import { SharedGridItem } from '@/features/shared/grid/SharedGridItem';
import { SharedOutlinedContainer } from '@/features/shared/grid/SharedOutlinedContainer';
import clsx from 'clsx';
import { DocumentSocialNetworkWithIcon, SocialNetworkSlug } from '@/models/socialNetworks';
import { useEffect, useState, ChangeEvent } from 'react';
import { SharedButton } from '@/features/shared/SharedButton';


export interface FeatureSocialNetworksViewProps {
  socialNetworks: DocumentSocialNetworkWithIcon[];
  isSubmitLoading: boolean;
  initLoading: boolean;
  onSubmit?: (payload: DocumentSocialNetworkWithIcon[]) => void;
}

export function FeatureSocialNetworksView({ socialNetworks, initLoading, isSubmitLoading, onSubmit }: FeatureSocialNetworksViewProps) {
  const [state, setState] = useState<{ [key in SocialNetworkSlug]: DocumentSocialNetworkWithIcon }>(
    socialNetworks.reduce((acc, item) => {
      acc[item.slug] = item;
      return acc;
    }, {} as { [key in SocialNetworkSlug]: DocumentSocialNetworkWithIcon })
  );

  useEffect(() => {
    setState(
      socialNetworks.reduce((acc, item) => {
        acc[item.slug] = item;
        return acc;
      }, {} as { [key in SocialNetworkSlug]: DocumentSocialNetworkWithIcon })
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

  function handleSocialNetworkLinkChange(socialNetwork: DocumentSocialNetworkWithIcon, event: ChangeEvent<HTMLInputElement>) {
    const link = event.target.value;
    setState((prevState) => ({
      ...prevState,
      [socialNetwork.slug]: {
        ...prevState[socialNetwork.slug],
        link,
      },
    }));
  }

  function handleSocialNetworkOrderChange(socialNetwork: DocumentSocialNetworkWithIcon, event: ChangeEvent<HTMLInputElement>) {
    const order = event.target.value;
    setState((prevState) => ({
      ...prevState,
      [socialNetwork.slug]: {
        ...prevState[socialNetwork.slug],
        order,
      },
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
        {socialNetworks.map((item) => (
          <SharedGridSwitch key={item.id} value={state[item.slug].state} onChange={(state) => handleSocialNetworkToggle(item, state)}>
            <div style={{ marginLeft: '30%' }} className={clsx(['u-center--x', 'u-test-align-start'])}>
              {!!item.Icon && <item.Icon className={'u-mr--3'} />}
              <span>{item.name}</span>
            </div>
          </SharedGridSwitch>
        ))}
      </SharedOutlinedContainer>

      {Object.values(state)
        .filter((item) => item.state)
        .map((item) => (
          <SharedOutlinedContainer
            key={item.id}
            label={
              <div className={'u-center--x'}>
                {item.Icon && <item.Icon className={'u-mr--3'} />} {item.name}
              </div>
            }
          >
            <SharedTextField
              style={{ marginTop: '20px' }}
              fullWidth
              label={'Link'}
              value={state[item.slug].link ?? ''}
              onChange={(event) => handleSocialNetworkLinkChange(item, event as any)}
            />
            <SharedTextField fullWidth label={'Order'} value={state[item.slug].order ?? ''} onChange={(event) => handleSocialNetworkOrderChange(item, event as any)} />
          </SharedOutlinedContainer>
        ))}

      <SharedGridItem>
        <SharedButton fullWidth btnType={'LoadingButton'} loading={isSubmitLoading} type={'submit'}>
          Save
        </SharedButton>
      </SharedGridItem>
    </SharedForm>
  );
}

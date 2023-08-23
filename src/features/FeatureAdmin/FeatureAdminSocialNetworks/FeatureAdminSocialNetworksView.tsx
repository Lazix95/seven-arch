import { SharedHeading } from '@/features/shared/SharedHeading';
import { SharedForm } from '@/features/shared/form/SharedForm';
import { SharedGridItem } from '@/features/shared/grid/SharedGridItem';
import { SharedOutlinedContainer } from '@/features/shared/grid/SharedOutlinedContainer';
import { DocumentSocialNetwork, SocialNetworkSlug } from '@/models/socialNetworks';
import { useEffect, useMemo, useState } from 'react';
import { SharedButton } from '@/features/shared/SharedButton';
import { FeatureAdminSocialNetworkToggleItem } from '@/features/FeatureAdmin/FeatureAdminSocialNetworks/components/FeatureAdminSocialNetworkToggleItem';
import { FeatureAdminSocialNetworkForm } from '@/features/FeatureAdmin/FeatureAdminSocialNetworks/components/FeatureAdminSocialNetworkForm';
import ReactDragListView from 'react-drag-listview';
import { arrayToObject } from '@/utils/objectUtils';
import { sortArray } from '@/utils/arrayUtils';

export interface FeatureSocialNetworksViewProps {
  socialNetworks: DocumentSocialNetwork[];
  isSubmitLoading: boolean;
  initLoading: boolean;
  onSubmit?: (payload: DocumentSocialNetwork[]) => void;
}

type FeatureAdminSocialNetworksViewState = { [key in SocialNetworkSlug]: DocumentSocialNetwork };

export function FeatureAdminSocialNetworksView({ socialNetworks, initLoading, isSubmitLoading, onSubmit }: FeatureSocialNetworksViewProps) {
  const [state, setState] = useState<FeatureAdminSocialNetworksViewState>(arrayToObject(sortArray(socialNetworks, 'order'), 'slug'));

  useEffect(() => {
    setState(arrayToObject(socialNetworks, 'slug'));
  }, [socialNetworks]);

  function handleSocialNetworkToggle(socialNetwork: DocumentSocialNetwork, state: boolean) {
    setState((prevState) => ({
      ...prevState,
      [socialNetwork.slug]: {
        ...prevState[socialNetwork.slug],
        state,
      },
    }));
  }

  function handleSocialNetworkLinkChange(socialNetwork: DocumentSocialNetwork, link: string) {
    setState((prevState) => ({
      ...prevState,
      [socialNetwork.slug]: {
        ...prevState[socialNetwork.slug],
        link,
      },
    }));
  }

  function handleSocialNetworkDragEnd(fromIndex: number, toIndex: number) {
    setState((oldState) => {
      const socialNetworksCopy = Object.values({ ...oldState });
      const [removed] = socialNetworksCopy.splice(fromIndex, 1);
      socialNetworksCopy.splice(toIndex, 0, removed);
      socialNetworksCopy.map((item, index) => (item.order = index + 1));
      return arrayToObject(socialNetworksCopy, 'slug');
    });
  }

  function handleSubmit() {
    onSubmit?.(Object.values(state));
  }

  const socialNetworkArray = useMemo(() => sortArray(Object.values(state), 'order'), [state]);
  const socialNetworkFilteredArray = useMemo(
    () =>
      sortArray(
        Object.values(state).filter((social) => social.state),
        'order',
      ),
    [state],
  );

  const reactDragListViewProps = {
    nodeSelector: 'div.DragElement',
    handleSelector: '.dndHandle',
    lineClassName: 'DragLine',
  } as any;

  return (
    <SharedForm isLoading={initLoading} spacing={3} onSubmit={handleSubmit}>
      <SharedGridItem centerText>
        <SharedHeading level={4}> Social Networks </SharedHeading>
      </SharedGridItem>

      <SharedOutlinedContainer label={'Toggle Social Networks'}>
        <ReactDragListView onDragEnd={handleSocialNetworkDragEnd} {...reactDragListViewProps}>
          {socialNetworkArray.map((socialNetwork) => (
            <FeatureAdminSocialNetworkToggleItem
              className={'DragElement'}
              key={socialNetwork.id}
              socialNetwork={socialNetwork}
              onChange={handleSocialNetworkToggle}
              value={state[socialNetwork.slug]?.state}
            />
          ))}
        </ReactDragListView>
      </SharedOutlinedContainer>

      {socialNetworkFilteredArray.map((socialNetwork) => (
        <FeatureAdminSocialNetworkForm
          key={socialNetwork.id}
          socialNetwork={socialNetwork}
          linkValue={state[socialNetwork.slug].link}
          onLinkChange={handleSocialNetworkLinkChange}
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

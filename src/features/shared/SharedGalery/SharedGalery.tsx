import { CircularProgress, Grid } from '@mui/material';
import { DeleteForeverIcon, DragIndicatorIcon } from '@/features/shared/icons/materialUiIcons';
import { ExternalImage, FirebaseImage } from '../../firebase/utils/firebaseImageUtils';
import { SharedOutlinedContainer } from '../grid/SharedOutlinedContainer';
import { SharedButton } from '../form/SharedButton';
import classes from './SharedGalery.module.scss';
import { SharedIf } from '../util/SharedIf';
import { SharedDragAndDrop } from '@/features/shared/util/SharedDragAndDrop';
import { changeArrayElementPosition, sortArray } from '@/utils/arrayUtils';
import { useMemo } from 'react';

export interface SharedGaleryProps {
  loading?: boolean;
  images?: (FirebaseImage | ExternalImage)[];
  onChangeImageOrder?: (image: FirebaseImage | ExternalImage, order: number) => Promise<void>;
  onRemoveImage?: (image: FirebaseImage | ExternalImage) => void;
}

export function SharedGalery({ loading, images = [], onRemoveImage, onChangeImageOrder }: SharedGaleryProps) {
  const sortedImages = useMemo(() => {
    return sortArray(images, 'order');
  }, [images]);

  function handleRemoveImage(image: FirebaseImage | ExternalImage) {
    onRemoveImage?.(image);
  }

  async function handleDragEnd(fromIndex: number, endIndex: number) {
    const newImages = changeArrayElementPosition(images, fromIndex, endIndex);
    for (const [index, image] of newImages.entries()) {
      const newOrder = index + 1;
      if (image.order !== newOrder) onChangeImageOrder?.(image, newOrder);
    }
  }

  return (
    <SharedOutlinedContainer className={classes['shared-galery']} label={'Slider Images'} style={{ marginBottom: '20px' }}>
      <SharedDragAndDrop onDragEnd={handleDragEnd}>
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
          {sortedImages.map((img) => (
            <div className={'DragElement'} key={img.id} style={{ width: '140.5px', padding: '5px', aspectRatio: '19/9' }}>
              <div className={classes['shared-galery__hover-zone']} style={{ height: '100%' }}>
                <div className={classes['shared-galery__overlay']}>
                  <DragIndicatorIcon style={{ zIndex: 2, transform: 'rotateZ(90deg)' }} className={'dndHandle'} />
                  <SharedButton onClick={() => handleRemoveImage(img)} btnType={'Icon'}>
                    <DeleteForeverIcon style={{ fontSize: '30px' }} />
                  </SharedButton>
                </div>
                <div style={{ height: '100%', width: '100%', backgroundImage: `url(${img.url})`, backgroundPosition: 'center', backgroundSize: 'cover' }} />
              </div>
            </div>
          ))}
        </div>
      </SharedDragAndDrop>
      <SharedIf RIf={loading}>
        <Grid item xs={3} style={{ height: '150px' }}>
          <CircularProgress style={{ marginTop: '30px' }} />
        </Grid>
      </SharedIf>
    </SharedOutlinedContainer>
  );
}

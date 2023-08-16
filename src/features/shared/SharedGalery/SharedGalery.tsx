import { CircularProgress, Grid, Typography } from '@mui/material';
import { FirebaseImage } from '../../firebase/utils/firebaseImageUtils';
import { SharedOutlinedContainer } from '../SharedOutlinedContainer';
import { SharedButton } from '../SharedButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import classes from './SharedGalery.module.scss';
import { SharedIf } from '../SharedIf';

export interface SharedGaleryProps {
  loading?: boolean;
  images?: FirebaseImage[];
  onRemoveImage?: (image: FirebaseImage) => void;
}

export function SharedGalery({ loading, images = [], onRemoveImage }: SharedGaleryProps) {
  function handleRemoveImage(image: FirebaseImage) {
    onRemoveImage?.(image);
  }

  return (
    <SharedOutlinedContainer className={classes['shared-galery']} label={'Slider Images'} style={{ marginBottom: '20px' }}>
      <Grid container spacing={4}>
        {images.map((img) => (
          <Grid item xs={3} key={img.dbPath} style={{ height: '150px' }}>
            <div className={classes['shared-galery__hover-zone']} style={{ height: '100%' }}>
              <div className={classes['shared-galery__overlay']}>
                <SharedButton onClick={() => handleRemoveImage(img)} btnType={'Icon'}>
                  <DeleteForeverIcon style={{ fontSize: '30px' }} />
                </SharedButton>
              </div>
              <div style={{ height: '100%', width: '100%', backgroundImage: `url(${img.url})`, backgroundPosition: 'center', backgroundSize: 'cover' }} />
            </div>
          </Grid>
        ))}
        <SharedIf RIf={loading}>
          <Grid item xs={3} style={{ height: '150px' }}>
            <CircularProgress style={{ marginTop: '30px' }} />
          </Grid>
        </SharedIf>
      </Grid>
    </SharedOutlinedContainer>
  );
}

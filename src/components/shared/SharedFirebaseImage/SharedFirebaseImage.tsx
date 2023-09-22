import Image from 'next/image';
import styles from './FirebaseImage.module.scss';
import { Typography } from '@mui/material';
import { SharedIf } from '@/components/shared/util/SharedIf';
import { ExternalImage, FirebaseImage } from '../../../features/firebase/utils/firebaseImageUtils';
import { DivProps } from '@/models/generalModels';

export interface SharedFirebaseImage {
  image?: FirebaseImage | ExternalImage;
  url?: string;
  alt?: string;
  text?: string;
  type?: 'img' | 'div';
  noZoom?: boolean;
  onClick?: () => void;
  imageProps?: DivProps;
}

export function SharedFirebaseImage({ image, text, type = 'img', alt, url, noZoom, imageProps, onClick }: SharedFirebaseImage) {
  return (
    <SharedIf RIf={!!image || !!url}>
      <div
        className={`${styles.SharedContentImage} ${styles.SharedContentImage_container} ${styles['SharedContentImage_fullSize']} ${noZoom ? '' : 'u-mouse-pointer'}`}
        style={{ aspectRatio: '16/9' }}
        onClick={onClick}
      >
        <SharedIf RIf={!!text}>
          <div className={styles.SharedContentImage_overlay} />
          <Typography variant={'subtitle1'} className={styles['SharedContentImage_text']}>
            {text}
          </Typography>
        </SharedIf>

        <SharedIf RIf={type === 'img'}>
          <Image
            className={`${styles['SharedContentImage_fullSize']} ${noZoom ? '' : styles['SharedContentImage__image-zoom']}`}
            style={{ objectFit: 'cover', aspectRatio: '16/9' }}
            width={1000}
            height={1000}
            src={image?.url ?? url ?? ''}
            alt={alt ?? ''}
          />
        </SharedIf>

        <SharedIf RIf={type === 'div'}>
          <div
            className={`${styles['SharedContentImage_fullSize']} ${styles['SharedContentImage__image-div']} ${noZoom ? '' : styles['SharedContentImage__image-zoom']} ${
              imageProps?.className ?? ''
            }`}
            style={{
              backgroundImage: `url('${image?.url ?? url ?? ''}')`,
              ...(imageProps?.style ?? {}),
            }}
          />
        </SharedIf>
      </div>
    </SharedIf>
  );
}

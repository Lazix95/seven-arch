import Image from 'next/image';
import styles from './FirebaseImage.module.scss';
import { Typography } from '@mui/material';
import { SharedIf } from '@/features/shared/SharedIf';
import { FirebaseImage } from '../../utils/firebaseImageUtils';

export interface SharedFirebaseImage {
  image?: FirebaseImage;
  alt?: string;
  text?: string;
  type?: 'img' | 'div';
}

export function SharedFirebaseImage({ image, text, type = 'img', alt }: SharedFirebaseImage) {
  return (
    <SharedIf RIf={!!image}>
      <div className={`${styles.SharedContentImage} ${styles.SharedContentImage_container} ${styles['SharedContentImage_fullSize']}`} style={{ aspectRatio: '16/9' }}>
        <SharedIf RIf={!!text}>
          <div className={styles.SharedContentImage_overlay} />
          <Typography variant={'subtitle1'} className={styles['SharedContentImage_text']}>
            {text}
          </Typography>
        </SharedIf>

        <SharedIf RIf={type === 'img'}>
          <Image
            className={`${styles['SharedContentImage_fullSize']} ${styles['SharedContentImage__image-zoom']}`}
            style={{ objectFit: 'cover', aspectRatio: '16/9' }}
            width={1000}
            height={1000}
            src={image?.url ?? ''}
            alt={alt ?? ''}
          />
        </SharedIf>

        <SharedIf RIf={type === 'div'}>
          <div
            className={`${styles['SharedContentImage_fullSize']} ${styles['SharedContentImage__image-div']} ${styles['SharedContentImage__image-zoom']}`}
            style={{
              backgroundImage: `url('${image?.url}')`,
            }}
          />
        </SharedIf>
      </div>
    </SharedIf>
  );
}

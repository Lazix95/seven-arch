import Image from 'next/image';
import styles from './FirebaseImage.module.scss';
import { Typography } from '@mui/material';
import { getImageLink } from '../../firebase';
import { useEffect, useState } from 'react';
import { FolderKeys } from '../../models/firebaseBaseModels';
import { SharedIf } from '@/features/shared/SharedIf';

interface SharedContentImageProps {
  folder: FolderKeys;
  name: string;
  text?: string;
  type?: 'img' | 'div';
}

export function FirebaseImage({ folder, name, text, type = 'img' }: SharedContentImageProps) {
  const [image, setImage] = useState('');

  useEffect(() => {
    getImage();
  });

  async function getImage() {
    const imgUrl = await getImageLink({ folder, name });
    setImage(imgUrl || '');
  }

  return (
    <SharedIf RIf={!!image}>
      <div className={`${styles.SharedContentImage_container} ${styles['SharedContentImage_fullSize']}`} style={{ aspectRatio: '16/9' }}>
        <SharedIf RIf={!!text}>
          <div className={styles.SharedContentImage_overlay} />
          <Typography variant={'subtitle1'} className={styles['SharedContentImage_text']}>
            {text}
          </Typography>
        </SharedIf>
        <SharedIf RIf={type === 'img'}>
          <Image style={{ width: '100%', height: '100%', objectFit: 'cover', aspectRatio: '16/9' }} width={1000} height={1000} src={image} alt={name} />
        </SharedIf>

        <SharedIf RIf={type === 'div'}>
          <div
            style={{
              backgroundImage: `url('${image}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              width: '100%',
              height: '100%',
            }}
          />
        </SharedIf>
      </div>
    </SharedIf>
  );
}

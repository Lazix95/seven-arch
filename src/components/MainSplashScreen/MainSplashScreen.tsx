/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import styles from './MainSplashScreen.module.scss';
import clsx from 'clsx';
import { LinearProgress } from '@mui/material';

export interface MainSplashScreenProps {
  imageUrl: string | null;
}

export function MainSplashScreen({ imageUrl }: MainSplashScreenProps) {
  const [showSplash, setShowSplash] = useState(true);
  const [isFadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setFadeIn(false);
      await new Promise((resolve) => setTimeout(resolve, 800));
      setShowSplash(false);
    };
    loadData();
  }, []);

  return (
    <div>
      {showSplash && imageUrl && (
        <div className={clsx([styles['splash-screen'], { [styles['splash-screen-out']]: !isFadeIn }])}>
          <div
            style={{ backgroundImage: `url(${imageUrl})` }}
            className={clsx([
              styles['splash-image'],
              { [styles['splash-image--in']]: isFadeIn, [styles['splash-image--out']]: !isFadeIn },
              'u-fit-background',
              'u-full-height',
              'u-full-width',
            ])}
          />
          <div className={clsx([styles['overlay'], { [styles['splash-image--in']]: isFadeIn, [styles['splash-image--out']]: !isFadeIn }])}>
            <LinearProgress color={'primary'} className={styles.loader} />
          </div>
        </div>
      )}
    </div>
  );
}

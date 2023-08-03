/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import styles from './SharedSplashScreen.module.scss'; // Import the CSS file for styling
import clsx from 'clsx';
import { LinearProgress } from '@mui/material';

export function SharedSplashScreen() {
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
      {showSplash && (
        <div className={clsx([styles['splash-screen'], { [styles['splash-screen-out']]: !isFadeIn }])}>
          <img
            src="https://www.sevenarch.rs/resources/Prednja%20vizitke%20horizontalna.jpg"
            alt="Splash Screen"
            className={clsx([styles['splash-image'], { [styles['splash-image--in']]: isFadeIn, [styles['splash-image--out']]: !isFadeIn }])}
          />
          <div className={clsx([styles['overlay'], { [styles['splash-image--in']]: isFadeIn, [styles['splash-image--out']]: !isFadeIn }])}>
            <LinearProgress color={'primary'} className={styles.loader} />
          </div>
        </div>
      )}
    </div>
  );
}

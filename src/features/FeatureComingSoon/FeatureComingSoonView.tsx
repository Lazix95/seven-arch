import styles from './FeatureComingSoonView.module.scss';
import { FirebaseImage } from '@/features/firebase/components/FirebaseImage';

export interface FeatureComingSoonViewProps {}

export function FeatureComingSoonView({}: FeatureComingSoonViewProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.image}>
        <h2 className={styles.text}>Coming soon...</h2>
        <FirebaseImage
          imageProps={{ style: { backgroundPositionY: '72% !important', backgroundPosition: 'bottom' } }}
          noZoom={true}
          type={'div'}
          url={'https://images.pexels.com/photos/5582870/pexels-photo-5582870.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'}
        />
      </div>
    </div>
  );
}

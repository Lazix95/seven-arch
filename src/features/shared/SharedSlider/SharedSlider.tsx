import Slider, { Settings } from 'react-slick';
import { SharedSliderDot } from './SharedSliderDot';
import { SharedSliderImage } from './SharedSliderImage';
import classes from './SharedSlider.module.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FirebaseImage } from '@/features/firebase/utils/firebaseImageUtils';

interface SharedSliderProps {
  images?: FirebaseImage[];
}

export function SharedSlider({ images = [] }: SharedSliderProps) {
  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    adaptiveHeight: true,
    autoplaySpeed: 10000,
    arrows: false,
    autoplay: true,
    customPaging: SharedSliderDot,
  };
  return (
    <div style={{ width: 'auto', height: 'calc(100vh - 64px)' }} className={classes.slider}>
      <div style={{ position: 'absolute', width: '100vw', height: '100vh', maxWidth: '100%', top: 0, left: 0 }}>
        <div className={'overlay'} />
        <Slider {...settings}>
          {images.map((image) => (
            <SharedSliderImage key={image.dbPath} image={image} />
          ))}
        </Slider>
      </div>
    </div>
  );
}

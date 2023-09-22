import Slider, { Settings } from 'react-slick';
import { MainSliderDot } from './MainSliderDot';
import { MainSliderImage } from './MainSliderImage';
import classes from './MainSlider.module.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ExternalImage, FirebaseImage } from '@/firebase/utils/firebaseImageUtils';

interface MainSliderProps {
  images?: (FirebaseImage | ExternalImage)[];
}

export function MainSlider({ images = [] }: MainSliderProps) {
  const settings: Settings = {
    lazyLoad: 'progressive',
    dots: true,
    infinite: true,
    speed: 500,
    adaptiveHeight: true,
    autoplaySpeed: 10000,
    arrows: false,
    autoplay: true,
    customPaging: MainSliderDot,
  };

  return (
    <div className={classes.slider}>
      <div className={classes.container}>
        <div className={'overlay'} />
        <Slider {...settings}>
          {images.map((image) => (
            <MainSliderImage key={image.dbPath} image={image} />
          ))}
        </Slider>
      </div>
    </div>
  );
}

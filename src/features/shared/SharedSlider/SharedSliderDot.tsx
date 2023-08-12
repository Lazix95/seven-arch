import classes from './SharedSlider.module.scss';

export function SharedSliderDot() {
  return (
    <svg viewBox="0 0 40 40" width="20" height="20">
      <circle cx="20" cy="20" r="12" className={`${classes.outer} outer`} opacity="1"></circle>
      <circle cx="20" cy="20" r="5.5" className={classes.inner} opacity="1"></circle>
    </svg>
  );
}

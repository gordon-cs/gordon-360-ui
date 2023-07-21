import Confetti from 'react-dom-confetti';
import { theme360 } from 'theme';

const GordonConfetti = ({ active, colorOption, colors }) => {
  let config = {
    angle: 90,
    spread: 360,
    startVelocity: 40,
    elementCount: 200,
    dragFriction: 0.12,
    duration: 6000,
    stagger: 3,
    width: '10px',
    height: '10px',
    perspective: '500px',
  };

  const themeColors = theme360.colorSchemes.light.palette;

  if (colors) {
    config.colors = colors;
  } else if (colorOption === 'Gordon') {
    config.colors = [
      '#ddd',
      themeColors.primary.main,
      themeColors.secondary.main,
      themeColors.error.light,
      themeColors.success.main,
    ];
  } else if (colorOption === 'GordonBlue') {
    config.colors = ['#ddd', themeColors.primary.main, themeColors.secondary.main];
  }

  return <Confetti active={active} config={config} />;
};

export default GordonConfetti;

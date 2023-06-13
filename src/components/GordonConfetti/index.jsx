import Confetti from 'react-dom-confetti';
import { newTheme } from '../../theme';

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

  if (colors) {
    config.colors = colors;
  } else if (colorOption === 'Gordon') {
    config.colors = [
      '#ddd',
      newTheme.vars.palette.primary[300],
      newTheme.vars.palette.secondary[300],
      newTheme.vars.palette.warning.dark,
      newTheme.vars.palette.success,
    ];
  } else if (colorOption === 'GordonBlue') {
    config.colors = [
      '#ddd',
      newTheme.vars.palette.primary[300],
      newTheme.vars.palette.secondary[300],
    ];
  }

  return <Confetti active={active} config={config} />;
};

export default GordonConfetti;

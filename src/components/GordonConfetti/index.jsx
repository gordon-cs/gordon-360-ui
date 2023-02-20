import Confetti from 'react-dom-confetti';
import { gordonColors } from 'theme';

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
      gordonColors.primary.blue,
      gordonColors.primary.cyan,
      gordonColors.secondary.orange,
      gordonColors.secondary.green,
    ];
  } else if (colorOption === 'GordonBlue') {
    config.colors = ['#ddd', gordonColors.primary.blue, gordonColors.primary.cyan];
  }

  return <Confetti active={active} config={config} />;
};

export default GordonConfetti;

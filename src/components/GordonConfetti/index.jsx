import Confetti from 'react-dom-confetti';
import { gordonColors } from 'theme';

const GordonConfetti = ({ active, colorOption, colors }) => {
  let config = {
    angle: 90,
    spread: 360,
    startVelocity: 20,
    elementCount: 200,
    dragFriction: 0.001, //some numbers were adjusted for the confetti effects
    duration: 10000,
    stagger: 5,
    width: '30px',
    height: '60px',
    perspective: '500px',
  };

  if (colors) {
    config.colors = colors;
  } else if (colorOption === 'Gordon') {
    config.colors = [
      '#ddd',
      gordonColors.primary.blue,
      gordonColors.primary.cyan,
      //gordonColors.secondary.orange,    //these are commented out so the confetti is Gordon's primary colors
      //gordonColors.secondary.green,
    ];
  } else if (colorOption === 'GordonBlue') {
    config.colors = ['#ddd', gordonColors.primary.blue, gordonColors.primary.cyan];
  }

  return <Confetti active={active} config={config} />;
};

export default GordonConfetti;

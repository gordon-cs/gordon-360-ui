import Confetti from 'react-dom-confetti';

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
      styles.gordon_confetti_blue,
      styles.gordon_confetti_cyan,
      styles.gordon_confetti_orange,
      styles.gordon_confetti_green,
    ];
  } else if (colorOption === 'GordonBlue') {
    config.colors = ['#ddd', styles.gordon_confetti_blue, styles.gordon_confetti_cyan];
  }

  return <Confetti active={active} config={config} />;
};

export default GordonConfetti;

import Confetti from 'react-dom-confetti';

const GordonConfetti = ({ active }) => {
  const config = {
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
    //colors: ['#ddd', '#88f', '#00f'],
  };

  return <Confetti active={active} config={config} />;
};

export default GordonConfetti;

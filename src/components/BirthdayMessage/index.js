import { Card } from '@material-ui/core';
import GordonConfetti from 'components/GordonConfetti';
import useWindowSize from 'hooks/useWindowSize';
import { useEffect, useState } from 'react';
import userService from 'services/user';
import BannerSmall from './HBDBanner.png';
import BannerLarge from './HBDBannerLarge.png';

const BirthdayMessage = ({ open, setOpen, name }) => {
  const [confetti, setConfetti] = useState(false);
  const [width] = useWindowSize();

  const popConfetti = () => {
    setConfetti(true);
    setTimeout(() => setConfetti(false), 5000);
  };

  useEffect(() => {
    setTimeout(popConfetti, 1000);
  }, []);

  const Banner = width >= 1280 ? BannerLarge : BannerSmall;

  return userService.isBirthdayToday() ? (
    <Card
      style={{
        cursor: 'pointer',
        backgroundColor: 'transparent',
        boxShadow: 'none',
        marginBottom: '40px',
      }}
      onClick={popConfetti}
    >
      <div style={{ position: 'fixed', zIndex: 999999, top: -60, left: '50vw' }}>
        <GordonConfetti active={confetti} />
      </div>
      <img src={Banner} alt="Happy Birthday Banner" style={{ width: '100%' }} />
    </Card>
  ) : null;
};
export default BirthdayMessage;

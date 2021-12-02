import { Card } from '@material-ui/core';
import GordonConfetti from 'components/GordonConfetti';
import { useAuth } from 'hooks';
import useWindowSize from 'hooks/useWindowSize';
import { useEffect, useState } from 'react';
import userService from 'services/user';
import BannerSmall from './HBDBanner.png';
import BannerLarge from './HBDBannerLarge.png';

const BirthdayMessage = ({ open, setOpen, name }) => {
  const [confetti, setConfetti] = useState(false);
  const [width] = useWindowSize();
  const authenticated = useAuth();
  const [isBirthday, setIsBirthday] = useState(false);

  const popConfetti = () => {
    setConfetti(true);
    setTimeout(() => setConfetti(false), 5000);
  };

  useEffect(() => {
    const checkIsBirthday = async () => {
      setIsBirthday(await userService.isBirthdayToday());
    };
    checkIsBirthday();
    if (!sessionStorage.getItem('birthdayConfettiHasPopped')) {
      setTimeout(popConfetti, 1000);
      sessionStorage.setItem('birthdayConfettiHasPopped', JSON.stringify(true));
    }
  }, []);

  const Banner = width >= 1280 ? BannerLarge : BannerSmall;

  return authenticated && isBirthday ? (
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
        <GordonConfetti active={confetti} colorOption="Gordon" />
      </div>
      <img src={Banner} alt="Happy Birthday Banner" style={{ width: '100%' }} />
    </Card>
  ) : null;
};
export default BirthdayMessage;

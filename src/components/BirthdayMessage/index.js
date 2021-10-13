import GordonDialogBox from 'components/GordonDialogBox';
import { ReactComponent as PartyBalloonsImage } from './PartyBalloons.svg';

const BirthdayMessage = ({ open, setOpen, popConfetti }) => {
  return (
    <GordonDialogBox open={open}>
      <div style={{ width: 400, height: 200, fill: 'fill' }}>
        <PartyBalloonsImage alt="party balloons" style={{ height: 'inherit', width: 'inherit' }} />
      </div>
    </GordonDialogBox>
  );
};
export default BirthdayMessage;

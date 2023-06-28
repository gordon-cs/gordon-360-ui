import { Tooltip } from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';
import styles from './GordonTooltip.module.css';

const GordonTooltip = ({ content, ...OtherProps }) => {
  return (
    <Tooltip
      classes={{ tooltip: styles.tooltip }}
      title={<span style={{ fontSize: '0.8rem' }}>{content}</span>}
      {...OtherProps}
    >
      <HelpIcon className={styles.help_icon} />
    </Tooltip>
  );
};

export default GordonTooltip;

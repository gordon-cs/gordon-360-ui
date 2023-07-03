import { Tooltip } from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';
import styles from './GordonTooltip.module.css';

const GordonTooltip = ({ content, ...OtherProps }) => {
  return (
    <Tooltip
      classes={{ tooltip: styles.tooltip }}
      title={<span className={styles.tooltipTitle}>{content}</span>}
      {...OtherProps}
    >
      <HelpIcon className={styles.helpIcon} />
    </Tooltip>
  );
};

export default GordonTooltip;

import { Tooltip, TooltipProps } from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';
import styles from './GordonTooltip.module.css';

const GordonTooltip = (props: TooltipProps) => {
  return (
    <Tooltip
      {...props}
      classes={{ tooltip: styles.tooltip }}
      title={<span className={styles.tooltipTitle}>{props.children}</span>}
    >
      <HelpIcon className={styles.helpIcon} />
    </Tooltip>
  );
};

export default GordonTooltip;

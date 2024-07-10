import { Tooltip, TooltipProps } from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';
import styles from './GordonTooltip.module.css';

const GordonTooltip = ({ children, title, ...OtherProps }: TooltipProps) => {
  return (
    <Tooltip
      classes={{ tooltip: styles.tooltip }}
      title={<span className={styles.tooltipTitle}>{children}</span>}
      {...OtherProps}
    >
      <HelpIcon className={styles.helpIcon} />
    </Tooltip>
  );
};

export default GordonTooltip;

import { Tooltip, TooltipProps } from '@mui/material';
import { ReactNode } from 'react';
import HelpIcon from '@mui/icons-material/Help';
import styles from './GordonTooltip.module.css';

type Props = {
  content: ReactNode;
  OtherProps: TooltipProps;
};

const GordonTooltip = ({ content, ...OtherProps }: Props) => {
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

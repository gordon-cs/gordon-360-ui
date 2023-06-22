import { gordonColors } from 'theme';
import { Tooltip } from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';
import withStyles from '@mui/styles/withStyles';
import styles from './GordonTooltip.module.css';

// TODO convert to inline styles (currently will not switch to dark mode!)
const StyledTooltip = withStyles({
  tooltip: {
    color: '#555',
    backgroundColor: '#fff',
    boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
  },
})(Tooltip);

const GordonTooltip = ({ content, ...OtherProps }) => {
  return (
    <StyledTooltip title={<span className={styles.tooltipTitle}>{content}</span>} {...OtherProps}>
      <HelpIcon className={styles.helpIcon} />
    </StyledTooltip>
  );
};

export default GordonTooltip;

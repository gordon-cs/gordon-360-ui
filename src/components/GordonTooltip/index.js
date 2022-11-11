import { gordonColors } from 'theme';
import { Tooltip } from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';
import withStyles from '@mui/styles/withStyles';

const StyledTooltip = withStyles({
  tooltip: {
    color: '#555',
    backgroundColor: '#fff',
    boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
  },
})(Tooltip);

const GordonTooltip = ({ content, ...OtherProps }) => {
  return (
    <StyledTooltip title={<span style={{ fontSize: '0.8rem' }}>{content}</span>} {...OtherProps}>
      <HelpIcon
        style={{
          cursor: 'pointer',
          margin: '0 1rem',
          fontSize: '1.2rem',
          color: gordonColors.primary.blue,
        }}
      />
    </StyledTooltip>
  );
};

export default GordonTooltip;

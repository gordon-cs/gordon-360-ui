import GordonDialogBox from 'components/GordonDialogBox/index';
import PropTypes from 'prop-types';
import GordonLinksList from './components/LinksList';
import { Button } from '@mui/material';

const GordonQuickLinksDialog = (props) => {
  return (
    <GordonDialogBox
      onClose={props.handleLinkClose}
      aria-labelledby="useful-links"
      open={props.linkopen}
      title="Useful Links"
    >
      <GordonLinksList onClose={props.handleLinkClose} />
      <Button onClick={props.handleLinkClose} variant="outlined" color="primary">
        Close
      </Button>
    </GordonDialogBox>
  );
};

GordonQuickLinksDialog.propTypes = {
  handleLinkClickOpen: PropTypes.func.isRequired,
  handleLinkClose: PropTypes.func.isRequired,
  linkopen: PropTypes.bool,
};

export default GordonQuickLinksDialog;

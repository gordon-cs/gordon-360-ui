import GordonDialogBox from 'components/GordonDialogBox/index';
import PropTypes from 'prop-types';
import GordonLinksList from './components/LinksList';

const GordonQuickLinksDialog = (props) => {
  return (
    <GordonDialogBox
      onClose={props.handleLinkClose}
      aria-labelledby="useful-links"
      open={props.linkopen}
      title="Useful Links"
    >
      <GordonLinksList onClose={props.handleLinkClose} />
    </GordonDialogBox>
  );
};

GordonQuickLinksDialog.propTypes = {
  handleLinkClickOpen: PropTypes.func.isRequired,
  handleLinkClose: PropTypes.func.isRequired,
  linkopen: PropTypes.bool,
};

export default GordonQuickLinksDialog;

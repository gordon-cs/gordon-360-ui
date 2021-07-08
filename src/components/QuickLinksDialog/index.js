import React from 'react';
import PropTypes from 'prop-types';
import GordonLinksList from './components/LinksList';
import GordonDialogBox from 'components/GordonDialogBox/index';

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

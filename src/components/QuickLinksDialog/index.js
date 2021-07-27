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
      <button style={closeButtonStyle} onClick={props.handleLinkClose}>
        Close ✕
      </button>
    </GordonDialogBox>
  );
};

const closeButtonStyle = {
  color: 'white',
  background: 'red',
  cursor: 'pointer',
  border: '2px solid red',
  borderRadius: '4px',
  fontWeight: 'bold',
  padding: '4px',
};

GordonQuickLinksDialog.propTypes = {
  handleLinkClickOpen: PropTypes.func.isRequired,
  handleLinkClose: PropTypes.func.isRequired,
  linkopen: PropTypes.bool,
};

export default GordonQuickLinksDialog;

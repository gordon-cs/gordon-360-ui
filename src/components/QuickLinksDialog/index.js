import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GordonLinksList from './components/LinksList';
import GordonDialogBox from 'components/GordonDialogBox/index';

export default class GordonQuickLinksDialog extends Component {
  constructor(props) {
    super(props);

    this.handleLinkClickOpen = this.handleLinkClickOpen.bind(this);
    this.handleLinkClose = this.handleLinkClose.bind(this);

    this.state = {
      linkopen: false,
    };
  }

  handleLinkClickOpen = () => {
    this.setState({
      linkopen: true,
    });
  };

  handleLinkClose = () => {
    this.setState({ linkopen: false });
  };

  render() {
    return (
      <GordonDialogBox
        onClose={this.props.handleLinkClose}
        aria-labelledby="useful-links"
        open={this.props.linkopen}
        title="Useful Links"
      >
        <GordonLinksList onClose={this.props.handleLinkClose} />
      </GordonDialogBox>
    );
  }
}

GordonQuickLinksDialog.propTypes = {
  handleLinkClickOpen: PropTypes.func.isRequired,
  handleLinkClose: PropTypes.func.isRequired,
};

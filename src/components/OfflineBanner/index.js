import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { gordonColors } from '../../theme';
import storage from '../../services/storage';

export default class OfflineBanner extends Component {
  constructor() {
    super();
    this.state = {
      network: 'online',
    };
  }

  componentDidMount() {
    /* Used to re-render the page when the network connection changes.
     *  this.state.network is compared to the message received to prevent
     *  multiple re-renders that creates extreme performance lost.
     *  The origin of the message is checked to prevent cross-site scripting attacks
     */
    window.addEventListener('message', event => {
      if (
        event.data === 'online' &&
        this.state.network === 'offline' &&
        event.origin === window.location.origin
      ) {
        this.setState({ network: 'online' });
      } else if (
        event.data === 'offline' &&
        this.state.network === 'online' &&
        event.origin === window.location.origin
      ) {
        this.setState({ network: 'offline' });
      }
    });

    let network;
    /* Attempts to get the network status from local storage.
     * If not found, the default value is online
     */
    try {
      network = storage.get('network-status');
    } catch (error) {
      // Defaults the network to online if not found in local storage
      network = 'online';
    }
    // Saves the network's status to this component's state
    this.setState({ network });
  }

  getClass() {
    // Class for Home view
    if (this.props.currentPath === '/' || this.props.currentPath.includes('/profile')) {
      return 'rounded-corners MuiGrid-grid-md-10';
    } else {
      return 'rounded-corners MuiGrid-grid-lg-8';
    }
  }

  render() {
    // Network Status: Online
    if (this.state.network === 'online') {
      return <div></div>;
    }
    // Network Status: Offline
    else {
      // Shows the offline banner on every page except the Login
      if (!this.props.Authentication && this.props.currentPath === '/') {
        return <div></div>;
      } else {
        return (
          <Grid className={this.getClass()} style={styles.card} item={true}>
            <Typography>Offline Mode: Information may not be up to date...</Typography>
          </Grid>
        );
      }
    }
  }
}

const styles = {
  card: {
    backgroundColor: gordonColors.primary.cyan,
    color: 'white',
    marginBottom: '10px',
    padding: '5px',
    margin: '0px  auto 10px auto',
  },
};

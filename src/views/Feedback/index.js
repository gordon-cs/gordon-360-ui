import React, { Component } from 'react';

import './feedback.css';

export default class Feedback extends Component {
  constructor(props) {
    super(props);

    this.state = {
      network: 'online',
    };
  }

  render() {
    /* Used to re-render the page when the network connection changes
    *  this.state.network is compared to the message received to prevent
    *  multiple re-renders which creates extreme performance lost
    */
    window.addEventListener('message', event => {
      if (event.data === 'online' && this.state.network === 'offline') {
        this.setState({ network: 'online' });
      } else if (event.data === 'offline' && this.state.network === 'online') {
        this.setState({ network: 'offline' });
      }
    });

    /* Gets status of current network connection for online/offline rendering
    *  Defaults to online in case of PWA not being possible
    */
    const networkStatus = JSON.parse(localStorage.getItem('network-status')) || 'online';

    // Creates the Feedback page depending on the status of the network found in local storage
    let Feedback;
    if (networkStatus === 'online') {
      Feedback = (
        <div class="form">
          <iframe
            title="Feedback Form"
            src="https://docs.google.com/forms/d/e/1FAIpQLSfB7MtIGiMbVcSOAbl38KWqKYU9NIEE-Sbi66rbpNPAmGBoqA/viewform?embedded=true"
            width="100%"
            height="100%"
            frameborder="0"
            marginheight="0"
            marginwidth="0"
          >
            Loading...
          </iframe>
        </div>
      );
    } else {
      Feedback = (
        <div>
          <h1> Temporary Page for unavailable feature. </h1>
          <h1> Please replace me ASAP (ಠ_ಠ) </h1>
        </div>
      );
    }

    return Feedback;
  }
}

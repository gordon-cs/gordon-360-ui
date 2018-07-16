import React, { Component } from 'react';

import './feedback.css';

export default class Feedback extends Component {
  componentWillMount() {
    this.updateAppClass();
  }

  componentWillUpdate() {
    this.updateAppClass();
  }

  componentWillUnmount() {
    this.restoreAppClass();
  }

  updateAppClass() {
    //used to dynamically set the value of app-main class name
    window.appMainClass = 'app-main-nopadding';
    console.log('no padding ', window.appMainClass);
  }

  restoreAppClass() {
    window.appMainClass = 'app-main';
    window.forceAppMainRefresh();
    console.log('appmain', window.appMainClass);
  }

  render() {
    return (
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
  }
}

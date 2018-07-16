import React, { Component } from 'react';

import './feedback.css';

export default class Feedback extends Component {
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

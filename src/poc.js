import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import gordonSealWhite from './gordon-seal-white.svg';
import './poc.css';

export default class PoC extends Component {
  render() {
    return (
      <div className="app">
        <header className="app-header">
          <img src={gordonSealWhite} className="app-logo" alt="logo" />
          <h1 className="app-title">Gordon 360 React Proof of Concept</h1>
        </header>
        <p className="app-intro">
          Follow the links below to see recreated pages from Gordon 360.
        </p>
        <ul>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/activity/1/edit">Edit Activity Page</Link></li>
        </ul>
      </div>
    );
  }
}

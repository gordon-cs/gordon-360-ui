import React, { Component } from 'react';
import gordonSealWhite from './gordon-seal-white.svg';
import './app.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <header className="app-header">
          <img src={gordonSealWhite} className="app-logo" alt="logo" />
          <h1 className="app-title">Gordon 360 React Proof of Concept</h1>
        </header>
        <p className="app-intro">
          Follow the links below for more information.
        </p>
        <ul>
          <li><a href="">Edit Activity Page</a></li>
        </ul>
      </div>
    );
  }
}

export default App;

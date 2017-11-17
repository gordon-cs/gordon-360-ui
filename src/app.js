import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import './app.css';
import About from './views/About';
import ActivityEdit from './views/ActivityEdit';
import GordonHeader from './components/Header';
import GordonNav from './components/Nav';
import Home from './views/Home';
import theme from './theme';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.onDrawerToggle = this.onDrawerToggle.bind(this);

    this.state = {
      drawerOpen: false,
    };
  }
  onDrawerToggle() {
    this.setState({ drawerOpen: !this.state.drawerOpen });
  }
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          <section className="app-wrapper">
            <GordonHeader onDrawerToggle={this.onDrawerToggle} />
            <GordonNav onDrawerToggle={this.onDrawerToggle} drawerOpen={this.state.drawerOpen} />
            <main className="app-main">
              <Route exact path="/" component={Home} />
              <Route exact path="/about" component={About} />
              <Route path="/activity/:activityId/edit" component={ActivityEdit} />
            </main>
          </section>
        </Router>
      </MuiThemeProvider>
    );
  }
}

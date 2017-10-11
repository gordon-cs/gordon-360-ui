import React, { Component } from 'react';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

export default class GordonTabs extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }
  render() {
    return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              Get Involved
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              Get Connected
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '3' })}
              onClick={() => { this.toggle('3'); }}
            >
              Build Experience
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <h4>Get Involved | What Can I Do at Gordon?</h4>
                <p>
                  The 360.gordon.edu mobile-friendly activities platform allows connection to campus
                  activities, clubs, organizations, programs, and groups. Find a group, Subscribe to
                  their email feed as a Guest, or join the group as a Member! Student Leaders and
                  Advisors maintain group information about meeting times and links to their web
                  pages. Each semester there are usually over 100 connections you could make!
                </p>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="12">
                <h4>Get Connected | Which Involvements Should I Choose?</h4>
                <p>
                  Follow your heart and your mind and use 360.gordon.edu to pick key activities and
                  involvements that complement your academic plan, or join some just for fun.
                  Busyness for its own sake is not a virtue, but becoming meaningfully involved in
                  selected activities can build campus connections and build experiences that lead
                  to your own academic and professional success. Talk to your Academic Advisor about
                  suggestions of activities that fit your goals, and talk to the Program Advisors in
                  each group to learn more about what involvement means.
                </p>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="3">
            <Row>
              <Col sm="12">
                <h4>Build Experience | Can I Learn and Lead?</h4>
                <p>
                  Build your complete Gordon Experience. Your membership and leadership in groups,
                  clubs, and organizations, populates your
                  <Link to="transcript">Gordon Experience Transcript</Link>, helping you track where
                  and how you have been engaged, so that when it is time to tell your story to an
                  employer, internship placement, grad school or other social or professional
                  network, you have a record of your experiences!
                </p>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

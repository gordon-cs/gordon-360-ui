import React, { Component } from 'react';
import {
  Col,
  Container,
  Progress,
  Row,
} from 'reactstrap';

import chapelEventsForUser from './events-chapel-user-session.json';
import daysLeft from './sessions-days-left.json';

import './home.css';
import GordonCarousel from '../../components/Carousel';
import GordonTabs from './components/Tabs';

export default class Home extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col xs="12">
            <figure>
              <figcaption>
                <h3>Days Left in Semester</h3>
                {daysLeft[0]} of {daysLeft[1]}
              </figcaption>
              <Progress className="progress-indicator" value={daysLeft[0]} max={daysLeft[1]} />
            </figure>
            <figure>
              <figcaption>
                <h3>Christian Life and Worship Credits</h3>
                {chapelEventsForUser.length} of {chapelEventsForUser[0].Required}
              </figcaption>
              <Progress
                className="progress-indicator"
                value={chapelEventsForUser.length}
                max={chapelEventsForUser[0].Required || chapelEventsForUser.length}
              />
            </figure>
            <GordonCarousel />
            <GordonTabs />
          </Col>
        </Row>
      </Container>
    );
  }
}

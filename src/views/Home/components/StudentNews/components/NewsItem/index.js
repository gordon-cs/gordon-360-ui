// import { ListItem, ListItemText } from 'material-ui/List';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Card, CardContent, Typography, Collapse } from '@material-ui/core';
// import './event-item.css';

export default class GordonNewsItem extends Component {
  constructor(props) {
    super(props);

    this.handleExpandClick = this.handleExpandClick.bind(this);

    this.state = { open: false };
  }
  handleExpandClick() {
    this.setState({ open: !this.state.open });
  }
  render() {
    const { subject, submittedBy, description } = this.props;
    return (
      <section>
        <Card onClick={this.handleExpandClick}>
          <CardContent>
            <Typography>{subject}</Typography>
            <Typography type="caption">{submittedBy}</Typography>
          </CardContent>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography>Description</Typography>
              <Typography type="caption">{description}</Typography>
              {/* {content} */}
            </CardContent>
          </Collapse>
        </Card>
      </section>
    );
  }
}

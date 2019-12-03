// import { ListItem, ListItemText } from 'material-ui/List';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import React, { Component } from 'react';
import Card, { CardContent } from 'material-ui/Card';
import Collapse from 'material-ui/transitions/Collapse';
import './event-item.css';

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
    return (
      <section>
        <Card onClick={this.handleExpandClick}>
          <CardContent>
            <Typography>Selling Christmas Gala Ticket</Typography>
            <Typography type="caption">SeHee Hyung</Typography>
            <Typography type="caption">12/2/2019</Typography>
          </CardContent>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography>Description</Typography>
              <Typography type="caption">If you want to buy Christmas Gala ticket, email SeHee Hyung </Typography>
              {/* {content} */}
            </CardContent>
          </Collapse>
        </Card>
      </section>
    );
  }
}


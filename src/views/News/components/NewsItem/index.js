import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import React, { Component } from 'react';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import Grid from '@material-ui/core/Grid';

//Switched to table rows
export default class NewsItem extends Component {
  constructor(props) {
    super(props);

    this.handleExpandClick = this.handleExpandClick.bind(this);

    this.state = { open: false };
  }
  handleExpandClick() {
    this.setState({ open: !this.state.open });
  }
  render() {
    const { posting: newsItem } = this.props;

    return (
      <section>
        <Grid container onClick={this.handleExpandClick} className="event-item">
          <Grid item xs={12}>
            <Typography variant="h6" className="event-heading">
              
            </Typography>
            <Typography className="event-content"> {newsItem.Posting_Subject} </Typography>
            <Typography className="event-content"> {newsItem.Posting_Poster} </Typography>
          </Grid>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography className="event-content ">{newsItem.Posting_Body}</Typography>
              <Typography className="event-content">{newsItem.Posting_Category}</Typography>
              <p>
                <nbsp />
              </p>
              <Typography className="event-content">{newsItem.Posting_TimeStamp}</Typography>
            </CardContent>
          </Collapse>
        </Grid>
      </section>
    );
  }
}

NewsItem.propTypes = {
  newsItem: PropTypes.shape({
    Posting_ID: PropTypes.string.isRequired,
    Posting_Subject: PropTypes.string.isRequired,
    Posting_Poster: PropTypes.string.isRequired,
    Posting_TimeStamp: PropTypes.string.isRequired,
    Posting_Category: PropTypes.string.isRequired,
    Posting_Body: PropTypes.string.isRequired,
    Posting_Expiration: PropTypes.string.isRequired,
  }).isRequired,
};

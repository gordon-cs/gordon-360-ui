import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import React, { Component } from 'react';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import Grid from '@material-ui/core/Grid';

import './newsItem.scss';

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
    const { posting } = this.props;
    const { size } = this.props;
    const postingDescription = posting.Body;

    // SINGLE SIZE - single column per news item
    if(size === "single") {
      return (
        <section>
          <Grid container onClick={this.handleExpandClick} className="event-item">
            <Grid item xs={12}>
              <Typography variant="h6" className="event-heading">
                
              </Typography>
              <Typography className="news-subject"> {posting.Subject} </Typography>
              <Typography className="event-content"> {newsItem.ADUN} </Typography>
            </Grid>
            <Collapse in={this.state.open} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography className="event-content ">{newsItem.Body}</Typography>
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
    // FULL SIZE - many columns per news item
    else if(size === "full") {
      return (
        <section>
          <Grid container direction="row" onClick={this.handleExpandClick} className="news-item">
            <Grid item xs={4}>
              <Typography className="news-column">{posting.Subject}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography className="news-column">{posting.ADUN}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography className="news-column">{posting.Entered}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography className="news-column">{posting.categoryID}</Typography>
            </Grid>
            <Collapse in={this.state.open} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography className="descriptionText">Description:</Typography>
                <Typography type="caption" className="descriptionText">
                  {postingDescription}
                </Typography>
              </CardContent>
            </Collapse>
          </Grid>
        </section>
      );
    }
    
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

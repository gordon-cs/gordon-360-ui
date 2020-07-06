import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import React, { Component } from 'react';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';

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
    // const { posting: newsItem } = this.props;
    const { posting } = this.props;
    const { size } = this.props;
    const postingDescription = posting.Body;
    const authorLink = posting.author.replace(" ", ".");

    // SINGLE SIZE - single column per news item
    if(size === "single") {
      return (
        <section style={this.props.style}>
          <Grid container onClick={this.handleExpandClick} className="news-item">
            <Grid item xs={12}>
              <Typography variant="h6" className="news-heading" style={{fontWeight: "bold"}}> {posting.Subject} </Typography>
              <Link className="text-link" to={`/profile/${authorLink}`}>
                <Typography variant="h7" className="news-column" style={{ textTransform: 'capitalize' }}>
                  {posting.author}
                </Typography>
              </Link>
            </Grid>
            <Collapse in={this.state.open} timeout="auto" unmountOnExit style={{textAlign: "left"}}>
              <CardContent>
                <Typography className="news-content">"{posting.categoryName}"</Typography>
                <Typography className="news-content ">{posting.Body}</Typography>
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
            <Grid item xs={2}>
              <Typography className="news-column">{posting.categoryName}</Typography>
            </Grid>
            <Grid item xs={5}>
              <Typography className="news-column" style={{fontWeight: "bold"}}>{posting.Subject}</Typography>
            </Grid>
            <Grid item xs={3}>
            <Link className="text-link" to={`/profile/${authorLink}`}>
                <Typography className="news-column" style={{ textTransform: 'capitalize' }}>
                  {posting.author}
                </Typography>
              </Link>
            </Grid>
            <Grid item xs={2}>
              <Typography className="news-column">{posting.dayPosted}</Typography>
            </Grid>
            
            <Collapse in={this.state.open} timeout="auto" unmountOnExit style={{textAlign: "left"}}>
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
  posting: PropTypes.shape({
    SNID: PropTypes.number.isRequired,
    Subject: PropTypes.string.isRequired,
    ADUN: PropTypes.string.isRequired,
    Entered: PropTypes.string.isRequired,
    categoryName: PropTypes.string.isRequired,
    Body: PropTypes.string.isRequired,
    // Expiration: PropTypes.string.isRequired,
  }).isRequired,
};

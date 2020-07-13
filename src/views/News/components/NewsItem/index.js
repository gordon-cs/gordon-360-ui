import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import React, { Component } from 'react';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import newsService from './../../../../services/news';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from 'react-router-dom';

import './newsItem.scss';

//Switched to table rows
export default class NewsItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      posting: props.posting,
      snackbarOpen: false,
      snackbarMessage: 'Something went wrong',
    };
    
    this.handleExpandClick = this.handleExpandClick.bind(this);
  }

  handleExpandClick() {
    this.setState({ open: !this.state.open });
  }

  async handleDelete() {
    const newsID = this.state.posting.SNID;
    // delete the news item and give feedback
    let result = await newsService.deleteStudentNews(newsID);
    if(result === undefined) {
      this.props.updateSnackbar('News Posting Failed to Delete');
    }
    else {
      this.props.updateSnackbar('News Posting Deleted Successfully');
    }
    // Should be changed in future to allow react to only reload the updated news list
    window.top.location.reload();
  }

  render() {
    const posting = this.state.posting;
    const { size } = this.props;
    const postingDescription = posting.Body;
    // Unapproved news should be distinct,
    // currently it is italicized and grayed out slightly
    const { unapproved } = this.props;
    if(unapproved) {
      // Shows 'pending approval' instead of the date posted
      posting.dayPosted = <i style={{textTransform: "lowercase"}}>"pending approval..."</i>;
    }
    
    // Only show the delete button if the current user is the author of the posting
    let deleteButton;
    if(this.props.currentUsername.toLowerCase() === posting.ADUN.toLowerCase()) {
      deleteButton = (
        <Button
          variant="outlined"
          color="primary"
          startIcon={<DeleteIcon />}
          onClick={this.handleDelete.bind(this)}
        >
          Delete
        </Button>
      );
    }
    else {
      deleteButton = (<div></div>);
    }

    // SINGLE SIZE - single column per news item
    if(size === "single") {
      return (
        <section style={this.props.style} className={unapproved ? "unapproved" : "approved"}>
          <Grid container onClick={this.handleExpandClick} className="news-item" justify="center">
            <Grid item xs={12}>
              <Typography variant="h6" className="news-heading" style={{fontWeight: "bold"}}> {posting.Subject} </Typography>
              <Link className="news-authorProfileLink" to={`/profile/${posting.ADUN}`}>
                <Typography variant="h7" className="news-column" style={{ textTransform: 'capitalize' }}>
                  {posting.author}
                </Typography>
              </Link>
            </Grid>
            <Collapse in={this.state.open} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography className="news-content">"{posting.categoryName}"</Typography>
                <Typography className="news-content ">{posting.Body}</Typography>
              </CardContent>
              {deleteButton}
            </Collapse>
          </Grid>
        </section>
      );
    }
    // FULL SIZE - many columns per news item
    else if(size === "full") {
      return (
        <section className={unapproved ? "unapproved" : "approved"}>
          <Grid container direction="row" onClick={this.handleExpandClick} className="news-item">
            <Grid item xs={2}>
              <Typography className="news-column">{posting.categoryName}</Typography>
            </Grid>
            <Grid item xs={5}>
              <Typography className="news-column" style={{fontWeight: "bold"}}>{posting.Subject}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Link className="news-authorProfileLink" to={`/profile/${posting.ADUN}`}>
                <Typography className="news-column" style={{ textTransform: 'capitalize' }}>
                  {posting.author}
                </Typography>
              </Link>
            </Grid>
            <Grid item xs={2}>
              <Typography className="news-column">{posting.dayPosted}</Typography>
            </Grid>
            
            <Collapse in={this.state.open} timeout="auto" unmountOnExit style={{width: "100%"}}>
              <CardContent>
                <Grid container direction="row" alignItems="center" justify="space-around">
                  <Grid item xs={8} style={{textAlign: "left"}}>
                    <Typography className="descriptionText">Description:</Typography>
                    <Typography type="caption" className="descriptionText">
                      {postingDescription}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    {deleteButton}
                  </Grid>
                </Grid>
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



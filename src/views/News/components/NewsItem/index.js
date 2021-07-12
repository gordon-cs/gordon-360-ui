import PropTypes from 'prop-types';
import React, { Component } from 'react';
import newsService from 'services/news';
import EditIcon from '@material-ui/icons/Edit';
import storage from 'services/storage';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from 'react-router-dom';

import './newsItem.scss';

import { Typography, CardContent, Collapse, Grid, Button } from '@material-ui/core';

export default class NewsItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // for collapsable news postings
      open: false,
      posting: props.posting,
      snackbarOpen: false,
      snackbarMessage: 'Something went wrong',
    };

    // for collapsable news postings
    this.handleExpandClick = this.handleExpandClick.bind(this);
  }

  componentDidMount() {
    /* Used to re-render the page when the network connection changes.
     *  this.state.network is compared to the message received to prevent
     *  multiple re-renders that creates extreme performance lost.
     *  The origin of the message is checked to prevent cross-site scripting attacks
     */
    window.addEventListener('message', (event) => {
      if (
        event.data === 'online' &&
        this.state.network === 'offline' &&
        event.origin === window.location.origin
      ) {
        this.setState({ network: 'online' });
      } else if (
        event.data === 'offline' &&
        this.state.network === 'online' &&
        event.origin === window.location.origin
      ) {
        this.setState({ network: 'offline' });
      }
    });

    let network;
    /* Attempts to get the network status from local storage.
     * If not found, the default value is online
     */
    try {
      network = storage.get('network-status');
    } catch (error) {
      // Defaults the network to online if not found in local storage
      network = 'online';
    }
    // Saves the network's status to this component's state
    this.setState({ network });
  }

  componentWillUnmount() {
    // Removes the window's event listeners before unmounting the component
    window.removeEventListener('message', () => {});
  }

  // for collapsable news postings
  handleExpandClick() {
    this.setState({ open: !this.state.open });
  }

  /**
   * When the edit (like submit) button is clicked on update news posting form
   * (handled by News parent component)
   */
  async handleEdit() {
    const newsID = this.state.posting.SNID;
    this.callFunction('handleNewsItemEdit', newsID);
  }

  /**
   * When the delete button is clicked for a posting
   */
  async handleDelete() {
    const newsID = this.state.posting.SNID;
    // delete the news item and give feedback
    let result = await newsService.deleteStudentNews(newsID);
    if (result === undefined) {
      this.callFunction('updateSnackbar', 'News Posting Failed to Delete');
    } else {
      this.callFunction('updateSnackbar', 'News Posting Deleted Successfully');
    }
    // Should be changed in future to allow react to only reload the updated news list
    window.top.location.reload();
  }

  // Calls a parent function in News
  // Must be passed down through props of each component
  // News -> NewsList -> NewsItem (currently)
  callFunction(functionName, param) {
    this.props.callFunction(functionName, param);
  }

  render() {
    const posting = this.state.posting;
    const { size } = this.props;
    const postingDescription = posting.Body;
    // Unapproved news should be distinct,
    // currently it is italicized and grayed out slightly
    const { unapproved } = this.props;
    if (unapproved) {
      // Shows 'pending approval' instead of the date posted
      posting.dayPosted = <i style={{ textTransform: 'lowercase' }}>"pending approval..."</i>;
    }

    let authorProfileLink;
    if (!this.state.network === 'online' || unapproved) {
      // offline or unapproved -> hide author profile link
      authorProfileLink = (
        <Typography variant="h6" className="news-column" style={{ textTransform: 'capitalize' }}>
          {posting.author}
        </Typography>
      );
    } else {
      // online and approved -> show author profile link
      authorProfileLink = (
        <Link className="news-authorProfileLink" to={`/profile/${posting.ADUN}`}>
          <Typography variant="h6" className="news-column" style={{ textTransform: 'capitalize' }}>
            {posting.author}
          </Typography>
        </Link>
      );
    }

    // Only show the edit button if the current user is the author of the posting
    // AND posting is unapproved
    // null check temporarily fixes issue on home card when user has not yet been authenticated
    // it is because the home card doesn't give these properties
    let editButton;
    if (
      this.props.currentUsername != null &&
      this.props.currentUsername.toLowerCase() === posting.ADUN.toLowerCase() &&
      unapproved
    ) {
      editButton = (
        <Button
          variant="outlined"
          color="primary"
          startIcon={<EditIcon />}
          onClick={this.handleEdit.bind(this)}
          className="btn"
        >
          Edit
        </Button>
      );
    } else {
      editButton = <div></div>;
    }

    // Only show the delete button if the current user is the author of the posting
    // null check temporarily fixes issue on home card when user has not yet been authenticated
    let deleteButton;
    if (
      this.props.currentUsername != null &&
      this.props.currentUsername.toLowerCase() === posting.ADUN.toLowerCase()
    ) {
      deleteButton = (
        <Button
          variant="outlined"
          color="primary"
          startIcon={<DeleteIcon />}
          onClick={this.handleDelete.bind(this)}
          className="btn deleteButton"
        >
          Delete
        </Button>
      );
    } else {
      deleteButton = <div></div>;
    }

    // SINGLE SIZE - single column per news item
    if (size === 'single') {
      return (
        <Grid
          container
          onClick={this.handleExpandClick}
          className={`news-item ${unapproved ? 'unapproved' : 'approved'}`}
          justifyContent="center"
        >
          <Grid item xs={12}>
            <Typography variant="h6" className="news-heading" style={{ fontWeight: 'bold' }}>
              {' '}
              {posting.Subject}{' '}
            </Typography>
            {authorProfileLink}
          </Grid>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography className="news-content">"{posting.categoryName}"</Typography>
              <Typography className="news-content ">{posting.Body}</Typography>
            </CardContent>
            <Grid container justifyContent="space-evenly">
              {editButton}
              {deleteButton}
            </Grid>
          </Collapse>
        </Grid>
      );
    }
    // FULL SIZE - many columns per news item
    else if (size === 'full') {
      return (
        <Grid
          container
          direction="row"
          onClick={this.handleExpandClick}
          className={`news-item ${unapproved ? 'unapproved' : 'approved'}`}
        >
          <Grid item xs={2}>
            <Typography className="news-column">{posting.categoryName}</Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography className="news-column" style={{ fontWeight: 'bold' }}>
              {posting.Subject}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            {authorProfileLink}
          </Grid>
          <Grid item xs={2}>
            <Typography className="news-column">{posting.dayPosted}</Typography>
          </Grid>

          {/* Collapsable details */}
          <Collapse in={this.state.open} timeout="auto" unmountOnExit style={{ width: '100%' }}>
            <CardContent>
              <Grid container direction="row" alignItems="center" justifyContent="space-around">
                <Grid item xs={8} style={{ textAlign: 'left' }}>
                  <Typography className="descriptionText">Description:</Typography>
                  <Typography type="caption" className="descriptionText">
                    {postingDescription}
                  </Typography>
                </Grid>
                {/* Possible action buttons */}
                <Grid item xs={4}>
                  <Grid container justifyContent="space-evenly">
                    {/* these conditionally render - see respective methods */}
                    {editButton}
                    {deleteButton}
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Collapse>
        </Grid>
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

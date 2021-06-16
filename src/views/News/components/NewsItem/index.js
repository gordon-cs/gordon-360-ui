import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import newsService from 'services/news';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from 'react-router-dom';
import useNetworkStatus from 'hooks/useNetworkStatus';

import './newsItem.scss';

import { Typography, CardContent, Collapse, Grid, Button } from '@material-ui/core';

const NewsItem = (props) => {
  const [open, setOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(useNetworkStatus());

  const size = props.size;
  const postingDescription = props.posting.Body;
  const postingImage = props.posting.Image;
  const { unapproved } = props;

  let posting = props.posting;

  useEffect(() => {
    /* Used to re-render the page when the network connection changes.
     *  network is compared to the message received to prevent
     *  multiple re-renders that creates extreme performance lost.
     *  The origin of the message is checked to prevent cross-site scripting attacks
     */
    window.addEventListener('message', (event) => {
      if (event.data === 'online' && !isOnline && event.origin === window.location.origin) {
        setIsOnline(true);
      } else if (
        event.data === 'offline' &&
        isOnline === 'online' &&
        event.origin === window.location.origin
      ) {
        setIsOnline(false);
      }
    });
  });

  useEffect(() => {
    window.removeEventListener('message', () => {});
  });

  /**
   * When the edit (like submit) button is clicked on update news posting form
   * (handled by News parent component)
   */
  async function handleEdit() {
    const newsID = posting.SNID;
    callFunction('handleNewsItemEdit', newsID);
  }

  /**
   * When the delete button is clicked for a posting
   */
  async function handleDelete() {
    const newsID = posting.SNID;
    // delete the news item and give feedback
    let result = await newsService.deleteStudentNews(newsID);
    if (result === undefined) {
      callFunction('updateSnackbar', 'News Posting Failed to Delete');
    } else {
      callFunction('updateSnackbar', 'News Posting Deleted Successfully');
    }
    // Should be changed in future to allow react to only reload the updated news list
    window.top.location.reload();
  }

  // Calls a parent function in News
  // Must be passed down through props of each component
  // News -> NewsList -> NewsItem (currently)
  function callFunction(functionName, param) {
    props.callFunction(functionName, param);
  }

  if (unapproved) {
    // Shows 'pending approval' instead of the date posted
    posting.dayPosted = <i style={{ textTransform: 'lowercase' }}>"pending approval..."</i>;
  }

  let authorProfileLink;
  if (!isOnline || unapproved) {
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
    props.currentUsername != null &&
    props.currentUsername.toLowerCase() === posting.ADUN.toLowerCase() &&
    unapproved
  ) {
    editButton = (
      <Button
        variant="outlined"
        color="primary"
        startIcon={<EditIcon />}
        onClick={handleEdit}
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
    props.currentUsername != null &&
    props.currentUsername.toLowerCase() === posting.ADUN.toLowerCase()
  ) {
    deleteButton = (
      <Button
        variant="outlined"
        color="primary"
        startIcon={<DeleteIcon />}
        onClick={handleDelete}
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
        onClick={() => {
          setOpen(!open);
        }}
        className={`news-item ${unapproved ? 'unapproved' : 'approved'}`}
        justify="center"
      >
        <Grid item xs={12}>
          <Typography variant="h6" className="news-heading" style={{ fontWeight: 'bold' }}>
            {' '}
            {posting.Subject}{' '}
          </Typography>
          {authorProfileLink}
        </Grid>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography className="news-content">"{posting.categoryName}"</Typography>
            <Typography className="news-content ">{posting.Body}</Typography>
            {postingImage !== null && <img src={`data:image/jpg;base64,${postingImage}`} alt=" " />}
          </CardContent>
          <Grid container justify="space-evenly">
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
        onClick={() => {
          setOpen(!open);
        }}
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
        <Collapse in={open} timeout="auto" unmountOnExit style={{ width: '100%' }}>
          <CardContent>
            <Grid container direction="row" alignItems="center" justify="space-around">
              <Grid item xs={8} style={{ textAlign: 'left' }}>
                <Typography className="descriptionText">Description:</Typography>
                <Typography type="caption" className="descriptionText">
                  {postingDescription}
                </Typography>
                {postingImage !== null && (
                  <img src={`data:image/jpg;base64,${postingImage}`} alt=" " />
                )}
              </Grid>
              {/* Possible action buttons */}
              <Grid item xs={4}>
                <Grid container justify="space-evenly">
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
};

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

export default NewsItem;

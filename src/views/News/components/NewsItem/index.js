import { Button, CardContent, Collapse, Grid, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import useNetworkStatus from 'hooks/useNetworkStatus';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './NewsItem.module.css';

const NewsItem = ({
  posting,
  unapproved,
  size,
  currentUsername,
  handleNewsItemEdit,
  handleNewsItemDelete,
}) => {
  const [open, setOpen] = useState(false);
  const isOnline = useNetworkStatus();

  if (unapproved) {
    // Shows 'pending approval' instead of the date posted
    posting.dayPosted = <i>pending approval...</i>;
  }

  const author = (
    <Typography className={styles.news_column} style={{ textTransform: 'capitalize' }}>
      {posting.author}
    </Typography>
  );
  const authorProfileLink =
    !isOnline || unapproved ? (
      author
    ) : (
      <Link className={styles.news_authorProfileLink} to={`/profile/${posting.ADUN}`}>
        {author}
      </Link>
    );

  // Only show the edit button if the current user is the author of the posting
  // AND posting is unapproved
  // null check temporarily fixes issue on home card when user has not yet been authenticated
  // it is because the home card doesn't give these properties
  let editButton;
  if (
    currentUsername != null &&
    currentUsername.toLowerCase() === posting.ADUN.toLowerCase() &&
    unapproved
  ) {
    editButton = (
      <Button
        variant="outlined"
        color="primary"
        startIcon={<EditIcon />}
        onClick={() => handleNewsItemEdit(posting.SNID)}
        className={styles.btn}
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
  if (currentUsername != null && currentUsername.toLowerCase() === posting.ADUN.toLowerCase()) {
    deleteButton = (
      <Button
        variant="outlined"
        color="primary"
        startIcon={<DeleteIcon />}
        onClick={() => {
          handleNewsItemDelete(posting.SNID);
        }}
        className={`${styles.btn} ${styles.deleteButton}`}
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
        className={`${styles.news_item} ${unapproved ? styles.unapproved : styles.approved}`}
        justify="center"
      >
        <Grid item xs={12}>
          <Typography variant="h6" className={styles.news_heading} style={{ fontWeight: 'bold' }}>
            {posting.Subject}
          </Typography>
          {authorProfileLink}
        </Grid>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography className={styles.news_content}>"{posting.categoryName}"</Typography>
            <Typography className={styles.news_content}>{posting.Body}</Typography>
            {posting.Image !== null && (
              <img src={`data:image/jpg;base64,${posting.Image}`} alt=" " />
            )}
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
        className={`${styles.news_item} ${unapproved ? styles.unapproved : styles.approved}`}
      >
        <Grid item xs={2}>
          <Typography className={styles.news_column}>{posting.categoryName}</Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography className={styles.news_column} style={{ fontWeight: 'bold' }}>
            {posting.Subject}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          {authorProfileLink}
        </Grid>
        <Grid item xs={2}>
          <Typography className={styles.news_column}>{posting.dayPosted}</Typography>
        </Grid>

        {/* Collapsable details */}
        <Collapse in={open} timeout="auto" unmountOnExit style={{ width: '100%' }}>
          <CardContent>
            <Grid container direction="row" alignItems="center" justify="space-around">
              <Grid item xs={8} style={{ textAlign: 'left' }}>
                <Typography className={styles.descriptionText}>Description:</Typography>
                <Typography type="caption" className={styles.descriptionText}>
                  {posting.Body}
                </Typography>
                {posting.Image !== null && (
                  <img src={`data:image/jpg;base64,${posting.Image}`} alt=" " />
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

  unapproved: PropTypes.any,
  size: PropTypes.string.isRequired,
  currentUsername: PropTypes.string.isRequired,
  handleNewsItemEdit: PropTypes.func.isRequired,
  handleNewsItemDelete: PropTypes.func.isRequired,
};

export default NewsItem;

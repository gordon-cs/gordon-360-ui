import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, CardContent, Collapse, Grid, Typography } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from 'react-router-dom';

import './newsItem.scss';

const NewsItem = ({ posting, size, unapproved, onDelete, onEdit, isEditable, style }) => {
  const [open, setOpen] = useState(false);

  const authorProfileLink = unapproved ? (
    <Typography variant="h7" className="news-column" style={{ textTransform: 'capitalize' }}>
      {posting.author}
    </Typography>
  ) : (
    <Link className="news-authorProfileLink" to={`/profile/${posting.ADUN}`}>
      <Typography variant="h7" className="news-column" style={{ textTransform: 'capitalize' }}>
        {posting.author}
      </Typography>
    </Link>
  );

  const editButton =
    isEditable && unapproved ? (
      <Button
        variant="outlined"
        color="primary"
        startIcon={<EditIcon />}
        onClick={() => onEdit(posting.SNID)}
        className="btn"
      >
        Edit
      </Button>
    ) : null;

  const deleteButton = isEditable ? (
    <Button
      variant="outlined"
      color="primary"
      startIcon={<DeleteIcon />}
      onClick={() => onDelete(posting.SNID)}
      className="btn deleteButton"
    >
      Delete
    </Button>
  ) : null;

  // SINGLE SIZE - single column per news item
  if (size === 'single') {
    return (
      <section style={style} className={unapproved ? 'unapproved' : 'approved'}>
        <Grid container onClick={() => setOpen((o) => !o)} className="news-item" justify="center">
          <Grid item xs={12}>
            <Typography variant="h6" className="news-heading" style={{ fontWeight: 'bold' }}>
              {posting.Subject}
            </Typography>
            {authorProfileLink}
          </Grid>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography className="news-content">"{posting.categoryName}"</Typography>
              <Typography className="news-content ">{posting.Body}</Typography>
            </CardContent>
            <Grid container justify="space-evenly">
              {editButton}
              {deleteButton}
            </Grid>
          </Collapse>
        </Grid>
      </section>
    );
  }
  // FULL SIZE - many columns per news item
  else if (size === 'full') {
    return (
      <section className={unapproved ? 'unapproved' : 'approved'}>
        <Grid container direction="row" onClick={() => setOpen((o) => !o)} className="news-item">
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
            <Typography className="news-column">
              {unapproved ? (
                <i style={{ textTransform: 'lowercase' }}>"pending approval..."</i>
              ) : (
                posting.dayPosted
              )}
            </Typography>
          </Grid>

          <Collapse in={open} timeout="auto" unmountOnExit style={{ width: '100%' }}>
            <CardContent>
              <Grid container direction="row" alignItems="center" justify="space-around">
                <Grid item xs={8} style={{ textAlign: 'left' }}>
                  <Typography className="descriptionText">Description:</Typography>
                  <Typography type="caption" className="descriptionText">
                    {posting.Body}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Grid container justify="space-evenly">
                    {editButton}
                    {deleteButton}
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Collapse>
        </Grid>
      </section>
    );
  }
};

export default NewsItem;

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

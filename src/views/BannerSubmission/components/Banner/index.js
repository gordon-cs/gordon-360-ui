import { Button, CardContent, Collapse, Grid, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import useNetworkStatus from 'hooks/useNetworkStatus';
import { useState } from 'react';
import styles from './Banner.module.css';

const Banner = ({ posting, size, currentUsername, handleNewsItemDelete }) => {
  const [open, setOpen] = useState(false);
  const isOnline = useNetworkStatus();

  const deleteButton = (
    <Button
      variant="outlined"
      color="primary"
      startIcon={<DeleteIcon />}
      onClick={() => {
        handleNewsItemDelete(posting.ID);
      }}
      className={`${styles.btn} ${styles.deleteButton}`}
    >
      Delete
    </Button>
  );

  // SINGLE SIZE - single column per news item
  if (size === 'single') {
    return (
      <Grid
        container
        onClick={() => {
          setOpen(!open);
        }}
        className={`${styles.news_item} ${styles.approved}`}
        justify="center"
      >
        <Grid item xs={12}>
          <Typography variant="h6" className={styles.news_heading} style={{ fontWeight: 'bold' }}>
            {posting.Title}
          </Typography>
        </Grid>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography className={styles.news_content}>"{posting.Order}"</Typography>
            <Typography className={styles.news_content}>{posting.LinkURL}</Typography>
            <img src={`data:image/jpg;base64,${posting.Image}`} alt=" " />
          </CardContent>
          <Grid container justify="space-evenly">
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
        className={`${styles.news_item} ${styles.approved}`}
      >
        <Grid item xs={1}>
          <Typography className={styles.news_column}>{posting.ID}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography className={styles.news_column}>{posting.Title}</Typography>
        </Grid>
        <Grid item xs={7}>
          <Typography className={styles.news_column} style={{ fontWeight: 'bold' }}>
            {posting.LinkURL}
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography className={styles.news_column}>{posting.SortOrder}</Typography>
        </Grid>

        {/* Collapsable details */}
        <Collapse in={open} timeout="auto" unmountOnExit style={{ width: '100%' }}>
          <CardContent>
            <Grid container direction="row" alignItems="center" justify="space-around">
              <Grid item xs={8} style={{ textAlign: 'left' }}>
                <img src={posting.Path} alt=" " />
              </Grid>
              {/* Possible action buttons */}
              <Grid item xs={4}>
                <Grid container justify="space-evenly">
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

export default Banner;

import PropTypes from 'prop-types';
import React from 'react';
import NewsItem from '../NewsItem';
import { gordonColors } from 'theme';
import './newsList.scss';
import { Grid, Typography, Card, List } from '@material-ui/core';

const BREAKPOINT_WIDTH = 540;

const headerStyle = {
  backgroundColor: gordonColors.primary.blue,
  color: '#FFF',
  padding: '10px',
};

const NewsList = ({
  news,
  personalUnapprovedNews,
  currentUsername,
  handleNewsItemEdit,
  handleNewsItemDelete,
}) => {
  let header;
  let personalUnapprovedPostings;
  let postings;

  if (news.length > 0 || personalUnapprovedNews.length > 0) {
    if (window.innerWidth < BREAKPOINT_WIDTH) {
      personalUnapprovedPostings = personalUnapprovedNews.map((posting) => (
        <NewsItem
          posting={posting}
          unapproved
          size="single"
          currentUsername={currentUsername}
          handleNewsItemEdit={handleNewsItemEdit}
          handleNewsItemDelete={handleNewsItemDelete}
          key={posting.SNID}
        />
      ));

      postings = news.map((posting) => (
        <NewsItem
          posting={posting}
          //approved
          size="single"
          currentUsername={currentUsername}
          handleNewsItemEdit={handleNewsItemEdit}
          handleNewsItemDelete={handleNewsItemDelete}
          key={posting.SNID}
        />
      ));

      header = (
        <div style={headerStyle}>
          <Grid container direction="row">
            <Grid item xs={12}>
              <Typography variant="body2" style={headerStyle}>
                NEWS
              </Typography>
            </Grid>
          </Grid>
        </div>
      );
    } else {
      personalUnapprovedPostings = personalUnapprovedNews.map((posting) => (
        <NewsItem
          posting={posting}
          unapproved
          size="full"
          currentUsername={currentUsername}
          handleNewsItemEdit={handleNewsItemEdit}
          handleNewsItemDelete={handleNewsItemDelete}
          key={posting.SNID}
        />
      ));

      postings = news.map((posting) => (
        <NewsItem
          posting={posting}
          //approved
          size="full"
          currentUsername={currentUsername}
          handleNewsItemEdit={handleNewsItemEdit}
          handleNewsItemDelete={handleNewsItemDelete}
          key={posting.SNID}
        />
      ));

      header = (
        <Grid container direction="row" style={headerStyle}>
          <Grid item xs={2}>
            <Typography variant="body1" style={headerStyle}>
              CATEGORY
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography variant="body1" style={headerStyle}>
              SUBJECT
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body1" style={headerStyle}>
              POSTED BY
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" style={headerStyle}>
              POSTED
            </Typography>
          </Grid>
        </Grid>
      );
    }
  } else {
    return (
      <Typography variant="h4" align="center">
        No News To Show
      </Typography>
    );
  }

  return (
    <Card>
      {header}
      <Grid>
        <List className="news-list" disablePadding>
          {personalUnapprovedPostings}
          {postings}
        </List>
      </Grid>
    </Card>
  );
};

NewsList.propTypes = {
  news: PropTypes.arrayOf(
    PropTypes.shape({
      SNID: PropTypes.number.isRequired,
      Subject: PropTypes.string.isRequired,
      ADUN: PropTypes.string.isRequired,
      Entered: PropTypes.string.isRequired,
      categoryName: PropTypes.string.isRequired,
      Body: PropTypes.string.isRequired,
      // Expiration: PropTypes.string.isRequired,
    }),
  ).isRequired,

  personalUnapprovedNews: PropTypes.arrayOf(
    PropTypes.shape({
      SNID: PropTypes.number.isRequired,
      Subject: PropTypes.string.isRequired,
      ADUN: PropTypes.string.isRequired,
      Entered: PropTypes.string.isRequired,
      categoryName: PropTypes.string.isRequired,
      Body: PropTypes.string.isRequired,
      // Expiration: PropTypes.string.isRequired,
    }),
  ).isRequired,

  currentUsername: PropTypes.string.isRequired,
  handleNewsItemEdit: PropTypes.func.isRequired,
  handleNewsItemDelete: PropTypes.func.isRequired,
};

export default NewsList;

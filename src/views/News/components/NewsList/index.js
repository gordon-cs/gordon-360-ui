import React, { useState, useEffect } from 'react';

import NewsItem from '../NewsItem';
import { gordonColors } from 'theme';
import './newsList.scss';

import { Grid, Typography, Card, List } from '@material-ui/core';

const BREAKPOINT_WIDTH = 540;

const NewsList = (props) => {
  const { news } = props;
  const { personalUnapprovedNews } = props;
  const [postings, setPostings] = useState();
  const [personalUnapprovedPostings, setPersonalUnapprovedPostings] = useState();
  const [header, setHeader] = useState();

  useEffect(() => {
    const headerStyle = {
      backgroundColor: gordonColors.primary.blue,
      color: '#FFF',
      padding: '10px',
    };

    if (window.innerWidth < BREAKPOINT_WIDTH) {
      setPersonalUnapprovedPostings(
        personalUnapprovedNews.map((posting) => (
          <NewsItem
            posting={posting}
            key={posting.SNID}
            size="single"
            updateSnackbar={props.updateSnackbar}
            currentUsername={props.currentUsername}
            callFunction={props.callFunction}
            unapproved
          />
        )),
      );

      setPostings(
        news.map((posting) => (
          <NewsItem
            posting={posting}
            key={posting.SNID}
            size="single"
            updateSnackbar={props.updateSnackbar}
            currentUsername={props.currentUsername}
            callFunction={props.callFunction}
          />
        )),
      );

      setHeader(
        <div style={headerStyle}>
          <Grid container direction="row">
            <Grid item xs={12}>
              <Typography variant="body2" style={headerStyle}>
                NEWS
              </Typography>
            </Grid>
          </Grid>
        </div>,
      );
    } else if (news) {
      setPersonalUnapprovedPostings(
        personalUnapprovedNews.map((posting) => (
          <NewsItem
            posting={posting}
            key={posting.SNID}
            size="full"
            updateSnackbar={props.updateSnackbar}
            currentUsername={props.currentUsername}
            callFunction={props.callFunction}
            unapproved
          />
        )),
      );

      setPostings(
        news.map((posting) => (
          <NewsItem
            posting={posting}
            key={posting.SNID}
            updateSnackbar={props.updateSnackbar}
            currentUsername={props.currentUsername}
            callFunction={props.callFunction}
            size="full"
          />
        )),
      );

      setHeader(
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
        </Grid>,
      );
    }
  }, [
    personalUnapprovedNews,
    postings,
    header,
    news,
    props.callFunction,
    props.currentUsername,
    props.updateSnackbar,
  ]);

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

export default NewsList;

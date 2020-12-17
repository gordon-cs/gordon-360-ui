import React, { useEffect, useState } from 'react';
import { Card, Grid, List, Typography } from '@material-ui/core';

import NewsItem from '../NewsItem';
import { gordonColors } from '../../../../theme';
import './newsList.scss';

const BREAKPOINT_WIDTH = 540;

const NewsList = ({ news, personalUnapprovedNews, onEdit, onDelete, currentUsername }) => {
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < BREAKPOINT_WIDTH);

  useEffect(() => {
    const resize = () => {
      setIsMobileView(window.innerWidth < BREAKPOINT_WIDTH);
    };

    window.addEventListener('resize', resize);

    return () => window.removeEventListener('resize', resize);
  }, []);

  const headerStyle = {
    backgroundColor: gordonColors.primary.blue,
    color: '#FFF',
    padding: '10px',
  };

  const size = isMobileView ? 'single' : 'full';
  const header = isMobileView ? (
    <div style={headerStyle}>
      <Grid container direction="row">
        <Grid item xs={12}>
          <Typography variant="body2" style={headerStyle}>
            NEWS
          </Typography>
        </Grid>
      </Grid>
    </div>
  ) : (
    <div style={headerStyle}>
      <Grid container direction="row">
        <Grid item xs={2}>
          <Typography variant="body2" style={headerStyle}>
            CATEGORY
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography variant="body2" style={headerStyle}>
            SUBJECT
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="body2" style={headerStyle}>
            POSTED BY
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="body2" style={headerStyle}>
            POSTED
          </Typography>
        </Grid>
      </Grid>
    </div>
  );

  const personalUnapprovedPostings = personalUnapprovedNews.map((posting) => {
    return (
      <NewsItem
        posting={posting}
        key={posting.SNID}
        isEditable={currentUsername.toLowerCase() === posting.ADUN.toLowerCase()}
        onEdit={onEdit}
        onDelete={onDelete}
        size={size}
        unapproved
      />
    );
  });

  const postings = news.map((posting) => (
    <NewsItem
      posting={posting}
      key={posting.SNID}
      isEditable={currentUsername.toLowerCase() === posting.ADUN.toLowerCase()}
      onEdit={onEdit}
      onDelete={onDelete}
      size={size}
    />
  ));

  return (
    <section>
      <Card>
        {header}
        <Grid>
          <List className="news-list" disablePadding>
            {personalUnapprovedPostings}
            {postings}
          </List>
        </Grid>
      </Card>
    </section>
  );
};

export default NewsList;

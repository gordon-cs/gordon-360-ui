import PropTypes from 'prop-types';
import { React, useEffect, useState } from 'react';
import NewsItem from '../NewsItem';
import { gordonColors } from 'theme';
import './newsList.scss';
import { Grid, Typography, Card, List } from '@material-ui/core';

//https://www.pluralsight.com/guides/re-render-react-component-on-window-resize
//Excellent resource for handling rerender on resize -Josh

const BREAKPOINT_WIDTH = 540;

const headerStyle = {
  backgroundColor: gordonColors.primary.blue,
  color: '#FFF',
  padding: '10px',
};

const singleHeader = (
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

const fullHeader = (
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

function debounce(fn, ms) {
  let timer;
  return (_) => {
    clearTimeout(timer);
    timer = setTimeout((_) => {
      timer = null;
      fn.apply(this, arguments);
    }, ms);
  };
}

const NewsList = ({
  news,
  personalUnapprovedNews,
  currentUsername,
  handleNewsItemEdit,
  handleNewsItemDelete,
}) => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const debouncedHandleResize = debounce(function handleResize() {
      setWidth(window.innerWidth);
    }, 100);
    window.addEventListener('resize', debouncedHandleResize);
    return (_) => {
      window.removeEventListener('resize', debouncedHandleResize);
    };
  });

  return news.length > 0 || personalUnapprovedNews.length > 0 ? (
    <Card>
      {width < BREAKPOINT_WIDTH ? singleHeader : fullHeader}
      <Grid>
        <List className="news-list" disablePadding>
          {personalUnapprovedNews.length > 0 &&
            personalUnapprovedNews.map((posting) => (
              <NewsItem
                posting={posting}
                unapproved
                size={width < BREAKPOINT_WIDTH ? 'single' : 'full'}
                currentUsername={currentUsername}
                handleNewsItemEdit={handleNewsItemEdit}
                handleNewsItemDelete={handleNewsItemDelete}
                key={posting.SNID}
              />
            ))}

          {news.length > 0 &&
            news.map((posting) => (
              <NewsItem
                posting={posting}
                //approved
                size={width < BREAKPOINT_WIDTH ? 'single' : 'full'}
                currentUsername={currentUsername}
                handleNewsItemEdit={handleNewsItemEdit}
                handleNewsItemDelete={handleNewsItemDelete}
                key={posting.SNID}
              />
            ))}
        </List>
      </Grid>
    </Card>
  ) : (
    //No news
    <Typography variant="h4" align="center">
      No News To Show
    </Typography>
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

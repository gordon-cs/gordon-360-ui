import { Card, Grid, List, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import NewsItem from '../NewsItem';
import styles from './NewsList.module.css';

//https://www.pluralsight.com/guides/re-render-react-component-on-window-resize
//Excellent resource for handling rerender on resize -Josh

const BREAKPOINT_WIDTH = 540;

const singleHeader = (
  <div className={styles.news_header}>
    <Grid container direction="row">
      <Grid item xs={12}>
        <Typography variant="body2" className={styles.news_header}>
          NEWS
        </Typography>
      </Grid>
    </Grid>
  </div>
);

const fullHeader = (
  <Grid container direction="row" className={styles.news_header}>
    <Grid item xs={2}>
      <Typography variant="body2" className={styles.news_header}>
        CATEGORY
      </Typography>
    </Grid>
    <Grid item xs={5}>
      <Typography variant="body2" className={styles.news_header}>
        SUBJECT
      </Typography>
    </Grid>
    <Grid item xs={3}>
      <Typography variant="body2" className={styles.news_header}>
        POSTED BY
      </Typography>
    </Grid>
    <Grid item xs={2}>
      <Typography variant="body2" className={styles.news_header}>
        POSTED
      </Typography>
    </Grid>
  </Grid>
);

const NewsList = ({ news, personalUnapprovedNews, handleNewsItemEdit, handleNewsItemDelete }) => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    return (_) => {
      window.removeEventListener('resize', handleResize);
    };
  });

  return news.length > 0 || personalUnapprovedNews.length > 0 ? (
    <Card>
      {width < BREAKPOINT_WIDTH ? singleHeader : fullHeader}
      <Grid>
        <List className={styles.news_list} disablePadding>
          {personalUnapprovedNews.length > 0 &&
            personalUnapprovedNews.map((posting) => (
              <NewsItem
                posting={posting}
                unapproved
                size={width < BREAKPOINT_WIDTH ? 'single' : 'full'}
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
    <Typography variant="h4" align="center" className={styles.news_title}>
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

  handleNewsItemEdit: PropTypes.func.isRequired,
  handleNewsItemDelete: PropTypes.func.isRequired,
};

export default NewsList;

import {
  Card,
  CardHeader,
  Grid,
  List,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '@mui/material';
import PropTypes from 'prop-types';
import { ExpandMore } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { gordonColors } from 'theme';
import NewsItem from '../NewsItem';
import styles from './NewsList.module.css';

const BREAKPOINT_WIDTH = 540;

const NewsList = ({
  news,
  header,
  handleNewsItemEdit,
  handleNewsImageEdit,
  handleNewsItemDelete,
  handleNewsApprovalStatus,
  isUnapproved,
  isAdmin,
  tabBreakpointWidth,
}) => {
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

  //https://www.pluralsight.com/guides/re-render-react-component-on-window-resize
  //Excellent resource for handling rerender on resize -Josh

  const singleHeader = (
    <div className={styles.header}>
      <Grid container direction="row">
        <Grid item xs={12}>
          <Typography variant="body2" className={styles.header}>
            {header}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );

  const fullHeader = (
    <Grid container direction="row" className={styles.header}>
      <Grid item xs={2}>
        <Typography variant="body2" className={styles.header}>
          CATEGORY
        </Typography>
      </Grid>
      <Grid item xs={5}>
        <Typography variant="body2" className={styles.header}>
          SUBJECT
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography variant="body2" className={styles.header}>
          POSTED BY
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography variant="body2" className={styles.header}>
          POSTED
        </Typography>
      </Grid>
    </Grid>
  );

  return (
    <Card className={width >= tabBreakpointWidth ? styles.full_news_list : styles.news_list}>
      {width < BREAKPOINT_WIDTH ? singleHeader : fullHeader}
      {news.length > 0 ? (
        <Grid>
          <List className={styles.list} disablePadding>
            {news.length > 0 &&
              news.map((posting) => (
                <NewsItem
                  posting={posting}
                  isUnapproved={isUnapproved ?? true}
                  size={width < BREAKPOINT_WIDTH ? 'single' : 'full'}
                  handleNewsItemEdit={handleNewsItemEdit}
                  handleNewsImageEdit={handleNewsImageEdit}
                  handleNewsItemDelete={handleNewsItemDelete}
                  handleNewsApprovalStatus={handleNewsApprovalStatus}
                  key={posting.SNID}
                  isAdmin={isAdmin}
                />
              ))}
          </List>
        </Grid>
      ) : (
        //No news
        <Typography variant="h4" className={styles.typography}>
          No News To Show
        </Typography>
      )}
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
  handleNewsItemEdit: PropTypes.func.isRequired,
  handleNewsItemDelete: PropTypes.func.isRequired,
  handleNewsApprovalStatus: PropTypes.func.isRequired,
  isUnapproved: PropTypes.any,
  isAdmin: PropTypes.bool.isRequired,
};

export default NewsList;

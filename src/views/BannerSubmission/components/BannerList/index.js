import { Card, Grid, List, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { gordonColors } from 'theme';
import Banner from '../Banner';
//import styles from './NewsList.module.css';

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
          BANNERS
        </Typography>
      </Grid>
    </Grid>
  </div>
);

const fullHeader = (
  <Grid container direction="row" style={headerStyle}>
    <Grid item xs={4}>
      <Typography variant="body2" style={headerStyle}>
        PICTURE
      </Typography>
    </Grid>
    <Grid item xs={3}>
      <Typography variant="body2" style={headerStyle}>
        TITLE
      </Typography>
    </Grid>
    <Grid item xs={3}>
      <Typography variant="body2" style={headerStyle}>
        URL
      </Typography>
    </Grid>
    <Grid item xs={2}>
      <Typography variant="body2" style={headerStyle}>
        ORDER
      </Typography>
    </Grid>
  </Grid>
);

const BannerList = ({ banners, currentUsername, handleNewsItemDelete }) => {
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

  return banners.length > 0 ? (
    <Card>
      {width < BREAKPOINT_WIDTH ? singleHeader : fullHeader}
      <Grid>
        <List disablePadding>
          {/* //className={styles.news_list} disablePadding> */}
          {banners.length > 0 &&
            banners.map((posting) => (
              <Banner
                posting={posting}
                size={width < BREAKPOINT_WIDTH ? 'single' : 'full'}
                currentUsername={currentUsername}
                handleNewsItemDelete={handleNewsItemDelete}
                key={posting.ID}
              />
            ))}
        </List>
      </Grid>
    </Card>
  ) : (
    <Typography variant="h4" align="center">
      No Banners
    </Typography>
  );
};

BannerList.propTypes = {
  banner: PropTypes.arrayOf(
    PropTypes.shape({
      Picture: PropTypes.string.isRequired,
      Title: PropTypes.string.isRequired,
      LinkURL: PropTypes.string,
      Order: PropTypes.number.isRequired,
    }),
  ).isRequired,

  currentUsername: PropTypes.string.isRequired,
  handleNewsItemDelete: PropTypes.func.isRequired,
};

export default BannerList;

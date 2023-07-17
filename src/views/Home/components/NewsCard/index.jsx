import { Button, Card, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import newsService from 'services/news';
import NewsItem from 'views/News/components/NewsItem';
import styles from './NewsCard.module.css';

const NewsCard = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    newsService.getTodaysNews().then(setNews);
  }, []);

  return (
    <Card>
      <CardHeader
        title={
          <Grid container direction="row" alignItems="center">
            <Grid item xs={7} align="left">
              Today's Student News
            </Grid>
            <Grid item xs={5} align="right">
              <Button variant="contained" color="secondary" component={Link} to="/news">
                All News
              </Button>
            </Grid>
          </Grid>
        }
      />
      <CardContent>
        {news.length > 0 ? (
          news.map((item) => <NewsItem posting={item} key={item.SNID} size="single" />)
        ) : (
          <Grid item>
            <Typography variant="subtitle1">No News To Show</Typography>
          </Grid>
        )}
      </CardContent>
    </Card>
  );
};

export default NewsCard;

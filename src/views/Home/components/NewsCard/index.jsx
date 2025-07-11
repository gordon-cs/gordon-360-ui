import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
  Tabs,
  Tab,
  Box,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import newsService from 'services/news';
import NewsItem from 'views/News/components/NewsItem';

const NewsCard = () => {
  const [news, setNews] = useState([]);
  const [tab, setTab] = useState(0);

  useEffect(() => {
    newsService.getTodaysNews().then(setNews);
  }, []);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

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
        className="gc360_header"
      />
      <Tabs value={tab} onChange={handleTabChange} indicatorColor="secondary" textColor="secondary">
        <Tab label="News" />
        <Tab label="Daily Digest" />
      </Tabs>
      <CardContent>
        {tab === 0 ? (
          news.length > 0 ? (
            news.map((item) => <NewsItem posting={item} key={item.SNID} size="single" />)
          ) : (
            <Grid item>
              <Typography variant="subtitle1">No News To Show</Typography>
            </Grid>
          )
        ) : (
          <Box sx={{ width: '100%', height: '70vh' }}>
            <iframe
              src="https://announce.gordon.edu/emails/history/"
              title="Daily Digest"
              width="100%"
              height="100%"
              style={{ border: 'none' }}
            />
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default NewsCard;

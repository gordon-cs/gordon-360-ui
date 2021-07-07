// SUMMER 2020 NOTE:
// Sorting news by category is currently not being used
// This was a feature deemed desirable to the original news team
// But currently it is not being implemented (commented out)
// May be a potential future feature, but not sure

import { Component } from 'react';
import { CardContent } from '@material-ui/core';
import { Button, Grid, CardHeader, Card, Typography } from '@material-ui/core';
import { gordonColors } from 'theme';
import NewsService from 'services/news';
import NewsItem from 'views/News/components/NewsItem';
// import CategorizedNews from './components/CategorizedNews';

export default class DailyNews extends Component {
  constructor(props) {
    super(props);

    // this.handleExpandClick = this.handleExpandClick.bind(this);

    this.state = {
      // newsCategories: [],
      news: [],
    };
  }

  componentDidMount() {
    this.loadNews();
  }

  // loads the news (not currently "by category")
  async loadNews() {
    // let newsCategories = await NewsService.getCategories();
    let todaysNews = await NewsService.getTodaysNews();

    this.setState({
      // newsCategories: newsCategories,
      news: todaysNews,
    });
  }

  // opens or closes the expansions
  // handleExpandClick() {
  //   this.setState({ open: !this.state.open });
  // }

  render() {
    // let categories;

    const button = {
      color: 'white',
      backgroundColor: gordonColors.primary.cyan,
      marginLeft: '5px',
      marginTop: '5px',
    };

    // categories = this.state.newsCategories
    //   .map(item => (
    //     <CategorizedNews category={item.categoryID} />
    //   ));

    let news;
    if (this.state.news.length > 0) {
      news = this.state.news.map((item) => (
        <NewsItem
          posting={item}
          key={item.SNID}
          size="single"
          style={{ border: '2px solid #bbb', marginBottom: '-2px' }}
        />
      ));
    } else {
      news = (
        <Grid item>
          <Typography variant="subtitle1">No News To Show</Typography>
        </Grid>
      );
    }

    return (
      <Card>
        <CardContent>
          <Grid container direction="row" alignItems="center">
            {/* title */}
            <Grid item xs={7} align="left">
              <CardHeader title="Today's Student News" />
            </Grid>
            {/* view all news */}
            <Grid item xs={5} align="right">
              <Button
                variant="contained"
                style={button}
                onClick={() => (window.location.pathname = '/news')}
              >
                All News
              </Button>
            </Grid>
          </Grid>
          {/* {categories} */}
          {news}
        </CardContent>
      </Card>
    );
  }
}

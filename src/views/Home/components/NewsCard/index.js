import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import CardHeader from '@material-ui/core/CardHeader';
import Card from '@material-ui/core/Card';
import { CardContent } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { gordonColors } from '../../../../theme';
import NewsService from '../../../../services/news';

import CategorizedNews from './components/CategorizedNews';

export default class DailyNews extends Component {
  constructor(props) {
    super(props);

    this.handleExpandClick = this.handleExpandClick.bind(this);

    this.state = {
      newsCategories: [],
    };
  }

  componentWillMount() {
   this.loadNews();
  }

  // loads the news by category
  async loadNews() {
    let newsCategories;

    newsCategories = await NewsService.getCategories();

    this.setState({ newsCategories });
  }

  // opens or closes the expansions
  handleExpandClick() {
    this.setState({ open: !this.state.open });
  }

  render() {
    let categories;

    const button = {
      color: 'white',
      backgroundColor: gordonColors.primary.cyan,
      marginLeft: '5px',
      marginTop: '5px',
    };

    categories = this.state.newsCategories
      .map(item => (
        <CategorizedNews category={item.categoryID} />
      ));

    return (
      <Card>
          <CardContent>
            <Grid container direction="row" alignItems="center">
              <Grid item xs={7} align="left">
                <CardHeader title="Today's Student News" />
              </Grid>
              <Grid item xs={5} align="right">
                <Button variant="contained" style={button}
                    onClick={() => (window.location.pathname = '/news')}
                    >
                    All News
                </Button>
              </Grid>
            </Grid>
          {categories}
        </CardContent>
      </Card>
    );
  }
}
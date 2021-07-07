// SUMMER 2020 NOTE:
// This file is currently not being used.
// Instead, the NewsItem.js file in the "News" view is being used
// This file is being preserved for now as the news features are still in development

import { Component } from 'react';
import { Button, Grid, Typography, Collapse } from '@material-ui/core';
import { gordonColors } from 'theme';
import NewsService from 'services/news';
import NewsItem from '../NewsItem';

//Written by Jessica Guan

export default class CategorizedNews extends Component {
  constructor(props) {
    super(props);

    this.handleExpandClick = this.handleExpandClick.bind(this);

    this.state = {
      todaysNews: [],

      open: false,
    };
  }

  componentDidMount() {
    this.loadNews();
  }

  // loads the current day's news for this category
  async loadNews() {
    let todaysNews;

    //this doesn't do anything and may break since the backend
    //isn't written
    todaysNews = await NewsService.getTodaysNews(this.props.categoryID);

    this.setState({ todaysNews });
  }

  // opens or closes the expansions
  handleExpandClick() {
    this.setState({ open: !this.state.open });
  }

  render() {
    let items;
    let numNewsItems;
    let show;

    const button = {
      color: gordonColors.primary.cyan,
    };

    if (this.state.open === false) {
      show = 'Show';
    } else {
      show = 'Hide';
    }

    //List news items in this category only if there are items
    numNewsItems = this.state.todaysNews.length;
    if (numNewsItems === 0) {
      items = '';
      show = '';
    } else {
      items = this.state.todaysNews.map((item) => (
        <NewsItem subject={item.subject} submittedBy={item.name} description={item.news} />
      ));
    }

    return (
      <Grid container direction="column" spacing={8}>
        <Grid container alignItems="baseline" direction="row" spacing={8}>
          <Grid item>
            <Typography variant="subtitle1">{this.props.category}</Typography>
          </Grid>
          <Grid item>
            <Typography>{numNewsItems} Listings</Typography>
          </Grid>
          <Grid item>
            <Button size="small" style={button} onClick={this.handleExpandClick}>
              {show}
            </Button>
          </Grid>
        </Grid>
        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
          <Grid item xs={12} sm={12}>
            {items}
          </Grid>
        </Collapse>
      </Grid>
    );
  }
}

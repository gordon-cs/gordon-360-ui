import React, { Component } from 'react';

import NewsItem from '../NewsItem';
import { gordonColors } from 'theme';
import './newsList.scss';

import { Grid, Typography, Card, List } from '@material-ui/core';

export default class NewsList extends Component {
  constructor(props) {
    super(props);

    this.handleExpandClick = this.handleExpandClick.bind(this);

    this.state = {
      open: false,
    };
    this.breakpointWidth = 540;
  }

  handleExpandClick() {
    this.setState({ open: !this.state.open });
  }

  //Has to rerender on screen resize in order for table to switch to the mobile view
  resize = () => {
    if (this.breakpointPassed()) {
      this.isMobileView = !this.isMobileView;
      this.forceUpdate();
    }
  };

  //checks if the screen has been resized past the mobile breakpoint
  //allows for forceUpdate to only be called when necessary, improving resizing performance
  breakpointPassed() {
    if (this.isMobileView && window.innerWidth > this.breakpointWidth) return true;
    if (!this.isMobileView && window.innerWidth < this.breakpointWidth) return true;
    else return false;
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  render() {
    const { news } = this.props;
    const { personalUnapprovedNews } = this.props;
    let postings;
    let personalUnapprovedPostings;
    let header;

    const headerStyle = {
      backgroundColor: gordonColors.primary.blue,
      color: '#FFF',
      padding: '10px',
    };

    /********** HEADER ***********/
    // Show single 'news' column for narrrow viewports
    if (window.innerWidth < this.breakpointWidth) {
      personalUnapprovedPostings = personalUnapprovedNews.map((posting) => (
        <NewsItem
          posting={posting}
          key={posting.SNID}
          size="single"
          updateSnackbar={this.props.updateSnackbar}
          currentUsername={this.props.currentUsername}
          callFunction={this.props.callFunction}
          unapproved
        />
      ));

      postings = news.map((posting) => (
        <NewsItem
          posting={posting}
          key={posting.SNID}
          size="single"
          updateSnackbar={this.props.updateSnackbar}
          currentUsername={this.props.currentUsername}
          callFunction={this.props.callFunction}
        />
      ));

      header = (
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
    }

    // Show full news columns in header for larger viewports
    else if (news) {
      personalUnapprovedPostings = personalUnapprovedNews.map((posting) => (
        <NewsItem
          posting={posting}
          key={posting.SNID}
          size="full"
          updateSnackbar={this.props.updateSnackbar}
          currentUsername={this.props.currentUsername}
          callFunction={this.props.callFunction}
          unapproved
        />
      ));

      postings = news.map((posting) => (
        <NewsItem
          posting={posting}
          key={posting.SNID}
          updateSnackbar={this.props.updateSnackbar}
          currentUsername={this.props.currentUsername}
          callFunction={this.props.callFunction}
          size="full"
        />
      ));

      header = (
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
    }

    return (
      <Card>
        {header}
        <Grid>
          <List className="news-list" disablePadding>
            {personalUnapprovedPostings}
            {postings}
          </List>
        </Grid>
      </Card>
    );
  }
}

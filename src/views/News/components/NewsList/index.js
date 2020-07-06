import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import List from '@material-ui/core/List';

import NewsItem from '../NewsItem';
import { gordonColors } from '../../../../theme';
import './newsList.scss';


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
    let content;
    let header;

    const headerStyle = {
      backgroundColor: gordonColors.primary.blue,
      color: '#FFF',
      padding: '10px',
    };
    
    /********** HEADER ***********/
    // Show single 'news' column for narrrow viewports
    if (window.innerWidth < this.breakpointWidth) {
      content = news.map(currPosting => (
        <NewsItem posting={currPosting} key={currPosting.SNID} size="single" />
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
      content = news.map(posting => 
        <NewsItem posting={posting} key={posting.SNID} size="full" />);
        
      header = (
        <div style={headerStyle}>
          <Grid container direction="row">
            <Grid item xs={2}>
              <Typography variant="body2" style={headerStyle}>
                CATEGORY
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <Typography variant="body2" style={headerStyle}>
                SUBJECT
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="body2" style={headerStyle}>
                POSTED BY
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body2" style={headerStyle}>
                POSTED
              </Typography>
            </Grid>
          </Grid>
        </div>
      );
    }

    return (
      <section>
        <Card>
          {header}
          <Grid>
            <List className="news-list" disablePadding>{content}</List>
          </Grid>
        </Card>
      </section>
    );
  }
}

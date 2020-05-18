import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';

import NewsItem from '../NewsItem';
import { gordonColors } from '../../../../theme';


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

    if (window.innerWidth < this.breakpointWidth) {
      // content = news.map(currPosting => (
      //   <NewsItem posting={currPosting} key={currPosting.Posting_ID} />
      // ));

    } else if (!news) {
      //content = news.map(currPosting => <NewsItem posting={currPosting} key={currPosting.Posting_ID} />);

      header = (
        <div style={headerStyle}>
          <Grid container direction="row">
            <Grid item xs={4}>
              <Typography variant="body2" style={headerStyle}>
                SUBJECT
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body2" style={headerStyle}>
                POSTED BY
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body2" style={headerStyle}>
                POSTED
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body2" style={headerStyle}>
                CATEGORY
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
            {/* <List >{content}</List> */}
          </Grid>
        </Card>
      </section>
    );
  }
}

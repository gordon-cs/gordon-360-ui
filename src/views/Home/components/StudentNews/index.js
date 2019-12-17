import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import NewsItem from './components/NewsItem';
import { gordonColors } from '../../../../theme';
import studentNewsService from './../../../../services/studentNewsService';
import './student-news.css';

export default class StudentNews extends Component {
  constructor(props) {
    super(props);
    this.handleExpandClick = this.handleExpandClick.bind(this);
    this.state = {
      open: false,
      studentNews: [],
    };
  }

  componentDidMount() {
    studentNewsService.get().then(response => {
      this.setState({
        studentNews: response,
      });
    });
  }

  handleExpandClick() {
    this.setState({ open: !this.state.open });
  }

  render() {
    const headerStyle = {
      backgroundColor: gordonColors.primary.blue,
      color: '#FFF',
      padding: '10px',
    };
    const { studentNews } = this.state;
    const newsItems = studentNews ? (
      studentNews.map(newsItem => (
        <NewsItem
          subject={newsItem.subject}
          submittedBy={newsItem.name}
          description={newsItem.news}
          dateSubmitted={newsItem.time}
          onClick={() => {
            this.handleExpandClick();
          }}
        />
      ))
    ) : (
      <></>
    );

    const header = (
      <Card>
        <div style={headerStyle}>
          <Grid container direction="row" alignItems="center">
            <Grid item xs={4} align="left">
              <Typography variant="body2" style={headerStyle}>
                STUDENT NEWS
              </Typography>
            </Grid>
            <Grid item xs={8} align="right">
              <Button
                variant="contained"
                color="secondary"
                style={{
                  color: 'white',
                }}
                onClick={() => {
                  window.location.pathname = '/student-news-submissions';
                }}
              >
                New Submission
              </Button>
            </Grid>
          </Grid>
        </div>
      </Card>
    );

    let style = null;
    console.log(this.studentNews);
    if (this.studentNews === undefined || this.studentNews === null) {
      style = {
        height: '450px',
      };
    } else {
      style = {
        height: '450px',
        overflowY: 'scroll',
      };
    }
    const content = <div style={style}>{newsItems}</div>;

    return (
      <section>
        {/* <Card onClick={this.handleExpandClick}> */}
        {header}
        <Grid>
          {/* <List className="event-list">{content}</List> */}
          {content}
        </Grid>
        {/* </Card> */}
      </section>
    );
  }
}

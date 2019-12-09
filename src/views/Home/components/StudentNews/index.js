import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import NewsItem from './components/NewsItem';
import { gordonColors } from '../../../../theme';
import studentNewsService from '../../../../services/studentNewsService';
import './student-news.css';
import news from '../../../../services/news';

export default class StudentNews extends Component {
  constructor(props) {
    super(props);
    this.handleExpandClick = this.handleExpandClick.bind(this);
    this.state = {
      open: false,
      studentNews: null,
    };
  }

  componentDidMount() {
    studentNewsService.get().then(response => {
      console.log('Student news:', response.studentNews);
      this.setState({
        studentNews: response.studentNews,
      });
    });
  }

  handleExpandClick() {
    this.setState({ open: !this.state.open });
    this.getStudentNews();
  }

  async getStudentNews() {
    const theNews = await news.getStudentNews();
    console.log(theNews);
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
          submittedBy={newsItem.submittedBy}
          description={newsItem.description}
          dateSubmitted={newsItem.dateSubmitted}
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

    const content = <div className="news-list">{newsItems}</div>;

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

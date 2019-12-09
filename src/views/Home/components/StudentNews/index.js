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
      console.log('Student news:', response);
      // this.setState({
      //   studentNews: response,
      // });
    });
  }

  handleExpandClick() {
    this.setState({ open: !this.state.open });
    this.getStudentNews();
  }

  async getStudentNews() {
    const news = await news.getStudentNews();
    console.log(news);
  }

  render() {
    const headerStyle = {
      backgroundColor: gordonColors.primary.blue,
      color: '#FFF',
      padding: '10px',
    };

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

    const content = (
      <div className="news-list">
        <NewsItem
          subject="Selling Christmas Gala Ticket"
          submittedBy="SeHee Hyung"
          description="If you want to buy Christmas Gala ticket, email SeHee Hyung"
          dateSubmitted="12/2/2019"
        />
        <NewsItem
          subject="Need more meme videos"
          submittedBy="Michael Xiao"
          description="Plz send me your meme videos so I can make meme compilation thx bye"
          dateSubmitted="12/1/2019"
        />
        <NewsItem
          subject="We need help"
          submittedBy="Student News"
          description="Who do we talk to so we can pull student news items"
          dateSubmitted="11/28/2019"
        />
      </div>
    );

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

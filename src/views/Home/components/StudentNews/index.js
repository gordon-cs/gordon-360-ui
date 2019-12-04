import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Doughnut, defaults } from 'react-chartjs-2';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import NewsItem from './components/NewsItem';
import { gordonColors } from '../../../../theme';
import user from '../../../../services/user';
import session from '../../../../services/session';
import GordonLoader from '../../../../components/Loader';
import List from '@material-ui/core/List';
import './student-news.css';

export default class StudentNews extends Component {
  constructor(props) {
    super(props);
    this.handleExpandClick = this.handleExpandClick.bind(this);
    this.state = { open: false };
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
      <div className="event-list">
        <NewsItem
          subject="Selling Christmas Gala Ticket"
          submittedBy="SeHee Hyung"
          description="If you want to buy Christmas Gala ticket, email SeHee Hyung"
        />
        <NewsItem
          subject="Need more meme videos"
          submittedBy="Michael Xiao"
          description="Plz send me your meme videos so I can make meme compilation thx bye"
        />
        <NewsItem
          subject="We need help"
          submittedBy="Student News"
          description="Who do we talk to so we can pull student news items"
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

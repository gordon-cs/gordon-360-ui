import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import { gordonColors } from '../../../../theme';
import GordonLoader from '../../../../components/Loader';
import "./verseBox.css"
import Button from '@material-ui/core/Button';

export default class VerseOfTheDay extends Component {
  constructor(props) {
    super(props);

    this.loadVerse = this.loadVerse.bind(this);

    this.state = {
      error: null,
      loading: true,
      verse: null,
      book: null,
      reference: null,
    };
  }
  componentDidMount() {
    this.loadVerse();
  }

  async loadVerse() {
    this.setState({ loading: true });
    console.log('TRUE');
    try {
      fetch(
        'https://beta.ourmanna.com/api/v1/get/?format=json&order=random'
      )
        .then(response => {
          return response.json();
        })
        .then(result => {
          console.log(result);
          this.setState({
            verse: result.verse.details.text,
            book: result.verse.details.version,
            reference: result.verse.details.reference,
            loading: false,
          });
        })
        .catch(err => {
          console.log(err);
        });
    } catch (error) {
      this.setState({ error });
    }
  }

  render() {
    if (this.state.error) {
      throw this.state.error;
    }

    let content;
    let title;

    if (this.state.loading === true) {
      content = <GordonLoader />;
    } else {
      content = this.state.verse.replace(/"/g, "'");
      title =
        this.state.reference +
        ' (' +
        this.state.book + ')'
    }

    // Styling used for button to retrieve a new verse
    const style = {
      button: {
        background: gordonColors.primary.cyan,
        color: 'white',
      },
    };

    return (
      <Card>
        <CardContent id="verse">
          <Grid container direction="row" alignItems="center">
            <Grid item xs={7} align="left">
            <CardHeader id="title" title={title} />
            </Grid>
            <Grid item xs={5} align="right">
                  <Button
                    variant="contained"
                    style={style.button}
                    onClick={() => this.loadVerse()}
                    >
                    New Verse
                  </Button>
                </Grid>
              </Grid>
          " {content} "
        </CardContent>
      </Card>
    );
  }
}

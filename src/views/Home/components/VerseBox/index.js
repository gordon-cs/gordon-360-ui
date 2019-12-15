import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { gordonColors } from '../../../../theme';
import GordonLoader from '../../../../components/Loader';
import "./verseBox.css"

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
      content = this.state.verse;
      title =
        this.state.book +
        ' ' +
        this.state.reference
    }
    return (
      <Card>
        <CardContent id="verse">
          <CardHeader id="title" title={title} />"{content}"
        </CardContent>
      </Card>
    );
  }
}

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
      chapter: null,
      verseFrom: null,
      verseTo: null,
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
        'https://ajith-holy-bible.p.rapidapi.com/GetVerses?Book=Luke&chapter=1&VerseFrom=5&VerseTo=8',
        {
          method: 'GET',
          headers: {
            'x-rapidapi-host': 'ajith-holy-bible.p.rapidapi.com',
            'x-rapidapi-key': '680f1d67bfmshf998753267a5dd6p150946jsn6e2c7cd6e30f',
          },
        },
      )
        .then(response => {
          return response.json();
        })
        .then(result => {
          console.log(result);
          this.setState({
            verse: result.Output,
            book: result.Book,
            chapter: result.Chapter,
            verseFrom: result.VerseFrom,
            verseTo: result.VerseTo,
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
        this.state.chapter +
        ': ' +
        this.state.verseFrom +
        '-' +
        this.state.verseTo;
    }
    return (
      <Card>
<<<<<<< HEAD
        <CardContent id="verse">
          <CardHeader id="title" title={title} />"{verseOfTheDay}"
=======
        <CardContent>
          <CardHeader title={title} />
          {content}
>>>>>>> 01b9c214a4e09502196dceeed47357b641762162
        </CardContent>
      </Card>
    );
  }
}

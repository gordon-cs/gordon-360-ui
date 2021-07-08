import React, { Component } from 'react';
import IMG from 'react-graceful-image';
import { Typography, Grid, Divider } from '@material-ui/core';
import PropTypes from 'prop-types';
// import user from 'services/user';
import { Link } from 'react-router-dom';
import userService from 'services/user';
import handleViewport from 'react-in-viewport';

import './peopleSearchResult.css';

class PeopleSearchResultBlock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      avatar: null,
      prefImage: null,
      defImage: null,
      test: 'data:image/jpg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QBaRXhpZgAATU0AKgAAAAgABQMBAAUAAAABAAAASgMDAAEAAAABAAAAAFEQAAEAAAABAQAAAFERAAQAAAABAAAOw1ESAAQAAAABAAAOwwAAAAAAAYagAACxj//bAEMAAgEBAgEBAgICAgICAgIDBQMDAwMDBgQEAwUHBgcHBwYHBwgJCwkICAoIBwcKDQoKCwwMDAwHCQ4PDQwOCwwMDP/bAEMBAgICAwMDBgMDBgwIBwgMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDP/AABEIALkAoAMBIgACEQEDEQH/xAAfAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgv/xAC1EAACAQMDAgQDBQUEBAAAAX0BAgMABBEFEiExQQYTUWEHInEUMoGRoQgjQrHBFVLR8CQzYnKCCQoWFxgZGiUmJygpKjQ1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4eLj5OXm5+jp6vHy8/T19vf4+fr/xAAfAQADAQEBAQEBAQEBAAAAAAAAAQIDBAUGBwgJCgv/xAC1EQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/AMuiiivxc/gMKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/2Q==',
    };
    this.loadAvatar = this.loadAvatar.bind(this);
  }

  componentDidUpdate(newProps) {
    if (this.props.Person.AD_Username !== newProps.Person.AD_Username) {
    }
  }

  componentDidMount() {}

  // async loadAvatar() {
  //   const { inViewport } = this.props;
  //   if (inViewport) {
  //   return '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'
  //   }
  // }

  // async loadAvatar() {
  //   const { inViewport } = this.props;

  //   this.setState({avatar: "data:image/jpg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QBaRXhpZgAATU0AKgAAAAgABQMBAAUAAAABAAAASgMDAAEAAAABAAAAAFEQAAEAAAABAQAAAFERAAQAAAABAAAOw1ESAAQAAAABAAAOwwAAAAAAAYagAACxj//bAEMAAgEBAgEBAgICAgICAgIDBQMDAwMDBgQEAwUHBgcHBwYHBwgJCwkICAoIBwcKDQoKCwwMDAwHCQ4PDQwOCwwMDP/bAEMBAgICAwMDBgMDBgwIBwgMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDP/AABEIALkAoAMBIgACEQEDEQH/xAAfAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgv/xAC1EAACAQMDAgQDBQUEBAAAAX0BAgMABBEFEiExQQYTUWEHInEUMoGRoQgjQrHBFVLR8CQzYnKCCQoWFxgZGiUmJygpKjQ1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4eLj5OXm5+jp6vHy8/T19vf4+fr/xAAfAQADAQEBAQEBAQEBAAAAAAAAAQIDBAUGBwgJCgv/xAC1EQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/AMuiiivxc/gMKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/2Q=="});
  //   const [{ def: defaultImage, pref: preferredImage }] = await Promise.all([
  //       await userService.getImage(this.props.Person.AD_Username),
  //     ]);
  //   if (inViewport) {
  //     if (this.props.Person.AD_Username) {
  //       this.setState({ avatar: preferredImage || defaultImage });
  //       console.log("hey");
  //     } else {
  //         this.setState({avatar: "data:image/jpg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QBaRXhpZgAATU0AKgAAAAgABQMBAAUAAAABAAAASgMDAAEAAAABAAAAAFEQAAEAAAABAQAAAFERAAQAAAABAAAOw1ESAAQAAAABAAAOwwAAAAAAAYagAACxj//bAEMAAgEBAgEBAgICAgICAgIDBQMDAwMDBgQEAwUHBgcHBwYHBwgJCwkICAoIBwcKDQoKCwwMDAwHCQ4PDQwOCwwMDP/bAEMBAgICAwMDBgMDBgwIBwgMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDP/AABEIALkAoAMBIgACEQEDEQH/xAAfAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgv/xAC1EAACAQMDAgQDBQUEBAAAAX0BAgMABBEFEiExQQYTUWEHInEUMoGRoQgjQrHBFVLR8CQzYnKCCQoWFxgZGiUmJygpKjQ1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4eLj5OXm5+jp6vHy8/T19vf4+fr/xAAfAQADAQEBAQEBAQEBAAAAAAAAAQIDBAUGBwgJCgv/xAC1EQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/AMuiiivxc/gMKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/2Q=="});
  //     }
  //   } else {
  //       this.setState({avatar: "data:image/jpg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QBaRXhpZgAATU0AKgAAAAgABQMBAAUAAAABAAAASgMDAAEAAAABAAAAAFEQAAEAAAABAQAAAFERAAQAAAABAAAOw1ESAAQAAAABAAAOwwAAAAAAAYagAACxj//bAEMAAgEBAgEBAgICAgICAgIDBQMDAwMDBgQEAwUHBgcHBwYHBwgJCwkICAoIBwcKDQoKCwwMDAwHCQ4PDQwOCwwMDP/bAEMBAgICAwMDBgMDBgwIBwgMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDP/AABEIALkAoAMBIgACEQEDEQH/xAAfAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgv/xAC1EAACAQMDAgQDBQUEBAAAAX0BAgMABBEFEiExQQYTUWEHInEUMoGRoQgjQrHBFVLR8CQzYnKCCQoWFxgZGiUmJygpKjQ1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4eLj5OXm5+jp6vHy8/T19vf4+fr/xAAfAQADAQEBAQEBAQEBAAAAAAAAAQIDBAUGBwgJCgv/xAC1EQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/AMuiiivxc/gMKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/2Q=="});
  //   }
  // }

  async loadAvatar() {
    const { inViewport } = this.props;
    const { def: defaultImage, pref: preferredImage } = await userService.getImage(
      this.props.Person.AD_Username,
    );
    if (inViewport) {
      console.log(inViewport);
      console.log('in');
      if (this.props.Person.AD_Username && false) {
        console.log('good');
        console.log(typeof (preferredImage || defaultImage));
        return preferredImage || defaultImage;
      } else {
        console.log('hmm');
        return '/9j/4AAQSkZJRgABAQEAYABgAAD/4QBaRXhpZgAATU0AKgAAAAgABQMBAAUAAAABAAAASgMDAAEAAAABAAAAAFEQAAEAAAABAQAAAFERAAQAAAABAAAOw1ESAAQAAAABAAAOwwAAAAAAAYagAACxj//bAEMAAgEBAgEBAgICAgICAgIDBQMDAwMDBgQEAwUHBgcHBwYHBwgJCwkICAoIBwcKDQoKCwwMDAwHCQ4PDQwOCwwMDP/bAEMBAgICAwMDBgMDBgwIBwgMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDP/AABEIALkAoAMBIgACEQEDEQH/xAAfAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgv/xAC1EAACAQMDAgQDBQUEBAAAAX0BAgMABBEFEiExQQYTUWEHInEUMoGRoQgjQrHBFVLR8CQzYnKCCQoWFxgZGiUmJygpKjQ1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4eLj5OXm5+jp6vHy8/T19vf4+fr/xAAfAQADAQEBAQEBAQEBAAAAAAAAAQIDBAUGBwgJCgv/xAC1EQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/AMuiiivxc/gMKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/2Q==';
      }
    } else {
      console.log(inViewport);
      console.log('mayday');
      return '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';
    }
  }

  render() {
    const { Person, size } = this.props;
    let personClassJobTitle, nickname, fullName, personMailLocation;
    fullName = Person.FirstName + ' ' + Person.LastName;

    // set nicknames up
    if (Person.NickName && Person.FirstName !== Person.NickName) {
      nickname = '(' + Person.NickName + ')';
    }
    // set classes up
    if (Person.Type === 'Student') {
      switch (Person.Class) {
        case '1':
          personClassJobTitle = 'First Year';
          break;
        case '2':
          personClassJobTitle = 'Sophomore';
          break;
        case '3':
          personClassJobTitle = 'Junior';
          break;
        case '4':
          personClassJobTitle = 'Senior';
          break;
        case '5':
          personClassJobTitle = 'Graduate Student';
          break;
        case '6':
          personClassJobTitle = 'Undergraduate Conferred';
          break;
        case '7':
          personClassJobTitle = 'Graduate Conferred';
          break;
        default:
          personClassJobTitle = '-----';
          break;
      }
      // set job titles up
    } else if (Person.JobTitle && Person.Type !== 'Student') {
      personClassJobTitle = Person.JobTitle;
    }
    // set mailbox up
    if (Person.Mail_Location) {
      personMailLocation =
        Person.Type === 'Student'
          ? 'Mailbox #' + Person.Mail_Location
          : 'Mailstop: ' + Person.Mail_Location;
    }

    /*** Single Size - One Column (Mobile View) ***/
    if (size === 'single') {
      return (
        <>
          <Divider />
          <Link className="gc360-link" to={`profile/${Person.AD_Username}`}>
            <Grid
              container
              alignItems="center"
              justify="center"
              spacing={2}
              style={{
                padding: '1rem',
              }}
            >
              <Grid item>
                <IMG
                  className="people-search-avatar-mobile"
                  src={`data:image/jpg;base64,${this.state.avatar}`}
                  alt=""
                  noLazyLoad="false"
                  placeholderColor="#eeeeee"
                />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h5">{fullName}</Typography>
                <Typography variant="body2">{nickname}</Typography>
                <Typography variant="body2">{personClassJobTitle}</Typography>
                <Typography variant="body2">{Person.Email}</Typography>
                <Typography variant="body2">{personMailLocation}</Typography>
              </Grid>
            </Grid>
          </Link>
          <Divider />
        </>
      );
    } else if (size === 'largeImages') {
      /*** Enlarged Images ***/
      return (
        <>
          <Divider />
          <Link className="gc360-link" to={`profile/${Person.AD_Username}`}>
            <Grid
              container
              alignItems="center"
              justify="center"
              spacing={2}
              style={{
                padding: '1rem',
              }}
            >
              <Grid item xs={6} container justify="flex-end">
                <IMG
                  className="people-search-avatar-large"
                  src={`data:image/jpg;base64,${this.state.avatar}`}
                  alt=""
                  noLazyLoad="false"
                  placeholderColor="#eeeeee"
                />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h5">{fullName}</Typography>
                <Typography variant="body2">{nickname}</Typography>
                <Typography variant="body2">{personClassJobTitle}</Typography>
                <Typography variant="body2">{Person.Email}</Typography>
                <Typography variant="body2">{personMailLocation}</Typography>
              </Grid>
            </Grid>
          </Link>
          <Divider />
        </>
      );
    } else {
      /*** Full Size - Multiple Columns (Desktop View) ***/
      return (
        <>
          <Divider />
          <Link className="gc360-link" to={`profile/${Person.AD_Username}`}>
            <Grid
              container
              direction="row"
              alignItems="center"
              spacing={2}
              style={{
                padding: '1rem',
              }}
            >
              <Grid item xs={1}>
                <IMG
                  className="people-search-avatar"
                  src={`data:image/jpg;base64,${this.loadAvatar()}`}
                  alt=""
                  noLazyLoad="false"
                  placeholderColor="#eeeeee"
                />
              </Grid>
              <Grid item xs={2}>
                <Typography>
                  {Person.FirstName} {nickname}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>{Person.LastName}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>{Person.Type}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>{personClassJobTitle}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>{Person.AD_Username}</Typography>
                <Typography>{personMailLocation}</Typography>
              </Grid>
            </Grid>
          </Link>
          <Divider />
        </>
      );
    }
  }
}

const PeopleSearchResult = handleViewport(PeopleSearchResultBlock);
export default PeopleSearchResult;

PeopleSearchResultBlock.propTypes = {
  Person: PropTypes.shape({
    FirstName: PropTypes.string.isRequired,
    LastName: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
  }).isRequired,
};

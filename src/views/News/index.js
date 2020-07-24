import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import PostAddIcon from '@material-ui/icons/PostAdd';
import Typography from '@material-ui/core/Typography';
import gordonEvent from './../../services/event';
import news from './../../services/news';
import userService from './../../services/user';
import NewsList from '../News/components/NewsList';
import GordonLoader from '../../components/Loader';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import { Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Link } from 'react-router-dom';
// testing for future feature to upload image
// import IDUploader from '../IDUploader';
// import Dropzone from 'react-dropzone';

const styles = {
  searchBar: {
    margin: '0 auto',
  },
  newNewsForm: {
    backgroundColor: '#fff',
  },
  fab: {
    margin: 0,
    top: 'auto',
    right: 40,
    bottom: 40,
    left: 'auto',
    position: 'fixed',
    zIndex: 1,
  },
};

export default class StudentNews extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      search: '',
      openPostActivity: false,
      loading: true,
      categories: [],
      news: [],
      network: 'online',
      newPostCategory: '',
      newPostSubject: '',
      newPostBody: '',
      snackbarOpen: false,
      snackbarMessage: 'Something went wrong',
      currentUsername: '',
    };
    this.isMobileView = false;
    this.breakpointWidth = 540;
    this.updateSnackbar = this.updateSnackbar.bind(this);
  }

  componentWillMount() {
    this.setState({ loading: false })
    this.loadNews();
    this.loadUsername();
  }

  async loadUsername() {
    const user = await userService.getProfileInfo();
    this.setState({
      currentUsername: user.AD_Username,
    });
  }

  handlePostClick() {
    this.setState({ openPostActivity: true });
  }

  handleWindowClose() {
    this.setState({ openPostActivity: false });
  }

  handleSnackbarClose = (reason) => {
    console.log(reason);
    if (reason === 'clickaway') {
      return;
    }
    this.setState({snackbarOpen: false});
  };

  // 'New Post' Handlers
  onChange(event) {
    if(event.target.name === null || event.target.name === '') {
      throw new Error("The name of the input must be set " +
                "to the appropriate 'state' property value " +
                "for the onChange() function to work");
    }
    this.setState({[event.target.name]: event.target.value});
  }

  updateSnackbar(message) {
    this.setState({ snackbarMessage: message });
    this.setState({ snackbarOpen: true });
  }

  async handleSubmit() {
    // create the JSON newsItem object to post
    let newsItem = {
      categoryID: this.state.newPostCategory, 
      Subject: this.state.newPostSubject,
      Body: this.state.newPostBody,
    };

    // submit the news item and give feedback
    let result = await news.submitStudentNews(newsItem);
    if(result === undefined) {
      this.updateSnackbar('News Posting Failed to Submit');
    }
    else {
      this.updateSnackbar('News Posting Submitted Successfully');
    }

    // close the window and reload to update data
    // (necessary since data is currently not pulled from render method)
    this.setState({ openPostActivity: false });
    window.top.location.reload();
  }

  // This should be the only time we pull from the database
  async loadNews() {
    this.setState({ loading: true });

    if (this.props.Authentication) {
      const newsCategories = await news.getCategories();
      const personalUnapprovedNews = await news.getPersonalUnapprovedFormatted();
      const unexpiredNews = await news.getNotExpiredFormatted();
      this.setState({ 
        loading: false,
        categories: newsCategories, 
        news: unexpiredNews,
        personalUnapprovedNews: personalUnapprovedNews
      });
    } else {
      // TODO: test authentication handling and neaten code (ex. below)
      // alert("Please sign in to access student news");
    }
  }
  
  // TODO: Currently disabled and unused
  search(name) {
    return async event => {
      await this.setState({
        [name]: event.target.value,
      });
      const events = await gordonEvent.getFilteredEvents(this.state);
      this.setState({ filteredEvents: events, loading: false });
    };
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
    // if all of the inputs are filled, enable 'submit' button
    let submitButtonDisabled = this.state.newPostCategory === '' ||
                         this.state.newPostSubject === '' || 
                         this.state.newPostBody === '';
    let content;

    /* Used to re-render the page when the network connection changes.
     *  this.state.network is compared to the message received to prevent
     *  multiple re-renders that creates extreme performance lost.
     *  The origin of the message is checked to prevent cross-site scripting attacks
     */
    window.addEventListener('message', event => {
      if (
        event.data === 'online' &&
        this.state.network === 'offline' &&
        event.origin === window.location.origin
      ) {
        this.setState({ network: 'online' });
      } else if (
        event.data === 'offline' &&
        this.state.network === 'online' &&
        event.origin === window.location.origin
      ) {
        this.setState({ network: 'offline' });
      }
    });

    /* Gets status of current network connection for online/offline rendering
     *  Defaults to online in case of PWA not being possible
     */
    const networkStatus = JSON.parse(localStorage.getItem('network-status')) || 'online';

    if(this.props.Authentication) {

      if (this.state.loading === true) {
        content = <GordonLoader />;
      } else if (this.state.news.length > 0) {
        content = <NewsList 
          news={this.state.news} 
          personalUnapprovedNews={this.state.personalUnapprovedNews}
          updateSnackbar={this.updateSnackbar}
          currentUsername={this.state.currentUsername} />;
      } else {
        content = (
          <Grid item>
            <Typography variant="h4">No News To Show</Typography>
          </Grid>
        );
      }

      let news;
      // If the user is online
      if (networkStatus === 'online' || (networkStatus === 'offline' && this.props.Authentication)) {
        news = (
          <section>
            {/* Button to Create Posting */}
            <Fab
              variant="extended"
              color="primary"
              onClick={this.handlePostClick.bind(this)}
              style={styles.fab}
            >
              <PostAddIcon />
              Post Listing
            </Fab>

            {/* Remove spacing when search has been enabled */}
            <div style={{padding: "10px"}}></div>

            <Grid container justify="center">
              
              {/* TODO: Search, disabled until working and added temporary padding */}
              {/* Search */}
              {/* <Grid item xs={12} md={12} lg={8}>
                <Grid container alignItems="baseline" justify="center" style={styles.searchBar} spacing={8}>
                  <Grid item xs={10} sm={8} md={8} lg={6}>
                    <TextField
                      id="search"
                      label="Search"
                      value={this.state.search}
                      onChange={this.search('search')}
                      margin="normal"
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </Grid> */}

              {/* NOTE: leaving helper text for now in case 
              that is better than disabling submit button */}
              {/* Create Posting */}
              <Dialog open={this.state.openPostActivity} fullWidth>
                    <DialogTitle> Post on Student News </DialogTitle>
                    <DialogContent>
                      <Grid container>
                        {/* CATEGORY ENTRY */}
                        <Grid item>
                            <TextField
                              select
                              label="Category"
                              name="newPostCategory"
                              value={this.state.newPostCategory}
                              onChange={this.onChange.bind(this)}
                              // helperText="Please choose a category."
                              style={{minWidth: '7rem'}}
                            >
                              {this.state.categories.map((category) => 
                                <MenuItem 
                                  key={category.categoryID}
                                  value={category.categoryID}>
                                  {category.categoryName}
                                </MenuItem>
                              )}
                            </TextField>
                        </Grid>
                        
                        {/* SUBJECT ENTRY */}
                        <Grid item xs={12}>
                          <TextField
                            label="Subject"
                            margin="dense"
                            fullWidth
                            name="newPostSubject"
                            value={this.state.newPostSubject}
                            onChange={this.onChange.bind(this)}
                            // helperText="Please enter a subject."
                          />
                        </Grid>

                        {/* BODY ENTRY */}
                        <Grid item xs={12}>
                          <TextField
                            label="Body"
                            margin="normal"
                            multiline
                            fullWidth
                            rows={4}
                            variant="outlined"
                            name="newPostBody"
                            value={this.state.newPostBody}
                            onChange={this.onChange.bind(this)}
                            // helperText="Please enter a body."
                          />
                        </Grid>

                        {/* Image dropzone will be added here */}
                        {/* <Grid item xs={12}>
                          <Dropzone></Dropzone>
                        </Grid> */}
                        <Grid item>
                           {/* SUBMISSION GUIDELINES */}
                          <Typography variant="caption" color="textSecondary" display="block" >
                            Student News is intended for announcing Gordon sponsored events, lost
                             and found, rides, etc. All submissions must follow the Student News 
                             guidelines and will be reviewed at the discretion of 
                             The Office of Student Life... 
                             <Link
                                href="https://gordonedu.sharepoint.com/:b:/g/
                                StudentLife/admin/EY22_o3g6vFEsfT2nYY-8JwB34OlYmA1oaE1f4FTGD2gew"
                              >
                                More Details
                              </Link>
                          </Typography>
                        </Grid>
                      </Grid>
                    </DialogContent>

                    {/* CANCEL/SUBMIT */}
                    <DialogActions>
                      <Button 
                        variant="contained" 
                        onClick={this.handleWindowClose.bind(this)}>
                        Cancel
                      </Button>
                      <Button 
                        variant="contained"
                        color="primary"
                        onClick={this.handleSubmit.bind(this)}
                        disabled={submitButtonDisabled}>
                        Submit
                      </Button>
                    </DialogActions>
                  </Dialog>

                  {/* USER FEEDBACK */}
                  <Snackbar
                    open={this.state.snackbarOpen}
                    message={this.state.snackbarMessage}
                    onClose={this.handleSnackbarClose}
                    autoHideDuration='5000'
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    action={[
                      <IconButton key="close" aria-label="Close" 
                                  color="inherit" onClick={this.handleSnackbarClose}>
                        <CloseIcon />
                      </IconButton>,
                    ]}
                  ></Snackbar>

              <Grid item xs={12} md={12} lg={8} style={{marginBottom: "7rem"}}>
                {/* list of news */}
                {content}
              </Grid>
            </Grid>
          </section>
        );
      }
      // If the user is offline
      else {
        news = (
          <Grid container justify="center" spacing="16">
            <Grid item xs={12} md={8}>
              <Card>
                <CardContent
                  style={{
                    margin: 'auto',
                    textAlign: 'center',
                  }}
                >
                  <Grid
                    item
                    xs={2}
                    alignItems="center"
                    style={{
                      display: 'block',
                      marginLeft: 'auto',
                      marginRight: 'auto',
                    }}
                  >
                    <img
                      src={require(`${'../../NoConnection.svg'}`)}
                      alt="Internet Connection Lost"
                    />
                  </Grid>
                  <br />
                  <h1>Please Re-establish Connection</h1>
                  <h4>Viewing Events has been deactivated due to loss of network.</h4>
                  <br />
                  <br />
                  <Button
                    color="primary"
                    backgroundColor="white"
                    variant="outlined"
                    onClick={() => {
                      window.location.pathname = '';
                    }}
                  >
                    Back To Home
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        );
      }
      return news;
    }
    else {
      return (
        <Grid container justify="center">
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent
                style={{
                  margin: 'auto',
                  textAlign: 'center',
                }}
              >
                <h1>You are not logged in.</h1>
                <br />
                <h4>You must be logged in to view use Student News.</h4>
                <br />
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => {
                    window.location.pathname = '';
                  }}
                >
                  Login
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      );
    }
  }
}

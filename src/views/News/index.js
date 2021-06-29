import React, { Component } from 'react';
import GordonUnauthorized from 'components/GordonUnauthorized';
import GordonOffline from 'components/GordonOffline';
import PostAddIcon from '@material-ui/icons/PostAdd';
import newsService from 'services/news';
import userService from 'services/user';
import NewsList from './components/NewsList';
import GordonLoader from 'components/Loader';
import {
  Snackbar,
  IconButton,
  Grid,
  TextField,
  Button,
  Fab,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
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
      personalUnapprovedNews: [],
      filteredNews: [],
      network: 'online',
      newPostCategory: '',
      newPostSubject: '',
      newPostBody: '',
      snackbarOpen: false,
      snackbarMessage: 'Something went wrong',
      currentUsername: '',
      // false if not editing, newsID if editing
      currentlyEditing: false,
    };
    this.isMobileView = false;
    this.breakpointWidth = 540;
    this.updateSnackbar = this.updateSnackbar.bind(this);
    this.handleNewsItemEdit = this.handleNewsItemEdit.bind(this);
    this.callFunction = this.callFunction.bind(this);
  }

  componentDidMount() {
    this.setState({ loading: false });
    this.loadNews();
    this.loadUsername();
    window.addEventListener('resize', this.resize);
  }

  async loadUsername() {
    const user = await userService.getProfileInfo();
    this.setState({
      currentUsername: user.AD_Username,
    });
  }

  handlePostClick() {
    this.setState({
      openPostActivity: true,
    });
  }

  handleWindowClose() {
    this.setState({
      openPostActivity: false,
      newPostCategory: '',
      newPostSubject: '',
      newPostBody: '',
      currentlyEditing: false,
    });
  }

  handleSnackbarClose = (reason) => {
    // not sure what reason is
    // console.log(reason);
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ snackbarOpen: false });
  };

  // 'New Post' Handlers
  onChange(event) {
    if (event.target.name === null || event.target.name === '') {
      throw new Error(
        'The name of the input must be set ' +
          "to the appropriate 'state' property value " +
          'for the onChange() function to work',
      );
    }
    this.setState({ [event.target.name]: event.target.value });
  }

  callFunction(functionName, param) {
    if (functionName == null) {
      throw new Error('Function name not specified to callFunction (news)');
    }
    switch (functionName) {
      case 'updateSnackbar':
        if (param == null) {
          throw new Error("callFunction 'Update Snackbar' requires a parameter (news)");
        }
        this.updateSnackbar(param);
        break;
      case 'handleNewsItemEdit':
        if (param == null) {
          throw new Error("callFunction 'handleNewsItemEdit' requires a parameter (news)");
        }
        this.handleNewsItemEdit(param);
        break;
      default:
        console.log('callFunction function name not applicable, double check your parameter');
    }
  }

  // Function called when 'edit' clicked for a news item
  async handleNewsItemEdit(newsID) {
    let newsItem = await newsService.getPostingByID(newsID);
    this.setState({
      openPostActivity: true,
      newPostCategory: newsItem.categoryID,
      newPostSubject: newsItem.Subject,
      newPostBody: newsItem.Body,
      currentlyEditing: newsID,
    });
  }

  updateSnackbar(message) {
    this.setState({ snackbarMessage: message });
    this.setState({ snackbarOpen: true });
  }

  // Handles the actual 'edit' submission
  async handleUpdate() {
    let newsID = this.state.currentlyEditing;
    // create the JSON newData object to update with
    let newData = {
      categoryID: this.state.newPostCategory,
      Subject: this.state.newPostSubject,
      Body: this.state.newPostBody,
    };

    // update the news item and give feedback
    let result = await newsService.editStudentNews(newsID, newData);
    if (result === undefined) {
      this.updateSnackbar('News Posting Failed to Update');
    } else {
      this.updateSnackbar('News Posting Updated Successfully');
    }

    // close the window and reload to update data
    // (necessary since data is currently not pulled from render method)
    this.setState({ openPostActivity: false });
    window.top.location.reload();
  }

  async handleSubmit() {
    // create the JSON newsItem object to post
    let newsItem = {
      categoryID: this.state.newPostCategory,
      Subject: this.state.newPostSubject,
      Body: this.state.newPostBody,
    };

    // submit the news item and give feedback
    let result = await newsService.submitStudentNews(newsItem);
    if (result === undefined) {
      this.updateSnackbar('News Posting Failed to Submit');
    } else {
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

    if (this.props.authentication) {
      const newsCategories = await newsService.getCategories();
      const personalUnapprovedNews = await newsService.getPersonalUnapprovedFormatted();
      const unexpiredNews = await newsService.getNotExpiredFormatted();
      this.setState({
        loading: false,
        categories: newsCategories,
        news: unexpiredNews,
        personalUnapprovedNews: personalUnapprovedNews,
        filteredNews: unexpiredNews,
      });
    } else {
      // TODO: test authentication handling and neaten code (ex. below)
      // alert("Please sign in to access student news");
    }
  }

  // TODO: Currently disabled and unused
  search() {
    return async (event) => {
      // await ensures state has been updated before continuing
      await this.setState({
        search: event.target.value,
      });
      const filteredNews = await newsService.getFilteredNews(this.state);
      this.setState({ filteredNews: filteredNews, loading: false });
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

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  render() {
    // if all of the inputs are filled, enable 'submit' button
    let submitButtonDisabled =
      this.state.newPostCategory === '' ||
      this.state.newPostSubject === '' ||
      this.state.newPostBody === '';
    let content;

    /* Used to re-render the page when the network connection changes.
     *  this.state.network is compared to the message received to prevent
     *  multiple re-renders that creates extreme performance lost.
     *  The origin of the message is checked to prevent cross-site scripting attacks
     */
    window.addEventListener('message', (event) => {
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

    if (this.props.authentication) {
      if (this.state.loading === true) {
        content = <GordonLoader />;
      } else if (this.state.news.length > 0 || this.state.personalUnapprovedNews.length > 0) {
        content = (
          <NewsList
            news={this.state.filteredNews}
            personalUnapprovedNews={this.state.personalUnapprovedNews}
            updateSnackbar={this.updateSnackbar}
            currentUsername={this.state.currentUsername}
            callFunction={this.callFunction}
          />
        );
      } else {
        content = (
          <Typography variant="h4" align="center">
            No News To Show
          </Typography>
        );
      }

      let submitButton = (
        <Button
          variant="contained"
          color="primary"
          onClick={this.handleSubmit.bind(this)}
          disabled={submitButtonDisabled}
        >
          Submit
        </Button>
      );
      let editButton = (
        <Button
          variant="contained"
          color="primary"
          onClick={this.handleUpdate.bind(this)}
          disabled={submitButtonDisabled}
        >
          Update
        </Button>
      );

      let news;
      // If the user is online
      if (
        networkStatus === 'online' ||
        (networkStatus === 'offline' && this.props.authentication)
      ) {
        news = (
          <>
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

            <Grid container justify="center">
              {/* Search */}
              <Grid item xs={12} md={12} lg={8}>
                <Grid
                  container
                  alignItems="baseline"
                  justify="center"
                  style={styles.searchBar}
                  spacing={5}
                >
                  <Grid item xs={10} sm={8} md={8} lg={6}>
                    <TextField
                      id="search"
                      label="Search news"
                      value={this.state.search}
                      onChange={this.search('search')}
                      margin="normal"
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </Grid>

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
                        style={{ minWidth: '7rem' }}
                      >
                        {this.state.categories.map((category) => (
                          <MenuItem key={category.categoryID} value={category.categoryID}>
                            {category.categoryName}
                          </MenuItem>
                        ))}
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
                      <Typography variant="caption" color="textSecondary" display="block">
                        Student News is intended for announcing Gordon sponsored events, lost and
                        found, rides, etc. All submissions must follow the Student News guidelines
                        and will be reviewed at the discretion of The Office of Student Life...
                        <a href="https://gordonedu.sharepoint.com/:b:/g/StudentLife/admin/EY22_o3g6vFEsfT2nYY-8JwB34OlYmA1oaE1f4FTGD2gew">
                          More Details
                        </a>
                      </Typography>
                    </Grid>
                  </Grid>
                </DialogContent>

                {/* CANCEL/SUBMIT/EDIT */}
                {
                  <DialogActions>
                    <Button variant="contained" onClick={this.handleWindowClose.bind(this)}>
                      Cancel
                    </Button>
                    {this.state.currentlyEditing === false ? submitButton : editButton}
                  </DialogActions>
                }
              </Dialog>

              {/* USER FEEDBACK */}
              <Snackbar
                open={this.state.snackbarOpen}
                message={this.state.snackbarMessage}
                onClose={this.handleSnackbarClose}
                autoHideDuration={5000}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                action={[
                  <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    onClick={this.handleSnackbarClose}
                  >
                    <CloseIcon />
                  </IconButton>,
                ]}
              ></Snackbar>

              <Grid item xs={12} lg={8} style={{ marginBottom: '7rem' }}>
                {/* list of news */}
                {content}
              </Grid>
            </Grid>
          </>
        );
      }
      // If the user is offline
      else {
        return <GordonOffline feature="Student News" />;
      }
      return news;
    } else {
      return <GordonUnauthorized feature={'student news'} />;
    }
  }
}

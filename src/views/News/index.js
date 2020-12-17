import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Fab,
  IconButton,
  MenuItem,
  Snackbar,
  TextField,
  Typography,
} from '@material-ui/core';
import PostAddIcon from '@material-ui/icons/PostAdd';
import CloseIcon from '@material-ui/icons/Close';
import newsService from './../../services/news';
import userService from './../../services/user';
import NewsList from '../News/components/NewsList';
import GordonLoader from '../../components/Loader';
import { useNetworkIsOnline } from '../../context/NetworkContext';

// TODO: Fix Filtering and Searching - currently commented out at the tag 'Fix Search'

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

const StudentNews = ({ authentication }) => {
  const [openPostActivity, setOpenPostActivity] = useState(false);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [news, setNews] = useState([]);
  const [personalUnapprovedNews, setPersonalUnapprovedNews] = useState([]);
  // const [search, setSearch] = useState(''); //Fix Search
  // const [filteredNews, setFilteredNews] = useState([]); //Fix Search
  const [newPostCategory, setNewPostCategory] = useState('');
  const [newPostSubject, setNewPostSubject] = useState('');
  const [newPostBody, setNewPostBody] = useState('');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [currentUsername, setCurrentUsername] = useState('');
  // false if not editing, newsID if editing
  const [currentlyEditing, setCurrentlyEditing] = useState(false);
  const isOnline = useNetworkIsOnline();

  const load = async () => {
    setLoading(true);
    const [
      { AD_Username },
      newsCategories,
      personalUnapprovedNews,
      unexpiredNews,
    ] = await Promise.all([
      userService.getProfileInfo(),
      newsService.getCategories(),
      newsService.getPersonalUnapprovedFormatted(),
      newsService.getNotExpiredFormatted(),
    ]);
    setCurrentUsername(AD_Username);
    setCategories(newsCategories);
    setNews(unexpiredNews);
    setPersonalUnapprovedNews(personalUnapprovedNews);
    // setFilteredNews(unexpiredNews); //'Fix Search'
    setLoading(false);
  };

  useEffect(() => {
    if (isOnline && authentication) {
      load();
    } else {
      setLoading(false);
    }
  }, [authentication, isOnline]);

  const handleWindowClose = () => {
    setOpenPostActivity(false);
    setNewPostCategory('');
    setNewPostSubject('');
    setNewPostBody('');
    setCurrentlyEditing(false);
  };

  const startEditing = async (newsID) => {
    let { categoryID, Subject, Body } = await newsService.getPostingByID(newsID);
    setOpenPostActivity(true);
    setNewPostCategory(categoryID);
    setNewPostSubject(Subject);
    setNewPostBody(Body);
    setCurrentlyEditing(newsID);
  };

  const handleUpdate = async () => {
    let newsID = currentlyEditing;
    let newData = {
      categoryID: newPostCategory,
      Subject: newPostSubject,
      Body: newPostBody,
    };

    let result = await newsService.editStudentNews(newsID, newData);
    if (result) {
      setSnackbarMessage('News Updated Successfully');
      load();
    } else {
      setSnackbarMessage('News Failed to Update');
    }
    setOpenPostActivity(false);
  };

  const handleDelete = async (newsID) => {
    let result = await newsService.deleteStudentNews(newsID);
    if (result) {
      setSnackbarMessage('News Deleted Successfully');
      load();
    } else {
      setSnackbarMessage('News Failed to Delete');
    }
    setOpenPostActivity(false);
  };

  const handleSubmit = async () => {
    let newsItem = {
      categoryID: newPostCategory,
      Subject: newPostSubject,
      Body: newPostBody,
    };

    let result = await newsService.submitStudentNews(newsItem);
    if (result) {
      setSnackbarMessage('News Submited Successfully');
      load();
    } else {
      setSnackbarMessage('News Failed to Submit');
    }
    setOpenPostActivity(false);
  };

  // TODO: Currently broken and therefore disabled Fix Search
  // const filter = () => {
  //   return async (event) => {
  //     setSearch(event.target.value);
  //     const filtered = await newsService.getFilteredNews(search); // Fix the service's filter function
  //     setFilteredNews(filtered);
  //     console.log(filteredNews);
  //     setLoading(false);
  //   };
  // };

  if (loading) {
    return <GordonLoader />;
  } else if (authentication) {
    if (isOnline) {
      return (
        <section>
          <Fab
            variant="extended"
            color="primary"
            onClick={() => setOpenPostActivity(true)}
            style={styles.fab}
          >
            <PostAddIcon />
            Post Listing
          </Fab>

          <Grid container justify="center">
            {/* Fix Search [BEGIN] - stretches until [END] below */}
            {/* <Grid item xs={12} md={12} lg={8}>
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
                    value={search}
                    onChange={filter('search')}
                    margin="normal"
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Grid> */}
            {/* Fix Search [END] */}

            <Grid item xs={12} md={12} lg={8} style={{ marginBottom: '7rem' }}>
              {news.length > 0 || personalUnapprovedNews.length > 0 ? (
                <NewsList
                  news={news}
                  personalUnapprovedNews={personalUnapprovedNews}
                  currentUsername={currentUsername}
                  onEdit={startEditing}
                  onDelete={handleDelete}
                />
              ) : (
                <Grid item>
                  <Typography variant="h4">No News To Show</Typography>
                </Grid>
              )}
            </Grid>
          </Grid>

          <Dialog open={openPostActivity} fullWidth>
            <DialogTitle> Post on Student News </DialogTitle>
            <DialogContent>
              <Grid container>
                <Grid item>
                  <TextField
                    select
                    label="Category"
                    name="newPostCategory"
                    value={newPostCategory}
                    onChange={(e) => setNewPostCategory(e.target.value)}
                    // helperText="Please choose a category."
                    style={{ minWidth: '7rem' }}
                  >
                    {categories.map(({ categoryID, categoryName }) => (
                      <MenuItem key={categoryID} value={categoryID}>
                        {categoryName}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Subject"
                    margin="dense"
                    fullWidth
                    name="newPostSubject"
                    value={newPostSubject}
                    onChange={(e) => setNewPostSubject(e.target.value)}
                    // helperText="Please enter a subject."
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Body"
                    margin="normal"
                    multiline
                    fullWidth
                    rows={4}
                    variant="outlined"
                    name="newPostBody"
                    value={newPostBody}
                    onChange={(e) => setNewPostBody(e.target.value)}
                    // helperText="Please enter a body."
                  />
                </Grid>

                <Grid item>
                  <Typography variant="caption" color="textSecondary" display="block">
                    Student News is intended for announcing Gordon sponsored events, lost and found,
                    rides, etc. All submissions must follow the Student News guidelines and will be
                    reviewed at the discretion of The Office of Student Life...
                    <a href="https://gordonedu.sharepoint.com/:b:/g/StudentLife/admin/EY22_o3g6vFEsfT2nYY-8JwB34OlYmA1oaE1f4FTGD2gew">
                      More Details
                    </a>
                  </Typography>
                </Grid>
              </Grid>
            </DialogContent>

            <DialogActions>
              <Button variant="contained" onClick={handleWindowClose}>
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={currentlyEditing ? handleUpdate : handleSubmit}
                disabled={newPostCategory === '' || newPostSubject === '' || newPostBody === ''}
              >
                {currentlyEditing ? 'Update' : 'Submit'}
              </Button>
            </DialogActions>
          </Dialog>

          <Snackbar
            open={!!snackbarMessage}
            message={snackbarMessage}
            onClose={(_, reason) => {
              if (reason !== 'clickaway') setSnackbarMessage('');
            }}
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
                onClick={(_, reason) => {
                  if (reason !== 'clickaway') setSnackbarMessage('');
                }}
              >
                <CloseIcon />
              </IconButton>,
            ]}
          ></Snackbar>
        </section>
      );
    }
    // If the user is offline
    else {
      return (
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
                <h4>Viewing News has been deactivated due to loss of network.</h4>
                <br />
                <br />
                <Button
                  color="primary"
                  backgroundColor="white"
                  variant="outlined"
                  onClick={() => (window.location.pathname = '')}
                >
                  Back To Home
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      );
    }
  } else {
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
              <h4>You must be logged in to view Student News.</h4>
              <br />
              <Button
                color="primary"
                variant="contained"
                onClick={() => (window.location.pathname = '')}
              >
                Login
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
};

export default StudentNews;

import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import PostAddIcon from '@material-ui/icons/PostAdd';
import Typography from '@material-ui/core/Typography';
import gordonEvent from './../../services/event';
import news from './../../services/news';
import NewsList from '../News/components/NewsList';
import GordonLoader from '../../components/Loader';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Select from '@material-ui/core/Select';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
// testing for future feature to upload image
// import IDUploader from '../IDUploader';
// import Dropzone from 'react-dropzone';

const styles = {
  searchBar: {
    margin: '0 auto',
  },
  formControl: {
    minWidth: 120,
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
    };
    this.handlePostClick = this.handlePostClick.bind(this);
    this.onClose = this.onClose.bind(this);
    this.isMobileView = false;
    this.breakpointWidth = 540;
  }
  componentWillMount() {
    this.setState({ loading: false })
    this.loadNews();
  }

  handlePostClick() {
    this.setState({ openPostActivity: true });
    }

  onClose() {
    this.setState({
      openPostActivity: false,
    });
  }

  onSubmit() {
    
  }

  //This should be the only time we pull from the database
  async loadNews() {
    this.setState({ loading: true });

    if (this.props.Authentication) {
      const newsCategories = await news.getCategories();
      const newNews = await news.getNewNews();
      this.setState({ loading: false, categories: newsCategories, news: newNews });
      // example code from events may be helpful
      // const allEvents = await gordonEvent.getAllEventsFormatted(); //Retrieve all events from database
      // const events = gordonEvent.getFutureEvents(allEvents); //Filter out past events initially
      // this.setState({ allEvents, events, loading: false, filteredEvents: events });

      // For Testing Purposes
      console.log("News:");
      console.log(newNews);
    } else {
      // alert("Please sign in to access student news");
    }
  }
  
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
        content = <NewsList news={this.state.news} />;
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
            <Fab
              variant="extended"
              color="primary"
              onClick={this.handlePostClick}
              style={styles.fab}
            >
              <PostAddIcon />
              Post Listing
            </Fab>
            <Grid container justify="center">
              <Grid item xs={12} md={12} lg={8}>
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
              </Grid>

              <Dialog open={this.state.openPostActivity} fullWidth>
                    <DialogTitle> Post on Student News </DialogTitle>
                    <DialogContent>
                      
                      <form style={styles.newNewsForm} onSubmit={this.handleSubmit}>
                        <Grid container>
                          <Grid item>
                              <FormControl style={styles.formControl}>
                                  <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                  <Select>
                                    {this.state.categories.map((category) => 
                                      <MenuItem 
                                        key={category.categoryID}
                                        value={category.categoryID}>
                                        {category.categoryName}
                                      </MenuItem>
                                    )}
                                  </Select>
                              </FormControl>
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              label="Subject"
                              margin="dense"
                              fullWidth
                              //onChange={this.handleChange('tempActivityBlurb')}
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
                              //onChange={this.handleChange('tempActivityJoinInfo')}
                            />
                          </Grid>
                          {/* Image dropzone will be added here */}
                          {/* <Grid item xs={12}>
                            <Dropzone></Dropzone>
                          </Grid> */}
                        </Grid>
                      </form>
                    </DialogContent>

                    <DialogActions>
                      <Button variant="contained" color="primary" onClick={this.onClose}>
                        Cancel
                      </Button>
                      <Button variant="contained" color="primary" onClick={this.onEditActivity}>
                        Submit
                      </Button>
                    </DialogActions>
                  </Dialog>

              <Grid item xs={12} md={12} lg={8}>
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

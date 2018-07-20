import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PersonIcon from '@material-ui/icons/Person';
import SchoolIcon from '@material-ui/icons/School';
import HomeIcon from '@material-ui/icons/Home';
import LocationIcon from '@material-ui/icons/LocationOn';
import CityIcon from '@material-ui/icons/LocationCity';
import BriefcaseIcon from 'react-icons/lib/fa/briefcase';
import BuildingIcon from 'react-icons/lib/fa/building';
import BookIcon from 'react-icons/lib/fa/book';
import GlobeIcon from 'react-icons/lib/fa/globe';
import { Typography } from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';
import sortBy from 'lodash/sortBy';
import uniqBy from 'lodash/uniqBy';
import goStalk from '../../services/goStalk';
import Button from '@material-ui/core/Button';
import { gordonColors } from '../../theme';
import PeopleSearchResult from './components/PeopleSearchResult';

const MIN_QUERY_LENGTH = 3;

const styles = {
  FontAwesome: {
    fontSize: 20,
    marginLeft: 2,
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  CardContent: {
    marginLeft: 8,
  },
  headerStyle: {
    backgroundColor: gordonColors.primary.blue,
    color: '#FFF',
    padding: '10px',
  },
};

class PeopleSearch extends Component {
  state = {
    nameExpanded: true,
    academicsExpanded: false,
    homeExpanded: false,
    offDepExpanded: false,

    firstNameSearchValue: '',

    peopleSearchResults: null,
  };

  handleNameExpandClick = () => {
    this.setState(state => ({ nameExpanded: !state.nameExpanded }));
  };
  handleAcademicsExpandClick = () => {
    this.setState(state => ({ academicsExpanded: !state.academicsExpanded }));
  };
  handleHomeExpandClick = () => {
    this.setState(state => ({ homeExpanded: !state.homeExpanded }));
  };
  handleOffDepExpandClick = () => {
    this.setState(state => ({ offDepExpanded: !state.offDepExpanded }));
  };

  async searchFirstName(query) {
    // Bail if query is missing or is less than minimum query length
    if (!query || query.length < MIN_QUERY_LENGTH) {
      return;
    }
    query = query.toLowerCase();
    let peopleSearchResults = [];
    peopleSearchResults = await goStalk.searchMajor(query);
    // console.log('SEARCH FUNCTION, the peopleSearchResults', peopleSearchResults.slice(0, 30));

    // Remove any duplicate entries
    peopleSearchResults = uniqBy(peopleSearchResults, 'AD_Username');

    // console.log('SEARCH FUNCTION, b4b4b4 before state set', this.state.peopleSearchResults.slice(0, 30));
    this.setState({ peopleSearchResults });
    // console.log('SEARCH FUNCTION, after after STATE BEEN SET', this.state.peopleSearchResults.slice(0, 30));
  }
  handleTextFieldChange = e => {
    this.setState({
      firstNameSearchValue: e.target.value,
    });
  };

  render() {
    const { classes } = this.props;
    let people;

    if (window.innerWidth < this.breakpointWidth) {
      const columns = [
        {
          key: 'First_Name',
          label: 'First Name',
          primary: true,
        },
        {
          key: 'Last_Name',
          label: 'Last Name',
        },
        {
          key: 'Email',
          label: 'Email',
        },
      ];
    }

    // results = <ResponsiveTable columns={columns} data={person}/>
    let header;

    if (this.state.peopleSearchResults === null) {
      header = '';
      people = '';
    } else if (this.state.peopleSearchResults.length === 0) {
      header = '';
      people = <Typography>No results found.</Typography>;
    } else {
      console.log(
        'before the map, what does this.state.peopleSearchResults equal?:',
        this.state.peopleSearchResults.slice(0, 30),
      );
      header = (
        <div style={styles.headerStyle}>
          <Grid container direction="row">
            <Grid item xs={3}>
              <Typography variant="body2" style={styles.headerStyle}>
                FIRST NAME
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="body2" style={styles.headerStyle}>
                LAST NAME
              </Typography>
            </Grid>
            {/* <Grid item xs={3}>
              <Typography variant="body2" style={styles.headerStyle}>
                EMAIL
              </Typography>
            </Grid> */}
            <Grid item xs={3}>
              <Typography variant="body2" style={styles.headerStyle}>
                CLASS
              </Typography>
            </Grid>
          </Grid>
        </div>
      );
      people = this.state.peopleSearchResults.map(person => <PeopleSearchResult Person={person} />);
    }

    return (
      <Grid container justify="center" spacing="16">
        <Grid item xs={12} md={8}>
          <Button
            color="primary"
            onClick={() => {
              this.searchFirstName(this.state.firstNameSearchValue);
            }}
            raised
          >
            SEARCH BOI.
          </Button>

          <Card>
            <CardContent
              style={{
                marginLeft: 8,
                marginTop: 8,
              }}
            >
              <Typography variant="headline">Name</Typography>
              <Grid container spacing={8} alignItems="flex-end">
                <Grid item>
                  <PersonIcon />
                </Grid>
                <Grid item xs={11}>
                  <TextField
                    id="first-name"
                    label="First Name"
                    fullWidth
                    value={this.state.firstNameSearchValue}
                    onChange={this.handleTextFieldChange}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={8} alignItems="flex-end">
                <Grid item>
                  <PersonIcon />
                </Grid>
                <Grid item xs={11}>
                  <TextField id="last-name" label="Last Name" fullWidth />
                </Grid>
              </Grid>
            </CardContent>

            <CardContent>
              <CardActions className={classes.actions} disableActionSpacing>
                <Typography variant="headline">Academics</Typography>
                <IconButton
                  className={classnames(classes.expand, {
                    [classes.expandOpen]: this.state.academicsExpanded,
                  })}
                  onClick={this.handleAcademicsExpandClick}
                  aria-expanded={this.state.academicsExpanded}
                  aria-label="Show more"
                >
                  <ExpandMoreIcon />
                </IconButton>
              </CardActions>

              <Collapse
                in={this.state.academicsExpanded}
                timeout="auto"
                unmountOnExit
                style={styles.CardContent}
              >
                <Grid container spacing={8} alignItems="baseline">
                  <Grid item>
                    <BookIcon style={styles.FontAwesome} />
                  </Grid>
                  <Grid item xs={11}>
                    <TextField id="major" label="Major" fullWidth />
                  </Grid>
                </Grid>

                <Grid container spacing={8} alignItems="baseline">
                  <Grid item>
                    <BookIcon style={styles.FontAwesome} />
                  </Grid>
                  <Grid item xs={11}>
                    <TextField id="minor" label="Minor" fullWidth />
                  </Grid>
                </Grid>

                <Grid container spacing={8} alignItems="flex-end">
                  <Grid item>
                    <SchoolIcon />
                  </Grid>
                  <Grid item xs={11}>
                    <TextField id="class" label="Class" fullWidth />
                  </Grid>
                </Grid>
              </Collapse>
            </CardContent>

            <CardContent>
              <CardActions className={classes.actions} disableActionSpacing>
                <Typography variant="headline">Home</Typography>
                <IconButton
                  className={classnames(classes.expand, {
                    [classes.expandOpen]: this.state.homeExpanded,
                  })}
                  onClick={this.handleHomeExpandClick}
                  aria-expanded={this.state.homeExpanded}
                  aria-label="Show more"
                >
                  <ExpandMoreIcon />
                </IconButton>
              </CardActions>

              <Collapse
                in={this.state.homeExpanded}
                timeout="auto"
                unmountOnExit
                style={styles.CardContent}
              >
                <Grid container spacing={8} alignItems="flex-end">
                  <Grid item>
                    <HomeIcon />
                  </Grid>
                  <Grid item xs={11}>
                    <TextField id="hometown" label="Hometown" fullWidth />
                  </Grid>
                </Grid>

                <Grid container spacing={8} alignItems="flex-end">
                  <Grid item>
                    <LocationIcon />
                  </Grid>
                  <Grid item xs={11}>
                    <TextField id="zip-code" label="Zip Code" fullWidth />
                  </Grid>
                </Grid>

                <Grid container spacing={8} alignItems="flex-end">
                  <Grid item>
                    <CityIcon />
                  </Grid>
                  <Grid item xs={11}>
                    <TextField id="state" label="State" fullWidth />
                  </Grid>
                </Grid>

                <Grid container spacing={8} alignItems="baseline">
                  <Grid item>
                    <GlobeIcon
                      style={{
                        fontSize: 22,
                        marginLeft: 2,
                      }}
                    />
                  </Grid>
                  <Grid item xs={11}>
                    <TextField id="country" label="Country" fullWidth />
                  </Grid>
                </Grid>
              </Collapse>
            </CardContent>

            <CardContent>
              <CardActions className={classes.actions} disableActionSpacing>
                <Typography variant="headline">Office and Department</Typography>
                <IconButton
                  className={classnames(classes.expand, {
                    [classes.expandOpen]: this.state.offDepExpanded,
                  })}
                  onClick={this.handleOffDepExpandClick}
                  aria-expanded={this.state.offDepExpanded}
                  aria-label="Show more"
                >
                  <ExpandMoreIcon />
                </IconButton>
              </CardActions>

              <Collapse
                in={this.state.offDepExpanded}
                timeout="auto"
                unmountOnExit
                style={styles.CardContent}
              >
                <Grid container spacing={8} alignItems="baseline">
                  <Grid item>
                    <BriefcaseIcon
                      style={{
                        fontSize: 22,
                        marginLeft: 2,
                      }}
                    />
                  </Grid>
                  <Grid item xs={11}>
                    <TextField id="office" label="Office" fullWidth />
                  </Grid>
                </Grid>

                <Grid container spacing={8} alignItems="baseline">
                  <Grid item>
                    <BuildingIcon
                      style={{
                        fontSize: 22,
                        marginLeft: 2,
                      }}
                    />
                  </Grid>
                  <Grid item xs={11}>
                    <TextField id="Building" label="Building" fullWidth />
                  </Grid>
                </Grid>
              </Collapse>
            </CardContent>
          </Card>
          <br />
          <Card>
            {header}
            {people}
          </Card>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(PeopleSearch);

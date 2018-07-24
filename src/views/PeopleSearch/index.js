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
// import uniqBy from 'lodash/uniqBy';
import goStalk from '../../services/goStalk';
import Button from '@material-ui/core/Button';
import { gordonColors } from '../../theme';
import PeopleSearchResult from './components/PeopleSearchResult';
import GordonLoader from '../../components/Loader';

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
    loading: false,
    nameExpanded: true,
    academicsExpanded: false,
    homeExpanded: false,
    offDepExpanded: false,

    // Keyboard string values
    firstNameSearchValue: '',
    lastNameSearchValue: '',
    homeCitySearchValue: '',
    zipCodeSearchValue: '',
    // Drop-down menu values
    majorSearchValue: '',
    minorSearchValue: '',
    stateSearchValue: '',
    countrySearchValue: '',
    departmentSearchValue: '',
    buildingSearchValue: '',

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

  handleFirstNameInputChange = e => {
    this.setState({
      firstNameSearchValue: e.target.value,
    });
  };
  handleLastNameInputChange = e => {
    this.setState({
      lastNameSearchValue: e.target.value,
    });
  };
  handleMajorInputChange = e => {
    this.setState({
      majorSearchValue: e.target.value,
    });
  };
  handleMinorInputChange = e => {
    this.setState({
      minorSearchValue: e.target.value,
    });
  };
  handleHomeCityInputChange = e => {
    this.setState({
      homeCitySearchValue: e.target.value,
    });
  };
  handleZipCodeInputChange = e => {
    this.setState({
      zipCodeSearchValue: e.target.value,
    });
  };
  handleStateInputChange = e => {
    this.setState({
      stateSearchValue: e.target.value,
    });
  };
  handleCountryInputChange = e => {
    this.setState({
      countrySearchValue: e.target.value,
    });
  };
  handleDepartmentInputChange = e => {
    this.setState({
      departmentSearchValue: e.target.value,
    });
  };
  handleBuildingInputChange = e => {
    this.setState({
      buildingSearchValue: e.target.value,
    });
  };

  async search(firstName, lastName, homeCity, zipCode) {
    let peopleSearchResults = [];
    peopleSearchResults = await goStalk.search(firstName, lastName, homeCity, zipCode);
    // peopleSearchResults = uniqBy(peopleSearchResults, 'AD_Username'); // Remove any duplicate entries
    this.setState({ peopleSearchResults });
  }

  render() {
    const { classes } = this.props;
    let people;
    let header;

    if (this.state.peopleSearchResults === null) {
      header = '';
      people = '';
    } else if (this.state.peopleSearchResults.length === 0) {
      header = '';
      people = <Typography>No results found.</Typography>;
    } else {
      header = (
        <div style={styles.headerStyle}>
          <Grid container direction="row">
            <Grid item xs={1} />
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
            <Grid item xs={2}>
              <Typography variant="body2" style={styles.headerStyle}>
                TYPE
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="body2" style={styles.headerStyle}>
                CLASS/JOB TITLE
              </Typography>
            </Grid>
          </Grid>
        </div>
      );
      if (this.state.loading) {
        people = <GordonLoader />;
      } else {
        people = this.state.peopleSearchResults.map(person => (
          <PeopleSearchResult Person={person} />
        ));
      }
    }

    return (
      <Grid container justify="center" spacing="16">
        <Grid item xs={12} md={8}>
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
                    onChange={this.handleFirstNameInputChange}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={8} alignItems="flex-end">
                <Grid item>
                  <PersonIcon />
                </Grid>
                <Grid item xs={11}>
                  <TextField
                    id="last-name"
                    label="Last Name"
                    fullWidth
                    value={this.state.lastNameSearchValue}
                    onChange={this.handleLastNameInputChange}
                  />
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
                    <TextField
                      id="hometown"
                      label="Hometown"
                      fullWidth
                      value={this.state.homeCitySearchValue}
                      onChange={this.handleHomeCityInputChange}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={8} alignItems="flex-end">
                  <Grid item>
                    <LocationIcon />
                  </Grid>
                  <Grid item xs={11}>
                    <TextField
                      id="zip-code"
                      label="Zip Code"
                      fullWidth
                      value={this.state.zipCodeSearchValue}
                      onChange={this.handleZipCodeInputChange}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={8} alignItems="flex-end">
                  <Grid item>
                    <CityIcon />
                  </Grid>
                  <Grid item xs={11}>
                    <TextField
                      id="state"
                      label="State"
                      fullWidth
                      value={this.state.state}
                      onChange={this.handleStateInputChange}
                    />
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
                    <TextField
                      id="country"
                      label="Country"
                      fullWidth
                      value={this.state.countrySearchValue}
                      onChange={this.handleCountryInputChange}
                    />
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
                    <TextField
                      id="department"
                      label="Department"
                      fullWidth
                      value={this.state.departmentSearchValue}
                      onChange={this.handleDepartmentInputChange}
                    />
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
                    <TextField
                      id="Building"
                      label="Building"
                      fullWidth
                      value={this.state.buildingSearchValue}
                      onChange={this.handleBuildingInputChange}
                    />
                  </Grid>
                </Grid>
              </Collapse>
            </CardContent>
          </Card>
          <Button
            color="primary"
            onClick={() => {
              this.search(
                this.state.firstNameSearchValue,
                this.state.lastNameSearchValue,
                this.state.homeCitySearchValue,
                this.state.zipCodeSearchValue,
              );
            }}
            raised
            fullWidth
            variant="contained"
          >
            SEARCH
          </Button>
          <br />
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

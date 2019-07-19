import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Media from 'react-media';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PersonIcon from '@material-ui/icons/Person';
import { FaHeart, FaBriefcase, FaBuilding, FaBook, FaGlobeAmericas } from 'react-icons/fa';
import SchoolIcon from '@material-ui/icons/School';
import HomeIcon from '@material-ui/icons/Home';
import CityIcon from '@material-ui/icons/LocationCity';
import { Typography } from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Select from '@material-ui/core/Select';
import goStalk from '../../services/goStalk';
import user from '../../services/user';
import Button from '@material-ui/core/Button';
import { gordonColors } from '../../theme';
import PeopleSearchResult from './components/PeopleSearchResult';
import MobilePeopleSearchResult from './components/MobilePeopleSearchResult';
import GordonLoader from '../../components/Loader';
import './peopleSearch.css';

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
  colorSwitchBase: {
    color: gordonColors.neutral.lightGray,
    '&$colorChecked': {
      color: gordonColors.primary.cyan,
      '& + $colorBar': {
        backgroundColor: gordonColors.primary.cyan,
      },
    },
  },
  colorBar: {},
  colorChecked: {},
};

class PeopleSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      personType: '',
      nameExpanded: true,
      academicsExpanded: false,
      homeExpanded: false,
      offDepExpanded: false,
      additionalOpsExpanded: true,

      // arrays of table data from backend
      majors: [],
      minors: [],
      states: [],
      countries: [],
      departments: [],
      buildings: [],
      halls: [],

      // Keyboard string values
      firstNameSearchValue: '',
      lastNameSearchValue: '',
      homeCitySearchValue: '',
      // Drop-down menu values
      majorSearchValue: '',
      minorSearchValue: '',
      hallSearchValue: '',
      classTypeSearchValue: '',
      stateSearchValue: '',
      countrySearchValue: '',
      departmentSearchValue: '',
      buildingSearchValue: '',
      // For April Fools:
      relationshipStatusValue: '',

      includeAlumni: false,
      peopleSearchResults: null,
      header: '',
      searchButtons: '',

      network: 'online',
    };
  }

  makeHeader() {
    let content = (
      <Media query="(min-width: 960px)">
        {matches =>
          matches ? (
            <div style={styles.headerStyle}>
              <Grid container direction="row">
                <Grid item xs={1} />
                <Grid item xs={2}>
                  <Typography variant="body2" style={styles.headerStyle}>
                    FIRST NAME
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="body2" style={styles.headerStyle}>
                    LAST NAME
                  </Typography>
                </Grid>
                <Grid item xs={1}>
                  <Typography variant="body2" style={styles.headerStyle}>
                    TYPE
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="body2" style={styles.headerStyle}>
                    CLASS/JOB TITLE
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="body2" style={styles.headerStyle}>
                    @GORDON.EDU
                  </Typography>
                </Grid>
              </Grid>
            </div>
          ) : (
            <div style={styles.headerStyle}>
              <Grid container direction="row" justify="center">
                <Grid item>
                  <Typography variant="body2" style={styles.headerStyle}>
                    RESULTS
                  </Typography>
                </Grid>
              </Grid>
            </div>
          )
        }
      </Media>
    );
    return content;
  }

  componentDidUpdate() {
    window.onpopstate = () => {
      if (!window.location.href.includes('?')) {
        window.location.reload();
      } else {
        this.goBackPage();
      }
    };
  }

  async goBackPage() {
    this.setState({
      firstNameSearchValue: '',
      lastNameSearchValue: '',
      homeCitySearchValue: '',
      majorSearchValue: '',
      minorSearchValue: '',
      hallSearchValue: '',
      classTypeSearchValue: '',
      stateSearchValue: '',
      countrySearchValue: '',
      departmentSearchValue: '',
      buildingSearchValue: '',
    });

    const urlParams = new URLSearchParams(window.location.search);
    var includeAlumni = urlParams.get('includeAlumni') || false;
    var firstName = urlParams.get('firstName').trim() || '';
    var lastName = urlParams.get('lastName').trim() || '';
    var major = urlParams.get('major').trim() || '';
    var minor = urlParams.get('minor').trim() || '';
    var hall = urlParams.get('hall').trim() || '';
    var classType = urlParams.get('classType').trim() || '';
    var homeCity = urlParams.get('homeCity').trim() || '';
    var state = urlParams.get('state').trim() || '';
    var country = urlParams.get('country').trim() || '';
    var department = urlParams.get('department').trim() || '';
    var building = urlParams.get('building').trim() || '';

    if (
      includeAlumni === false &&
      firstName === '' &&
      lastName === '' &&
      major === '' &&
      minor === '' &&
      hall === '' &&
      classType === '' &&
      homeCity === '' &&
      state === '' &&
      country === '' &&
      department === '' &&
      building === ''
    ) {
      // do not search
    } else {
      this.setState({
        header: <GordonLoader />,
        peopleSearchResults: null,
        additionalOpsExpanded: false,
      });
      let peopleSearchResults = [];
      peopleSearchResults = await goStalk.search(
        includeAlumni,
        firstName,
        lastName,
        major,
        minor,
        hall,
        classType,
        homeCity,
        state,
        country,
        department,
        building,
      );
      if (peopleSearchResults.length === 0) {
        this.setState({
          peopleSearchResults: (
            <Grid item xs={12}>
              <Typography variant="headline" align="center">
                No results found.
              </Typography>
            </Grid>
          ),
          header: '',
        });
      } else {
        this.setState({
          peopleSearchResults: (
            <Media query="(min-width: 960px)">
              {matches =>
                matches
                  ? peopleSearchResults.map(person => <PeopleSearchResult Person={person} />)
                  : peopleSearchResults.map(person => <MobilePeopleSearchResult Person={person} />)
              }
            </Media>
          ),
          header: this.makeHeader(),
        });
      }
    }
  }

  async componentWillMount() {
    try {
      const profile = await user.getProfileInfo();
      const personType = profile.PersonType;
      const [majors, minors, halls, states, countries, departments, buildings] = await Promise.all([
        goStalk.getMajors(),
        goStalk.getMinors(),
        goStalk.getHalls(),
        goStalk.getStates(),
        goStalk.getCountries(),
        goStalk.getDepartments(),
        goStalk.getBuildings(),
      ]);
      this.setState({
        majors,
        minors,
        halls,
        states,
        countries,
        departments,
        buildings,
        personType,
      });
    } catch (error) {
      // error
    }

    if (window.location.href.includes('?')) {
      const urlParams = new URLSearchParams(window.location.search);
      var includeAlumni = urlParams.get('includeAlumni') || false;
      var firstName = urlParams.get('firstName').trim() || '';
      var lastName = urlParams.get('lastName').trim() || '';
      var major = urlParams.get('major').trim() || '';
      var minor = urlParams.get('minor').trim() || '';
      var hall = urlParams.get('hall').trim() || '';
      var classType = urlParams.get('classType').trim() || '';
      var homeCity = urlParams.get('homeCity').trim() || '';
      var state = urlParams.get('state').trim() || '';
      var country = urlParams.get('country').trim() || '';
      var department = urlParams.get('department').trim() || '';
      var building = urlParams.get('building').trim() || '';
      if (
        includeAlumni === false &&
        firstName === '' &&
        lastName === '' &&
        major === '' &&
        minor === '' &&
        hall === '' &&
        classType === '' &&
        homeCity === '' &&
        state === '' &&
        country === '' &&
        department === '' &&
        building === ''
      ) {
        // do not search
      } else {
        this.setState({
          header: <GordonLoader />,
          peopleSearchResults: null,
          additionalOpsExpanded: false,
        });
        let peopleSearchResults = [];

        peopleSearchResults = await goStalk.search(
          includeAlumni,
          firstName,
          lastName,
          major,
          minor,
          hall,
          classType,
          homeCity,
          state,
          country,
          department,
          building,
        );

        if (peopleSearchResults.length === 0) {
          this.setState({
            peopleSearchResults: (
              <Grid item xs={12}>
                <Typography variant="headline" align="center">
                  No results found.
                </Typography>
              </Grid>
            ),
            header: '',
          });
        } else {
          this.setState({
            peopleSearchResults: (
              <Media query="(min-width: 960px)">
                {matches =>
                  matches
                    ? peopleSearchResults.map(person => <PeopleSearchResult Person={person} />)
                    : peopleSearchResults.map(person => (
                        <MobilePeopleSearchResult Person={person} />
                      ))
                }
              </Media>
            ),
            header: this.makeHeader(),
          });
        }
      }
    }
  }

  handleAdditionalOpsExpandClick = () => {
    this.setState(state => ({
      additionalOpsExpanded: !state.additionalOpsExpanded,
    }));
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
  handleRelationshipStatusInputChange = e => {
    this.setState({
      relationshipStatusValue: e.target.value,
    });
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
  handleHallInputChange = e => {
    this.setState({
      hallSearchValue: e.target.value,
    });
  };
  handleClassTypeInputChange = event => {
    this.setState({
      classTypeSearchValue: event.target.value,
    });
  };
  handleHomeCityInputChange = e => {
    this.setState({
      homeCitySearchValue: e.target.value,
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

  handleChangeIncludeAlumni() {
    this.setState({ includeAlumni: !this.state.includeAlumni });
  }

  async search(
    includeAlumni,
    firstName,
    lastName,
    major,
    minor,
    hall,
    classType,
    homeCity,
    state,
    country,
    department,
    building,
  ) {
    if (
      this.state.includeAlumni === false &&
      this.state.firstNameSearchValue === '' &&
      this.state.lastNameSearchValue === '' &&
      this.state.classTypeSearchValue === '' &&
      this.state.majorSearchValue === '' &&
      this.state.minorSearchValue === '' &&
      this.state.hallSearchValue === '' &&
      this.state.classTypeSearchValue === '' &&
      this.state.homeCitySearchValue === '' &&
      this.state.stateSearchValue === '' &&
      this.state.countrySearchValue === '' &&
      this.state.departmentSearchValue === '' &&
      this.state.buildingSearchValue === ''
    ) {
      // do not search
    } else {
      this.setState({
        header: <GordonLoader />,
        peopleSearchResults: null,
        additionalOpsExpanded: false,
      });
      let peopleSearchResults = [];
      peopleSearchResults = await goStalk.search(
        includeAlumni,
        firstName,
        lastName,
        major,
        minor,
        hall,
        classType,
        homeCity,
        state,
        country,
        department,
        building,
      );

      this.props.history.push(`?includeAlumni=${includeAlumni}&firstName=${firstName}&lastName=
      ${lastName}&major=${major}&minor=${minor}&hall=${hall}&classType=${classType}&homeCity=${homeCity}
      &state=${state}&country=${country}
      &department=${department}&building=${building}`);

      if (peopleSearchResults.length === 0) {
        this.setState({
          peopleSearchResults: (
            <Grid item xs={12}>
              <Typography variant="headline" align="center">
                No results found.
              </Typography>
            </Grid>
          ),
          header: '',
        });
      } else {
        this.setState({
          peopleSearchResults: (
            <Media query="(min-width: 960px)">
              {matches =>
                matches
                  ? peopleSearchResults.map(person => <PeopleSearchResult Person={person} />)
                  : peopleSearchResults.map(person => <MobilePeopleSearchResult Person={person} />)
              }
            </Media>
          ),
          header: this.makeHeader(),
        });
      }
    }
  }

  getDate = () => {
    return new Date();
  };

  handleEnterKeyPress = event => {
    if (event.key === 'Enter') {
      this.search(
        this.state.includeAlumni,
        this.state.firstNameSearchValue,
        this.state.lastNameSearchValue,
        this.state.majorSearchValue,
        this.state.minorSearchValue,
        this.state.hallSearchValue,
        this.state.classTypeSearchValue,
        this.state.homeCitySearchValue,
        this.state.stateSearchValue,
        this.state.countrySearchValue,
        this.state.departmentSearchValue,
        this.state.buildingSearchValue,
      );
    }
  };

  render() {
    const { classes } = this.props;
    let includeAlumniCheckbox;

    const majorOptions = this.state.majors.map(major => (
      <MenuItem value={major} key={major}>
        {major}
      </MenuItem>
    ));

    const minorOptions = this.state.minors.map(minor => (
      <MenuItem value={minor} key={minor}>
        {minor}
      </MenuItem>
    ));

    const hallOptions = this.state.halls.map(hall => (
      <MenuItem value={hall} key={hall}>
        {hall}
      </MenuItem>
    ));

    const stateOptions = this.state.states.map(state => (
      <MenuItem value={state} key={state}>
        {state}
      </MenuItem>
    ));

    const countryOptions = this.state.countries.map(country => (
      <MenuItem value={country} key={country}>
        {country}
      </MenuItem>
    ));

    const departmentOptions = this.state.departments.map(department => (
      <MenuItem value={department} key={department}>
        {department}
      </MenuItem>
    ));

    const buildingOptions = this.state.buildings.map(building => (
      <MenuItem value={building} key={building}>
        {building}
      </MenuItem>
    ));

    if (this.state.personType !== 'stu' && this.state.personType !== '') {
      includeAlumniCheckbox = (
        <Grid item xs={6} justify="center">
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.includeAlumni}
                onChange={() => {
                  this.handleChangeIncludeAlumni();
                }}
              />
            }
            label="Include Alumni"
          />
        </Grid>
      );
    } else {
    }

    let aprilFools = '';
    if (this.getDate().getMonth() === 3 && this.getDate().getDate() === 1) {
      aprilFools = (
        <Grid container spacing={8} alignItems="baseline">
          <Media
            query="(min-width: 600px)"
            render={() => (
              <Grid item>
                <FaHeart style={styles.FontAwesome} />
              </Grid>
            )}
          />
          <Grid item xs={11}>
            <FormControl fullWidth>
              <InputLabel>Relationship Status</InputLabel>
              <Select
                value={this.state.relationshipStatusValue}
                onChange={this.handleRelationshipStatusInputChange}
                input={<Input id="relationship-status" />}
              >
                <MenuItem label="All" value="">
                  <em>All</em>
                </MenuItem>
                <MenuItem label="Single" value="Single">
                  Single
                </MenuItem>
                <MenuItem label="Taken" value="Taken">
                  Taken
                </MenuItem>
                <MenuItem label="Engaged" value="Engaged">
                  Engaged
                </MenuItem>
                <MenuItem label="Married" value="Married">
                  Married
                </MenuItem>
                <MenuItem label="At DTR Bench Right NOW" value="At DTR Bench Right NOW">
                  At DTR Bench Right NOW
                </MenuItem>
                <MenuItem label="1st DTR" value="1st DTR">
                  1st DTR
                </MenuItem>
                <MenuItem label="2nd DTR" value="2nd DTR">
                  2nd DTR
                </MenuItem>
                <MenuItem label="Sat Together At Chapel" value="Sat Together At Chapel">
                  Sat Together At Chapel
                </MenuItem>
                <MenuItem
                  label='"Jesus Is My Significant Other"'
                  value='"Jesus Is My Significant Other"'
                >
                  "Jesus Is My Significant Other"
                </MenuItem>
                <MenuItem label="Waiting For Her Boaz" value="Waiting For Her Boaz">
                  Waiting For Her Boaz
                </MenuItem>
                <MenuItem
                  label="Waiting For His Proverbs 31 Woman"
                  value="Waiting For His Proverbs 31 Woman"
                >
                  Waiting For His Proverbs 31 Woman
                </MenuItem>
                <MenuItem label="It's Complicated" value="It's Complicated">
                  It's Complicated
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      );
    }

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

    // Creates the PeopleSearch page depending on the status of the network found in local storage
    let PeopleSearch;
    if (networkStatus === 'online') {
      PeopleSearch = (
        <Grid container justify="center" spacing="16">
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent
                style={{
                  marginLeft: 8,
                  marginTop: 8,
                }}
              >
                <Typography variant="headline">General Info</Typography>
                <Grid container spacing={8} alignItems="flex-end">
                  <Media
                    query="(min-width: 600px)"
                    render={() => (
                      <Grid item>
                        <PersonIcon />
                      </Grid>
                    )}
                  />
                  <Grid item xs={11}>
                    <TextField
                      id="first-name"
                      label="First Name"
                      max="3"
                      fullWidth
                      value={this.state.firstNameSearchValue}
                      onChange={this.handleFirstNameInputChange}
                      onKeyDown={this.handleEnterKeyPress}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={8} alignItems="flex-end">
                  <Media
                    query="(min-width: 600px)"
                    render={() => (
                      <Grid item>
                        <PersonIcon />
                      </Grid>
                    )}
                  />
                  <Grid item xs={11}>
                    <TextField
                      id="last-name"
                      label="Last Name"
                      fullWidth
                      value={this.state.lastNameSearchValue}
                      onChange={this.handleLastNameInputChange}
                      onKeyDown={this.handleEnterKeyPress}
                    />
                  </Grid>
                  <Grid container spacing={8} alignItems="flex-end">
                    <Media
                      query="(min-width: 600px)"
                      render={() => (
                        <Grid item>
                          <FaBuilding
                            style={{
                              fontSize: 22,
                              marginLeft: 6,
                            }}
                          />
                        </Grid>
                      )}
                    />
                    <Grid item xs={11}>
                      <FormControl fullWidth>
                        <InputLabel>Hall</InputLabel>
                        <Select
                          value={this.state.hallSearchValue}
                          onChange={this.handleHallInputChange}
                          input={<Input id="hall" />}
                        >
                          <MenuItem label="All Halls" value="">
                            <em>All Halls</em>
                          </MenuItem>
                          {hallOptions}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
                {aprilFools}
              </CardContent>
              <Collapse in={this.state.additionalOpsExpanded} timeout="auto" unmountOnExit>
                <CardContent>
                  <CardActions
                    className={[classes.actions, 'card-expansion']}
                    disableActionSpacing
                    onClick={this.handleAcademicsExpandClick}
                  >
                    <Typography variant="headline">Academics</Typography>
                    <IconButton
                      className={classnames(classes.expand, {
                        [classes.expandOpen]: this.state.academicsExpanded,
                      })}
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
                      <Media
                        query="(min-width: 600px)"
                        render={() => (
                          <Grid item>
                            <FaBook style={styles.FontAwesome} />
                          </Grid>
                        )}
                      />
                      <Grid item xs={11}>
                        <FormControl fullWidth>
                          <InputLabel>Major</InputLabel>
                          <Select
                            value={this.state.majorSearchValue}
                            onChange={this.handleMajorInputChange}
                            input={<Input id="major" />}
                          >
                            <MenuItem label="All Majors" value="">
                              <em>All Majors</em>
                            </MenuItem>
                            {majorOptions}
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                    <Grid container spacing={8} alignItems="baseline">
                      <Media
                        query="(min-width: 600px)"
                        render={() => (
                          <Grid item>
                            <FaBook style={styles.FontAwesome} />
                          </Grid>
                        )}
                      />
                      <Grid item xs={11}>
                        <FormControl fullWidth>
                          <InputLabel>Minor</InputLabel>
                          <Select
                            value={this.state.minorSearchValue}
                            onChange={this.handleMinorInputChange}
                            input={<Input id="minor" />}
                          >
                            <MenuItem label="All Minors" value="">
                              <em>All Minors</em>
                            </MenuItem>
                            {minorOptions}
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                    <Grid container spacing={8} alignItems="flex-end">
                      <Media
                        query="(min-width: 600px)"
                        render={() => (
                          <Grid item>
                            <SchoolIcon style={styles.FontAwesome} />
                          </Grid>
                        )}
                      />
                      <Grid item xs={11}>
                        <FormControl fullWidth>
                          <InputLabel>Class</InputLabel>
                          <Select
                            value={this.state.classTypeSearchValue}
                            onChange={this.handleClassTypeInputChange}
                            input={<Input id="class" />}
                          >
                            <MenuItem label="All Classes" value="">
                              <em>All</em>
                            </MenuItem>
                            <MenuItem value={1}>Freshman</MenuItem>
                            <MenuItem value={2}>Sophomore</MenuItem>
                            <MenuItem value={3}>Junior</MenuItem>
                            <MenuItem value={4}>Senior</MenuItem>
                            <MenuItem value={5}>Graduate Student</MenuItem>
                            <MenuItem value={6}>Undergraduate Conferred</MenuItem>
                            <MenuItem value={7}>Graduate Conferred</MenuItem>
                            <MenuItem value={0}>Unassigned</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Collapse>
                </CardContent>
                <CardContent>
                  <CardActions
                    className={[classes.actions, 'card-expansion']}
                    disableActionSpacing
                    onClick={this.handleHomeExpandClick}
                  >
                    <Typography variant="headline">Home</Typography>
                    <IconButton
                      className={classnames(classes.expand, {
                        [classes.expandOpen]: this.state.homeExpanded,
                      })}
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
                      <Media
                        query="(min-width: 600px)"
                        render={() => (
                          <Grid item>
                            <HomeIcon style={styles.FontAwesome} />
                          </Grid>
                        )}
                      />
                      <Grid item xs={11}>
                        <TextField
                          id="hometown"
                          label="Hometown"
                          fullWidth
                          value={this.state.homeCitySearchValue}
                          onChange={this.handleHomeCityInputChange}
                          onKeyDown={this.handleEnterKeyPress}
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={8} alignItems="flex-end">
                      <Media
                        query="(min-width: 600px)"
                        render={() => (
                          <Grid item>
                            <CityIcon style={styles.FontAwesome} />
                          </Grid>
                        )}
                      />
                      <Grid item xs={11}>
                        <FormControl fullWidth>
                          <InputLabel>State</InputLabel>
                          <Select
                            value={this.state.stateSearchValue}
                            onChange={this.handleStateInputChange}
                            input={<Input id="state" />}
                          >
                            <MenuItem label="All States" value="">
                              <em>All</em>
                            </MenuItem>
                            {stateOptions}
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                    <Grid container spacing={8} alignItems="baseline">
                      <Media
                        query="(min-width: 600px)"
                        render={() => (
                          <Grid item>
                            <FaGlobeAmericas
                              style={{
                                fontSize: 22,
                                marginLeft: 2,
                              }}
                            />
                          </Grid>
                        )}
                      />
                      <Grid item xs={11}>
                        <FormControl fullWidth>
                          <InputLabel>Country</InputLabel>
                          <Select
                            value={this.state.countrySearchValue}
                            onChange={this.handleCountryInputChange}
                            input={<Input id="country" />}
                          >
                            <MenuItem label="All Countries" value="">
                              <em>All</em>
                            </MenuItem>
                            {countryOptions}
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Collapse>
                </CardContent>
                <CardContent>
                  <CardActions
                    className={[classes.actions, 'card-expansion']}
                    disableActionSpacing
                    onClick={this.handleOffDepExpandClick}
                  >
                    <Typography variant="headline">Building and Department</Typography>
                    <IconButton
                      className={classnames(classes.expand, {
                        [classes.expandOpen]: this.state.offDepExpanded,
                      })}
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
                      <Media
                        query="(min-width: 600px)"
                        render={() => (
                          <Grid item>
                            <FaBriefcase
                              style={{
                                fontSize: 22,
                                marginLeft: 2,
                              }}
                            />
                          </Grid>
                        )}
                      />
                      <Grid item xs={11}>
                        <FormControl fullWidth>
                          <InputLabel>Department</InputLabel>
                          <Select
                            value={this.state.departmentSearchValue}
                            onChange={this.handleDepartmentInputChange}
                            input={<Input id="department-type" />}
                          >
                            <MenuItem label="All Departments" value="">
                              <em>All</em>
                            </MenuItem>
                            {departmentOptions}
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                    <Grid container spacing={8} alignItems="baseline">
                      <Media
                        query="(min-width: 600px)"
                        render={() => (
                          <Grid item>
                            <FaBuilding
                              style={{
                                fontSize: 22,
                                marginLeft: 2,
                              }}
                            />
                          </Grid>
                        )}
                      />
                      <Grid item xs={11}>
                        <FormControl fullWidth>
                          <InputLabel>Building</InputLabel>
                          <Select
                            value={this.state.buildingSearchValue}
                            onChange={this.handleBuildingInputChange}
                            input={<Input id="building-type" />}
                          >
                            <MenuItem label="All Buildings" value="">
                              <em>All</em>
                            </MenuItem>
                            {buildingOptions}
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Collapse>
                </CardContent>
              </Collapse>
              <CardActions>
                <Grid container direction="column" alignItems="center">
                  <Grid item xs={12}>
                    <Grid container direction="row" alignItems="flex-end" justify="center">
                      {includeAlumniCheckbox}
                      <Grid item>
                        <Button
                          color="primary"
                          variant="outlined"
                          onClick={() => {
                            this.setState({
                              includeAlumni: false,
                              firstNameSearchValue: '',
                              lastNameSearchValue: '',
                              majorSearchValue: '',
                              minorSearchValue: '',
                              hallSearchValue: '',
                              classTypeSearchValue: '',
                              homeCitySearchValue: '',
                              stateSearchValue: '',
                              countrySearchValue: '',
                              departmentSearchValue: '',
                              buildingSearchValue: '',
                            });
                          }}
                        >
                          Clear Input
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                  <br />
                  <Button
                    color="primary"
                    onClick={() => {
                      this.search(
                        this.state.includeAlumni,
                        this.state.firstNameSearchValue,
                        this.state.lastNameSearchValue,
                        this.state.majorSearchValue,
                        this.state.minorSearchValue,
                        this.state.hallSearchValue,
                        this.state.classTypeSearchValue,
                        this.state.homeCitySearchValue,
                        this.state.stateSearchValue,
                        this.state.countrySearchValue,
                        this.state.departmentSearchValue,
                        this.state.buildingSearchValue,
                      );
                    }}
                    fullWidth
                    variant="contained"
                  >
                    SEARCH
                  </Button>
                </Grid>
              </CardActions>
              <CardActions
                className={[classes.actions, 'card-expansion']}
                disableActionSpacing
                onClick={this.handleAdditionalOpsExpandClick}
                style={{
                  marginTop: '-16px',
                }}
              >
                <Grid container alignItems="baseline" justify="center">
                  <Grid item>
                    <IconButton
                      className={classnames(classes.expand, {
                        [classes.expandOpen]: this.state.additionalOpsExpanded,
                      })}
                      aria-expanded={this.state.additionalOpsExpanded}
                      aria-label="Show more"
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </CardActions>
            </Card>
            <br />
            <Card>
              {this.state.header}
              {this.state.peopleSearchResults}
            </Card>
          </Grid>
        </Grid>
      );
    } else {
      PeopleSearch = (
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
                <h4>People Search has been deactivated due to loss of network.</h4>
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

    return PeopleSearch;
  }
}

export default withStyles(styles)(PeopleSearch);

import React, { Component } from 'react';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Checkbox,
  Collapse,
  FormControl,
  FormControlLabel,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  withStyles,
} from '@material-ui/core';
import Media from 'react-media';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import {
  FaHeart,
  FaBriefcase,
  FaBuilding,
  FaBook,
  FaGlobeAmericas,
  FaSchool,
} from 'react-icons/fa';
import HomeIcon from '@material-ui/icons/Home';
import CityIcon from '@material-ui/icons/LocationCity';
import goStalk from 'services/goStalk';
import user from 'services/user';
import { gordonColors } from 'theme';
import { ReactComponent as NoConnectionImage } from 'NoConnection.svg';
import PeopleSearchResult from './components/PeopleSearchResult';
import MobilePeopleSearchResult from './components/MobilePeopleSearchResult';
import GordonLoader from 'components/Loader';

const styles = {
  FontAwesome: {
    fontSize: 20,
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
  icon: {
    color: gordonColors.neutral.grayShades[900],
  },
};

const noResultsCard = (
  <Grid item xs={12}>
    <Card>
      <CardContent>
        <Typography variant="headline" align="center">
          No results found.
        </Typography>
      </CardContent>
    </Card>
  </Grid>
);

const peopleSearchHeader = (
  <Media query="(min-width: 960px)">
    {(matches) =>
      matches ? (
        <div style={styles.headerStyle}>
          <Grid container direction="row" alignItems="center">
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
                <br />
                MAIL LOCATION
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

class PeopleSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      personType: '',
      academicsExpanded: false,
      homeExpanded: false,
      offDepExpanded: false,

      // arrays of table data from backend
      majors: [],
      minors: [],
      states: [],
      countries: [],
      departments: [],
      buildings: [],
      halls: [],

      // These values *must* be in the same order as services/goStalk.js search function
      searchValues: {
        includeAlumni: false,
        firstName: '',
        lastName: '',
        major: '',
        minor: '',
        hall: '',
        classType: '',
        homeCity: '',
        state: '',
        country: '',
        department: '',
        building: '',
      },

      // For April Fools:
      relationshipStatusValue: '',

      peopleSearchResults: null,
      header: '',
      searchButtons: '',

      network: 'online',
    };
  }

  componentDidUpdate() {
    // Browser 'back' arrow
    window.onpopstate = () => {
      if (!window.location.href.includes('?')) {
        this.setState({ header: '', peopleSearchResults: null });
      }
      this.loadSearchParamsFromURL();
    };
  }

  async componentDidMount() {
    if (this.props.authentication) {
      try {
        const profile = await user.getProfileInfo();
        const personType = profile.PersonType;
        const [majors, minors, halls, states, countries, departments, buildings] =
          await Promise.all([
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
        this.loadSearchParamsFromURL();
      }
    }
  }

  async loadSearchParamsFromURL() {
    const urlParams = new URLSearchParams(window.location.search);

    this.setState({
      searchValues: {
        includeAlumni: urlParams.get('includeAlumni') || false,
        firstName: urlParams.get('firstName')?.trim() || '',
        lastName: urlParams.get('lastName')?.trim() || '',
        major: urlParams.get('major')?.trim() || '',
        minor: urlParams.get('minor')?.trim() || '',
        hall: urlParams.get('hall')?.trim() || '',
        classType: urlParams.get('classType')?.trim() || '',
        homeCity: urlParams.get('homeCity')?.trim() || '',
        state: urlParams.get('state')?.trim() || '',
        country: urlParams.get('country')?.trim() || '',
        department: urlParams.get('department')?.trim() || '',
        building: urlParams.get('building')?.trim() || '',
      },
    });

    this.search();
  }

  handleAcademicsExpandClick = () => {
    this.setState((state) => ({
      academicsExpanded: !state.academicsExpanded,
      homeExpanded: false,
      offDepExpanded: false,
    }));
  };
  handleHomeExpandClick = () => {
    this.setState((state) => ({
      homeExpanded: !state.homeExpanded,
      academicsExpanded: false,
      offDepExpanded: false,
    }));
  };
  handleOffDepExpandClick = () => {
    this.setState((state) => ({
      offDepExpanded: !state.offDepExpanded,
      academicsExpanded: false,
      homeExpanded: false,
    }));
  };

  handleRelationshipStatusInputChange = (e) => {
    this.setState({
      relationshipStatusValue: e.target.value,
    });
  };
  handleChangeIncludeAlumni() {
    this.setState({
      searchValues: { ...this.state.searchValues, includeAlumni: !this.state.includeAlumni },
    });
  }
  handleFirstNameInputChange = (e) => {
    this.setState({
      searchValues: { ...this.state.searchValues, firstName: e.target.value },
    });
  };
  handleLastNameInputChange = (e) => {
    this.setState({
      searchValues: { ...this.state.searchValues, lastName: e.target.value },
    });
  };
  handleMajorInputChange = (e) => {
    this.setState({
      searchValues: { ...this.state.searchValues, major: e.target.value },
    });
  };
  handleMinorInputChange = (e) => {
    this.setState({
      searchValues: { ...this.state.searchValues, minor: e.target.value },
    });
  };
  handleHallInputChange = (e) => {
    this.setState({
      searchValues: { ...this.state.searchValues, hall: e.target.value },
    });
  };
  handleClassTypeInputChange = (event) => {
    this.setState({
      searchValues: { ...this.state.searchValues, classType: event.target.value },
    });
  };
  handleHomeCityInputChange = (e) => {
    this.setState({
      searchValues: { ...this.state.searchValues, homeCity: e.target.value },
    });
  };
  handleStateInputChange = (e) => {
    this.setState({
      searchValues: { ...this.state.searchValues, state: e.target.value },
    });
  };
  handleCountryInputChange = (e) => {
    this.setState({
      searchValues: { ...this.state.searchValues, country: e.target.value },
    });
  };
  handleDepartmentInputChange = (e) => {
    this.setState({
      searchValues: { ...this.state.searchValues, department: e.target.value },
    });
  };
  handleBuildingInputChange = (e) => {
    this.setState({
      searchValues: { ...this.state.searchValues, building: e.target.value },
    });
  };

  async search() {
    if (!Object.values(this.state.searchValues).some((x) => x)) {
      // do not search, only search if there are some non-blank non-false values
    } else {
      this.setState({
        header: <GordonLoader />,
        peopleSearchResults: null,
        academicsExpanded: false,
        homeExpanded: false,
        offDepExpanded: false,
      });
      let peopleSearchResults = await goStalk.search(...Object.values(this.state.searchValues));

      if (peopleSearchResults.length === 0) {
        this.setState({
          peopleSearchResults: noResultsCard,
          header: '',
        });
      } else {
        this.setState({
          peopleSearchResults: (
            <Media query="(min-width: 960px)">
              {(matches) =>
                matches
                  ? peopleSearchResults.map((person) => (
                      <PeopleSearchResult key={person.AD_Username} Person={person} />
                    ))
                  : peopleSearchResults.map((person) => (
                      <MobilePeopleSearchResult key={person.AD_Username} Person={person} />
                    ))
              }
            </Media>
          ),
          header: peopleSearchHeader,
        });
      }
    }
  }

  async updateURL() {
    const searchParameters = Object.entries(this.state.searchValues)
      .filter((n) => n) // removes empty strings
      .map(([key, value]) => (value ? `${key}=${value}` : '')) // [ 'firstName=value', 'state=texas']
      .join('&'); // 'firstName=value&state=texas'

    if (this.props.history.location.search !== searchParameters) {
      this.props.history.push(`?${searchParameters}`);
    }
  }

  handleEnterKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.search();
      this.updateURL();
    }
  };

  render() {
    const { classes } = this.props;
    let includeAlumniCheckbox;

    const majorOptions = this.state.majors.map((major) => (
      <MenuItem value={major} key={major}>
        {major}
      </MenuItem>
    ));

    const minorOptions = this.state.minors.map((minor) => (
      <MenuItem value={minor} key={minor}>
        {minor}
      </MenuItem>
    ));
    const hallOptions = this.state.halls.map((hall) => (
      <MenuItem value={hall} key={hall}>
        {hall}
      </MenuItem>
    ));

    const stateOptions = this.state.states.map((state) => (
      <MenuItem value={state} key={state}>
        {state}
      </MenuItem>
    ));

    // Lower case using js to remove all caps, then capitalize with css
    const countryOptions = this.state.countries.map((country) => (
      <MenuItem value={country} key={country} style={{ textTransform: 'capitalize' }}>
        {country.toLowerCase()}
      </MenuItem>
    ));

    const departmentOptions = this.state.departments.map((department) => (
      <MenuItem value={department} key={department}>
        {department}
      </MenuItem>
    ));

    const buildingOptions = this.state.buildings.map((building) => (
      <MenuItem value={building} key={building}>
        {building}
      </MenuItem>
    ));

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
      if (this.state.personType && !this.state.personType.includes('stu')) {
        includeAlumniCheckbox = (
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.searchValues.includeAlumni}
                  onChange={() => {
                    this.handleChangeIncludeAlumni();
                  }}
                />
              }
              label="Include Alumni"
            />
          </Grid>
        );
      }

      // April Fools
      let aprilFools = '';
      const todaysDate = new Date();
      if (todaysDate.getMonth() === 3 && todaysDate.getDate() === 1) {
        aprilFools = (
          <Grid container spacing={2} alignItems="flex-end">
            <Media
              query="(min-width: 600px)"
              render={() => (
                <Grid item>
                  <FaHeart style={styles.FontAwesome} Icon className={classes.icon} />
                </Grid>
              )}
            />
            <Grid item xs>
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

      // Creates the PeopleSearch page depending on the status of the network found in local storage
      let PeopleSearch;
      let searchPageTitle = (
        <div align="center">
          Search the
          <b style={{ color: gordonColors.primary.cyan }}> Gordon </b>
          Community
        </div>
      );

      if (networkStatus === 'online') {
        PeopleSearch = (
          <Grid container justify="center" spacing={6}>
            <Grid item xs={12} md={8}>
              <Card style={{ padding: '0 3vw' }}>
                <CardContent>
                  <CardHeader title={searchPageTitle} />

                  {/* Search Section 1: General Info */}
                  <Grid container spacing={2} direction="row">
                    {/* First Name */}
                    <Grid item xs={12} sm={6}>
                      <Grid container spacing={2} alignItems="flex-end">
                        <Media
                          query="(min-width: 600px)"
                          render={() => (
                            <Grid item>
                              <PersonIcon className={classes.icon} />
                            </Grid>
                          )}
                        />
                        <Grid item xs>
                          <TextField
                            id="first-name"
                            label="First Name"
                            fullWidth
                            value={this.state.searchValues.firstName}
                            onChange={this.handleFirstNameInputChange}
                            onKeyDown={this.handleEnterKeyPress}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    {/* Last Name */}
                    <Grid item xs={12} sm={6}>
                      <Grid container spacing={2} alignItems="flex-end">
                        <Grid item xs>
                          <TextField
                            id="last-name"
                            label="Last Name"
                            fullWidth
                            value={this.state.searchValues.lastName}
                            onChange={this.handleLastNameInputChange}
                            onKeyDown={this.handleEnterKeyPress}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    {/* Hall */}
                    <Grid item xs={12}>
                      <Grid container spacing={2} alignItems="flex-end">
                        <Media
                          query="(min-width: 600px)"
                          render={() => (
                            <Grid item>
                              <FaBuilding style={styles.FontAwesome} className={classes.icon} />
                            </Grid>
                          )}
                        />
                        <Grid item xs>
                          <FormControl fullWidth>
                            <InputLabel>Hall</InputLabel>
                            <Select
                              value={this.state.searchValues.hall}
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
                    {/* Formatted similar to 'Hall' dropdown */}
                    <Grid item xs={12}>
                      {aprilFools}
                    </Grid>
                    {includeAlumniCheckbox}
                  </Grid>

                  <br />

                  {/* Advanced Filtering */}
                  <Grid
                    container
                    spacing={2}
                    justify="center"
                    alignItems="center"
                    style={{ padding: '8px' }}
                  >
                    <Grid item>
                      <Button
                        color="primary"
                        style={
                          this.state.majorSearchValue !== '' ||
                          this.state.minorSearchValue !== '' ||
                          this.state.classTypeSearchValue !== ''
                            ? {
                                backgroundColor: gordonColors.primary.cyan,
                                color: '#ffffff',
                              }
                            : {}
                        }
                        variant={this.state.academicsExpanded ? 'contained' : 'outlined'}
                        onClick={this.handleAcademicsExpandClick}
                      >
                        <AddIcon fontSize="inherit" />
                        Academic Info
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        color="primary"
                        style={
                          this.state.homeCitySearchValue !== '' ||
                          this.state.stateSearchValue !== '' ||
                          this.state.countrySearchValue !== ''
                            ? {
                                backgroundColor: gordonColors.primary.cyan,
                                color: '#ffffff',
                              }
                            : {}
                        }
                        variant={this.state.homeExpanded ? 'contained' : 'outlined'}
                        onClick={this.handleHomeExpandClick}
                      >
                        <AddIcon fontSize="inherit" />
                        Home Info
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        color="primary"
                        variant={this.state.offDepExpanded ? 'contained' : 'outlined'}
                        onClick={this.handleOffDepExpandClick}
                        style={
                          this.state.departmentSearchValue !== '' ||
                          this.state.buildingSearchValue !== ''
                            ? {
                                backgroundColor: gordonColors.primary.cyan,
                                color: '#ffffff',
                              }
                            : {}
                        }
                      >
                        <AddIcon fontSize="inherit" />
                        Office Info
                      </Button>
                    </Grid>
                  </Grid>

                  {/* Expandable search filters */}
                  <Collapse
                    in={this.state.academicsExpanded}
                    timeout="auto"
                    unmountOnExit
                    style={styles.CardContent}
                  >
                    <Grid container spacing={2} alignItems="flex-end">
                      <Media
                        query="(min-width: 600px)"
                        render={() => (
                          <Grid item>
                            <FaBook style={styles.FontAwesome} className={classes.icon} />
                          </Grid>
                        )}
                      />
                      <Grid item xs={11}>
                        <FormControl fullWidth>
                          <InputLabel>Major</InputLabel>
                          <Select
                            value={this.state.searchValues.major}
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
                    <Grid container spacing={2} alignItems="flex-end">
                      <Media
                        query="(min-width: 600px)"
                        render={() => (
                          <Grid item>
                            <FaBook style={styles.FontAwesome} className={classes.icon} />
                          </Grid>
                        )}
                      />
                      <Grid item xs={11}>
                        <FormControl fullWidth>
                          <InputLabel>Minor</InputLabel>
                          <Select
                            value={this.state.searchValues.minor}
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
                    <Grid container spacing={2} alignItems="flex-end">
                      <Media
                        query="(min-width: 600px)"
                        render={() => (
                          <Grid item>
                            <FaSchool style={styles.FontAwesome} className={classes.icon} />
                          </Grid>
                        )}
                      />
                      <Grid item xs={11}>
                        <FormControl fullWidth>
                          <InputLabel>Class</InputLabel>
                          <Select
                            value={this.state.searchValues.classType}
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
                  <Collapse
                    in={this.state.homeExpanded}
                    timeout="auto"
                    unmountOnExit
                    style={styles.CardContent}
                  >
                    <Grid container spacing={2} alignItems="flex-end">
                      <Media
                        query="(min-width: 600px)"
                        render={() => (
                          <Grid item>
                            <HomeIcon style={styles.FontAwesome} className={classes.icon} />
                          </Grid>
                        )}
                      />
                      <Grid item xs={11}>
                        <TextField
                          id="hometown"
                          label="Hometown"
                          fullWidth
                          value={this.state.searchValues.homeCity}
                          onChange={this.handleHomeCityInputChange}
                          onKeyDown={this.handleEnterKeyPress}
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={2} alignItems="flex-end">
                      <Media
                        query="(min-width: 600px)"
                        render={() => (
                          <Grid item>
                            <CityIcon style={styles.FontAwesome} className={classes.icon} />
                          </Grid>
                        )}
                      />
                      <Grid item xs={11}>
                        <FormControl fullWidth>
                          <InputLabel>State</InputLabel>
                          <Select
                            value={this.state.searchValues.state}
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
                    <Grid container spacing={2} alignItems="flex-end">
                      <Media
                        query="(min-width: 600px)"
                        render={() => (
                          <Grid item>
                            <FaGlobeAmericas style={styles.FontAwesome} className={classes.icon} />
                          </Grid>
                        )}
                      />
                      <Grid item xs={11}>
                        <FormControl fullWidth>
                          <InputLabel>Country</InputLabel>
                          <Select
                            value={this.state.searchValues.country}
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
                  <Collapse
                    in={this.state.offDepExpanded}
                    timeout="auto"
                    unmountOnExit
                    style={styles.CardContent}
                  >
                    <Grid container spacing={2} alignItems="flex-end">
                      <Media
                        query="(min-width: 600px)"
                        render={() => (
                          <Grid item>
                            <FaBriefcase style={styles.FontAwesome} className={classes.icon} />
                          </Grid>
                        )}
                      />
                      <Grid item xs={11}>
                        <FormControl fullWidth>
                          <InputLabel>Department</InputLabel>
                          <Select
                            value={this.state.searchValues.department}
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
                    <Grid container spacing={2} alignItems="flex-end">
                      <Media
                        query="(min-width: 600px)"
                        render={() => (
                          <Grid item>
                            <FaBuilding style={styles.FontAwesome} className={classes.icon} />
                          </Grid>
                        )}
                      />
                      <Grid item xs={11}>
                        <FormControl fullWidth>
                          <InputLabel>Building</InputLabel>
                          <Select
                            value={this.state.searchValues.building}
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

                <CardActions>
                  <Grid container justify="center" spacing={2}>
                    {/* Clear All Button */}
                    <Grid item xs={8} sm={'auto'}>
                      <Button
                        style={{ backgroundColor: gordonColors.neutral.lightGray }}
                        fullWidth
                        variant="contained"
                        onClick={() => {
                          this.setState(
                            {
                              searchValues: {
                                includeAlumni: false,
                                firstName: '',
                                lastName: '',
                                major: '',
                                minor: '',
                                hall: '',
                                classType: '',
                                homeCity: '',
                                state: '',
                                country: '',
                                department: '',
                                building: '',
                              },
                              academicsExpanded: false,
                              homeExpanded: false,
                              offDepExpanded: false,
                              header: '',
                              peopleSearchResults: null,
                            },
                            () => this.updateURL(),
                          );
                        }}
                      >
                        Clear All
                      </Button>
                    </Grid>
                    {/* Search Button */}
                    <Grid item xs={8}>
                      <Button
                        color="primary"
                        onClick={() => {
                          this.search();
                          this.updateURL();
                        }}
                        fullWidth
                        variant="contained"
                      >
                        SEARCH
                      </Button>
                    </Grid>
                  </Grid>
                </CardActions>
                <br />
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
                    <NoConnectionImage />
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
                <h4>You must be logged in to view use People Search.</h4>
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

export default withStyles(styles)(PeopleSearch);

import React, { Component } from 'react';
import GordonUnauthorized from 'components/GordonUnauthorized';
import GordonOffline from 'components/GordonOffline';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Checkbox,
  Collapse,
  FormLabel,
  FormControl,
  FormControlLabel,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Fab,
  withStyles,
  Switch,
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
  FaPrint,
} from 'react-icons/fa';
import { IconContext } from 'react-icons';
import HomeIcon from '@material-ui/icons/Home';
import CityIcon from '@material-ui/icons/LocationCity';
import goStalk from 'services/goStalk';
import user from 'services/user';
import { gordonColors } from 'theme';
import PeopleSearchResult from './components/PeopleSearchResult';
import GordonLoader from 'components/Loader';
import ReactToPrint from 'react-to-print';

const styles = {
  FontAwesome: {
    fontSize: 20,
    margin: 2,
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
  printPeopleSearchButton: {
    position: 'fixed',
    margin: 0,
    bottom: 'min(5vw, 4rem)',
    right: 'max(2rem, 5vw)',
    zIndex: 1,
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

const peopleSearchHeaderDesktop = (
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
      <Grid item xs={2}>
        <Typography variant="body2" style={styles.headerStyle} noWrap>
          DESCRIPTION
        </Typography>
      </Grid>
      <Grid item xs={2}>
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
);

const peopleSearchHeaderMobile = (
  <div style={styles.headerStyle}>
    <Grid container direction="row" justify="center">
      <Grid item>
        <Typography variant="body2" style={styles.headerStyle}>
          RESULTS
        </Typography>
      </Grid>
    </Grid>
  </div>
);

const printPeopleSearchButton = (
  <Fab variant="extended" color="primary" style={styles.printPeopleSearchButton}>
    <FaPrint />
    <Media query="(min-width: 960px)">
      <span style={styles.printPeopleSearchButton__text}>&nbsp;&nbsp;Print Results</span>
    </Media>
  </Fab>
);

const searchPageTitle = (
  <div align="center">
    Search the
    <b style={{ color: gordonColors.primary.cyan }}> Gordon </b>
    Community
  </div>
);

class PeopleSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      personType: '',
      academicsExpanded: false,
      homeExpanded: false,
      offDepExpanded: false,
      advancedSearchExpanded: false,

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
        includeStudent: true,
        includeFacStaff: true,
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

      loading: true,

      // For April Fools:
      relationshipStatusValue: '',

      displayLargeImage: false,

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
    // this.setState({ loading: true });
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
        console.log(personType);

        if (personType.includes('alum')) {
          this.setState({
            searchValues: {
              ...this.state.searchValues,
              includeStudent: false,
              includeAlumni: true,
            },
          });
        }
      } catch (error) {
        // error
      }

      if (window.location.href.includes('?')) {
        this.loadSearchParamsFromURL();
      } else {
        this.updateURL();
      }
    }

    this.setState({ loading: false });
  }

  async loadSearchParamsFromURL() {
    const urlParams = new URLSearchParams(window.location.search);

    this.setState({
      searchValues: {
        includeStudent: urlParams.get('includeStudent') || false,
        includeFacStaff: urlParams.get('includeFacStaff') || false,
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
  handleAdvancedSearchExpandClick = () => {
    this.setState((state) => ({
      advancedSearchExpanded: !state.advancedSearchExpanded,
    }));
  };

  handleRelationshipStatusInputChange = (e) => {
    this.setState({
      relationshipStatusValue: e.target.value,
    });
  };
  handleChangeIncludeStudent() {
    this.setState({
      searchValues: {
        ...this.state.searchValues,
        includeStudent: !this.state.searchValues.includeStudent,
      },
    });
  }
  handleChangeIncludeFacStaff() {
    this.setState({
      searchValues: {
        ...this.state.searchValues,
        includeFacStaff: !this.state.searchValues.includeFacStaff,
      },
    });
  }
  handleChangeIncludeAlumni() {
    this.setState({
      searchValues: {
        ...this.state.searchValues,
        includeAlumni: !this.state.searchValues.includeAlumni,
      },
    });
  }

  handleChangeDisplayLargeImages() {
    this.setState({
      ...this.state,
      displayLargeImage: !this.state.displayLargeImage,
    });
    this.search();
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
  handleClassTypeInputChange = (e) => {
    this.setState({
      searchValues: { ...this.state.searchValues, classType: e.target.value },
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

  //This is to prevent search from blank
  canSearch = () => {
    const { includeStudent, includeFacStaff, includeAlumni, ...valuesNeededForSearch } =
      this.state.searchValues;
    let result = Object.values(valuesNeededForSearch)
      .map((x) => x.toString().trim())
      .some((x) => x);
    return result;
  };

  async search() {
    if (!this.canSearch()) {
      // do not search, only search if there are some non-blank non-false values
    } else {
      this.setState({
        header: <GordonLoader />,
        peopleSearchResults: null,
        academicsExpanded: false,
        homeExpanded: false,
        offDepExpanded: false,
        searchValues: {
          ...this.state.searchValues,
          firstName: this.state.searchValues.firstName?.trim(),
          lastName: this.state.searchValues.lastName?.trim(),
          homeCity: this.state.searchValues.homeCity?.trim(),
        },
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
                peopleSearchResults.map((person) => (
                  <PeopleSearchResult
                    key={person.AD_Username}
                    Person={person}
                    size={
                      !matches ? 'single' : this.state.displayLargeImage ? 'largeImages' : 'full'
                    }
                  />
                ))
              }
            </Media>
          ),
          header: (
            <Media query="(min-width: 960px)">
              {(matches) =>
                matches && !this.state.displayLargeImage
                  ? peopleSearchHeaderDesktop
                  : peopleSearchHeaderMobile
              }
            </Media>
          ),
        });
      }
      // will set url redundantly if loading from url, but not a major issue
      this.updateURL();
    }
  }

  async updateURL() {
    const searchParameters = Object.entries(this.state.searchValues)
      .filter(([, value]) => value) // removes empty values
      .map(([key, value]) => `${key}=${value}`) // [ 'firstName=value', 'state=texas']
      .join('&'); // 'firstName=value&state=texas'

    if (this.props.history.location.search !== searchParameters) {
      this.props.history.push(`?${searchParameters}`);
    }
  }

  handleEnterKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.search();
    }
  };

  render() {
    const { classes } = this.props;
    let PeopleSearchCheckbox;

    const printPeopleSearchHeader = (
      <div class="test" align="center" style={{ display: 'none' }}>
        {/* show on print only */}
        <style>{`@media print {.test{display: block !important;}}`}</style>

        <h1>{searchPageTitle}</h1>
        <span>
          Filters:{' '}
          {window.location.search.substring(1).replaceAll('&', ', ').replaceAll('%20', ' ')}
        </span>
        <br />
        <br />
      </div>
    );

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
      PeopleSearchCheckbox = (
        <Grid item xs={12} lg={6} align="center">
          <Grid container alignItems="center" justify="center">
            <Grid item>
              <FormLabel component="label">Include: &nbsp;</FormLabel>
            </Grid>
            {this.state.loading ? (
              <Grid item>
                <GordonLoader size={20} />
              </Grid>
            ) : (
              <Grid item>
                {this.state.personType && !this.state.personType.includes('alum') ? (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.searchValues.includeStudent}
                        onChange={() => {
                          this.handleChangeIncludeStudent();
                        }}
                      />
                    }
                    label="Student"
                  />
                ) : null}
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.searchValues.includeFacStaff}
                      onChange={() => {
                        this.handleChangeIncludeFacStaff();
                      }}
                    />
                  }
                  label="Faculty/Staff"
                />
                {this.state.personType && !this.state.personType.includes('stu') ? (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.searchValues.includeAlumni}
                        onChange={() => {
                          this.handleChangeIncludeAlumni();
                        }}
                      />
                    }
                    label="Alumni"
                  />
                ) : null}
              </Grid>
            )}
          </Grid>
        </Grid>
      );

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

      if (networkStatus === 'online') {
        PeopleSearch = (
          <Grid container justify="center" spacing={6}>
            <Grid item xs={12} lg={10} xl={8}>
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
                            type="search"
                            fullWidth
                            value={this.state.searchValues.firstName}
                            onChange={this.handleFirstNameInputChange}
                            onKeyDown={this.handleEnterKeyPress}
                            variant="filled"
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
                            type="search"
                            fullWidth
                            value={this.state.searchValues.lastName}
                            onChange={this.handleLastNameInputChange}
                            onKeyDown={this.handleEnterKeyPress}
                            variant="filled"
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
                          <FormControl variant="filled" fullWidth>
                            <InputLabel id="demo-simple-select-filled-label">
                              Residence Hall
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-filled-label"
                              id="demo-simple-select-filled"
                              value={this.state.searchValues.hall}
                              onChange={this.handleHallInputChange}
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
                    {PeopleSearchCheckbox}
                    <Media
                      query="(min-width: 960px)"
                      render={() => (
                        <Grid item xs={12} lg={6} align="center">
                          <FormControlLabel
                            control={
                              <Switch
                                checked={this.state.displayLargeImage}
                                onChange={() => {
                                  this.handleChangeDisplayLargeImages();
                                }}
                              />
                            }
                            label="Display Large Images"
                          />
                        </Grid>
                      )}
                    />
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
                        backgroundColor="#ffffff"
                        style={
                          this.state.searchValues.major !== '' ||
                          this.state.searchValues.minor !== '' ||
                          this.state.searchValues.classType !== '' ||
                          this.state.searchValues.homeCity !== '' ||
                          this.state.searchValues.state !== '' ||
                          this.state.searchValues.country !== '' ||
                          this.state.searchValues.department !== '' ||
                          this.state.searchValues.building !== ''
                            ? {
                                backgroundColor: gordonColors.primary.cyan,
                                color: '#ffffff',
                              }
                            : {}
                        }
                        variant={this.state.advancedSearchExpanded ? 'contained' : 'outlined'}
                        onClick={this.handleAdvancedSearchExpandClick}
                      >
                        <AddIcon fontSize="inherit" />
                        Advanced Search
                      </Button>
                      <br></br>
                      <br></br>
                    </Grid>
                  </Grid>

                  {/* Expandable search filters */}
                  <Grid container direction="row">
                    <Grid item xs="4" variant="filled">
                      <Collapse
                        in={this.state.advancedSearchExpanded}
                        timeout="auto"
                        unmountOnExit
                        style={styles.CardContent}
                      >
                        <Grid>
                          <Typography align="center" gutterBottom>
                            <InputLabel
                              style={{
                                color:
                                  this.state.searchValues.includeStudent ||
                                  this.state.searchValues.includeAlumni
                                    ? gordonColors.primary.blue
                                    : gordonColors.neutral.lightGray,
                              }}
                            >
                              {this.state.personType === 'stu' ? 'Student' : 'Student/Alumni'}
                            </InputLabel>
                          </Typography>
                        </Grid>
                        <Grid container spacing={2} alignItems="flex-end">
                          <Media
                            query="(min-width: 600px)"
                            render={() => (
                              <Grid item xs="1">
                                <IconContext.Provider
                                  value={{
                                    color:
                                      this.state.searchValues.includeStudent ||
                                      this.state.searchValues.includeAlumni
                                        ? gordonColors.neutral.grayShades[900]
                                        : gordonColors.neutral.lightGray,
                                  }}
                                >
                                  <FaBook style={styles.FontAwesome} className={classes.icon} />
                                </IconContext.Provider>
                              </Grid>
                            )}
                          />
                          <Grid item xs={11}>
                            <FormControl
                              variant="filled"
                              fullWidth
                              className={
                                this.state.searchValues.includeStudent ||
                                this.state.searchValues.includeAlumni
                                  ? null
                                  : 'disabled'
                              }
                              // if alumni is checked then student should not be disabled because faculty can search alumni through major
                              disabled={
                                !this.state.searchValues.includeAlumni &&
                                !this.state.searchValues.includeStudent
                              }
                            >
                              <InputLabel id="major">Major</InputLabel>
                              <Select
                                labelId="major"
                                id="major"
                                value={this.state.searchValues.major}
                                onChange={this.handleMajorInputChange}
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
                              <Grid item xs="1">
                                <IconContext.Provider
                                  value={{
                                    color:
                                      this.state.searchValues.includeStudent ||
                                      this.state.searchValues.includeAlumni
                                        ? gordonColors.neutral.grayShades[900]
                                        : gordonColors.neutral.lightGray,
                                  }}
                                >
                                  <FaBook style={styles.FontAwesome} className={classes.icon} />
                                </IconContext.Provider>
                              </Grid>
                            )}
                          />
                          <Grid item xs={11}>
                            <FormControl
                              variant="filled"
                              fullWidth
                              className={
                                this.state.searchValues.includeStudent ||
                                this.state.searchValues.includeAlumni
                                  ? null
                                  : 'disabled'
                              }
                              disabled={
                                !this.state.searchValues.includeAlumni &&
                                !this.state.searchValues.includeStudent
                              }
                            >
                              <InputLabel id="minor">Minor</InputLabel>
                              <Select
                                labelId="minor"
                                id="minor"
                                value={this.state.searchValues.minor}
                                onChange={this.handleMinorInputChange}
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
                              <Grid item xs="1">
                                <IconContext.Provider
                                  value={{
                                    color:
                                      this.state.searchValues.includeStudent ||
                                      this.state.searchValues.includeAlumni
                                        ? gordonColors.neutral.grayShades[900]
                                        : gordonColors.neutral.lightGray,
                                  }}
                                >
                                  <FaSchool style={styles.FontAwesome} className={classes.icon} />
                                </IconContext.Provider>
                              </Grid>
                            )}
                          />
                          <Grid item xs={11}>
                            <FormControl
                              variant="filled"
                              fullWidth
                              className={
                                this.state.searchValues.includeStudent ||
                                this.state.searchValues.includeAlumni
                                  ? null
                                  : 'disabled'
                              }
                              disabled={
                                !this.state.searchValues.includeAlumni &&
                                !this.state.searchValues.includeStudent
                              }
                            >
                              <InputLabel id="class">Class</InputLabel>
                              <Select
                                labelId="class"
                                id="class"
                                value={this.state.searchValues.classType}
                                onChange={this.handleClassTypeInputChange}
                              >
                                <MenuItem label="All Classes" value="">
                                  <em>All</em>
                                </MenuItem>
                                <MenuItem value={1}>First Year</MenuItem>
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
                    </Grid>

                    <Grid item xs="4" variant="h4">
                      <Collapse
                        in={this.state.advancedSearchExpanded}
                        timeout="auto"
                        unmountOnExit
                        style={styles.CardContent}
                      >
                        <Typography align="center" gutterBottom>
                          <InputLabel
                            style={{
                              color: this.state.searchValues.includeFacStaff
                                ? gordonColors.primary.blue
                                : gordonColors.neutral.lightGray,
                            }}
                          >
                            Faculty/Staff
                          </InputLabel>
                        </Typography>
                        <Grid container spacing={2} alignItems="flex-end">
                          <Media
                            query="(min-width: 600px)"
                            render={() => (
                              <Grid item xs="1">
                                <IconContext.Provider
                                  value={{
                                    color: this.state.searchValues.includeFacStaff
                                      ? gordonColors.neutral.grayShades[900]
                                      : gordonColors.neutral.lightGray,
                                  }}
                                >
                                  <FaBriefcase
                                    style={styles.FontAwesome}
                                    className={classes.icon}
                                  />
                                </IconContext.Provider>
                              </Grid>
                            )}
                          />
                          <Grid item xs={11}>
                            <FormControl
                              variant="filled"
                              fullWidth
                              className={
                                this.state.searchValues.includeFacStaff ? null : 'disabled'
                              }
                              disabled={!this.state.searchValues.includeFacStaff}
                            >
                              <InputLabel id="department-type">Dept.</InputLabel>
                              <Select
                                labelId="department-type"
                                id="department-type"
                                value={this.state.searchValues.department}
                                onChange={this.handleDepartmentInputChange}
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
                              <Grid item xs="1">
                                <IconContext.Provider
                                  value={{
                                    color: this.state.searchValues.includeFacStaff
                                      ? gordonColors.neutral.grayShades[900]
                                      : gordonColors.neutral.lightGray,
                                  }}
                                >
                                  <FaBuilding style={styles.FontAwesome} className={classes.icon} />
                                </IconContext.Provider>
                              </Grid>
                            )}
                          />
                          <Grid item xs={11}>
                            <FormControl
                              variant="filled"
                              fullWidth
                              className={
                                this.state.searchValues.includeFacStaff ? null : 'disabled'
                              }
                              disabled={!this.state.searchValues.includeFacStaff}
                            >
                              <InputLabel id="building-type">Building</InputLabel>
                              <Select
                                labelId="building-type"
                                id="building-type"
                                value={this.state.searchValues.building}
                                onChange={this.handleBuildingInputChange}
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
                    </Grid>

                    <Grid item xs={4} spacing={3}>
                      <Collapse
                        in={this.state.advancedSearchExpanded}
                        timeout="auto"
                        unmountOnExit
                        style={styles.CardContent}
                      >
                        <Typography align="center" gutterBottom>
                          <InputLabel style={{ color: gordonColors.primary.blue }}>
                            {' '}
                            Everyone
                          </InputLabel>
                        </Typography>
                        <Grid container spacing={2} alignItems="flex-end">
                          <Media
                            query="(min-width: 600px)"
                            render={() => (
                              <Grid item xs="1">
                                <HomeIcon style={styles.FontAwesome} className={classes.icon} />
                              </Grid>
                            )}
                          />
                          <Grid item xs={11}>
                            <TextField
                              id="hometown"
                              label="Hometown"
                              type="search"
                              fullWidth
                              value={this.state.searchValues.homeCity}
                              onChange={this.handleHomeCityInputChange}
                              onKeyDown={this.handleEnterKeyPress}
                              variant="filled"
                            />
                          </Grid>
                        </Grid>
                        <Grid container spacing={2} alignItems="flex-end">
                          <Media
                            query="(min-width: 600px)"
                            render={() => (
                              <Grid item xs="1">
                                <CityIcon style={styles.FontAwesome} className={classes.icon} />
                              </Grid>
                            )}
                          />
                          <Grid item xs={11}>
                            <FormControl variant="filled" fullWidth>
                              <InputLabel id="state">State</InputLabel>
                              <Select
                                labelId="state"
                                id="state"
                                value={this.state.searchValues.state}
                                onChange={this.handleStateInputChange}
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
                              <Grid item xs="1">
                                <FaGlobeAmericas
                                  style={styles.FontAwesome}
                                  className={classes.icon}
                                />
                              </Grid>
                            )}
                          />
                          <Grid item xs={11}>
                            <FormControl variant="filled" fullWidth>
                              <InputLabel id="country">Country</InputLabel>
                              <Select
                                labelId="country"
                                id="country"
                                value={this.state.searchValues.country}
                                onChange={this.handleCountryInputChange}
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
                    </Grid>
                  </Grid>
                </CardContent>

                <CardActions>
                  <Grid container justify="center" spacing={2}>
                    {/* Reset Button */}
                    <Grid item xs={8} sm={'auto'}>
                      <Button
                        style={{ backgroundColor: gordonColors.neutral.lightGray }}
                        fullWidth
                        variant="contained"
                        onClick={() => {
                          this.setState(
                            {
                              searchValues: {
                                includeStudent: this.state.personType.includes('alum')
                                  ? false
                                  : true,
                                includeFacStaff: true,
                                includeAlumni: this.state.personType.includes('alum')
                                  ? true
                                  : false,
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
                              displayLargeImage: false,
                            },
                            () => this.updateURL(),
                          );
                        }}
                      >
                        RESET
                      </Button>
                    </Grid>
                    {/* Search Button */}
                    <Grid item xs={8}>
                      <Button
                        color="primary"
                        onClick={() => {
                          this.search();
                        }}
                        fullWidth
                        variant="contained"
                        disabled={!this.canSearch()}
                      >
                        SEARCH
                      </Button>
                    </Grid>
                  </Grid>
                </CardActions>
                <br />
              </Card>
              <br />
              <Card ref={(el) => (this.componentRef = el)}>
                {printPeopleSearchHeader}
                {this.state.header}
                {this.state.peopleSearchResults}
              </Card>
              {this.state.personType && !this.state.personType.includes('stu') && (
                <ReactToPrint
                  trigger={() => {
                    return printPeopleSearchButton;
                  }}
                  content={() => this.componentRef}
                />
              )}
            </Grid>
          </Grid>
        );
      } else {
        return <GordonOffline feature="People Search" />;
      }

      return PeopleSearch;
    } else {
      return <GordonUnauthorized feature={'People Search'} />;
    }
  }
}

export default withStyles(styles)(PeopleSearch);

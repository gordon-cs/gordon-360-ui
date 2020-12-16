import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  CardActions,
  Checkbox,
  Collapse,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  withStyles,
} from '@material-ui/core';
import classnames from 'classnames';
import Media from 'react-media';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PersonIcon from '@material-ui/icons/Person';
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
import goStalk from '../../services/goStalk';
import user from '../../services/user';
import { gordonColors } from '../../theme';
import PeopleSearchResult from './components/PeopleSearchResult';
import MobilePeopleSearchResult from './components/MobilePeopleSearchResult';
import GordonLoader from '../../components/Loader';
import './peopleSearch.css';
import { useNetworkIsOnline } from '../../context/NetworkContext';

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
};

const PeopleSearch = (props) => {
  const [personType, setPersonType] = useState('');
  const [academicsExpanded, setAcademicsExpanded] = useState(false);
  const [homeExpanded, setHomeExpanded] = useState(false);
  const [offDepExpanded, setOffDepExpanded] = useState(false);
  const [additionalOpsExpanded, setAdditionalOpsExpanded] = useState(true);

  // arrays of table data from backend
  const [majors, setMajors] = useState([]);
  const [minors, setMinors] = useState([]);
  const [states, setStates] = useState([]);
  const [countries, setCountries] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [halls, setHalls] = useState([]);

  // Keyboard string values
  const [firstNameSearchValue, setFirstNameSearchValue] = useState('');
  const [lastNameSearchValue, setLastNameSearchValue] = useState('');
  const [homeCitySearchValue, setHomeCitySearchValue] = useState('');
  // Drop-down menu values
  const [majorSearchValue, setMajorSearchValue] = useState('');
  const [minorSearchValue, setMinorSearchValue] = useState('');
  const [hallSearchValue, setHallSearchValue] = useState('');
  const [classTypeSearchValue, setClassTypeSearchValue] = useState('');
  const [stateSearchValue, setStateSearchValue] = useState('');
  const [countrySearchValue, setCountrySearchValue] = useState('');
  const [departmentSearchValue, setDepartmentSearchValue] = useState('');
  const [buildingSearchValue, setBuildingSearchValue] = useState('');
  // For April Fools:
  const [relationshipStatusValue, setRelationshipStatusValue] = useState('');

  const [includeAlumni, setIncludeAlmuni] = useState(false);
  const [peopleSearchResults, setPeopleSearchResults] = useState(null);
  const [header, setHeader] = useState('');

  const isOnline = useNetworkIsOnline();

  const makeHeader = () => {
    return (
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
  };

  useEffect(() => {
    window.onpopstate = () => {
      if (!window.location.href.includes('?')) {
        window.location.reload();
      } else {
        goBackPage();
      }
    };
  }, []);

  const goBackPage = async () => {
    getSearchParamsFromUrl();

    if (searchParamsNull()) {
      // do not search
    } else {
      search();
    }
  };

  useEffect(() => {
    loadPage();
  }, []);

  const loadPage = async () => {
    if (props.authentication) {
      try {
        const [
          profile,
          majors,
          minors,
          halls,
          states,
          countries,
          departments,
          buildings,
        ] = await Promise.all([
          user.getProfileInfo(),
          goStalk.getMajors(),
          goStalk.getMinors(),
          goStalk.getHalls(),
          goStalk.getStates(),
          goStalk.getCountries(),
          goStalk.getDepartments(),
          goStalk.getBuildings(),
        ]);

        setMajors(majors);
        setMinors(minors);
        setHalls(halls);
        setStates(states);
        setCountries(countries);
        setDepartments(departments);
        setBuildings(buildings);
        setPersonType(profile.PersonType);
      } catch (error) {
        // error
      }

      if (window.location.href.includes('?')) {
        getSearchParamsFromUrl();

        if (searchParamsNull()) {
          // do not search
        } else {
          search();
        }
      }
    }
  };

  const getSearchParamsFromUrl = () => {
    const urlParams = new URLSearchParams(window.location.search);
    let includeAlumni = urlParams.get('includeAlumni') || false;
    let firstName = urlParams.get('firstName').trim() || '';
    let lastName = urlParams.get('lastName').trim() || '';
    let major = urlParams.get('major').trim() || '';
    let minor = urlParams.get('minor').trim() || '';
    let hall = urlParams.get('hall').trim() || '';
    let classType = urlParams.get('classType').trim() || '';
    let homeCity = urlParams.get('homeCity').trim() || '';
    let state = urlParams.get('state').trim() || '';
    let country = urlParams.get('country').trim() || '';
    let department = urlParams.get('department').trim() || '';
    let building = urlParams.get('building').trim() || '';

    setIncludeAlmuni(includeAlumni);
    setFirstNameSearchValue(firstName);
    setLastNameSearchValue(lastName);
    setHomeCitySearchValue(homeCity);
    setMajorSearchValue(major);
    setMinorSearchValue(minor);
    setHallSearchValue(hall);
    setClassTypeSearchValue(classType);
    setStateSearchValue(state);
    setCountrySearchValue(country);
    setDepartmentSearchValue(department);
    setBuildingSearchValue(building);
  };

  const searchParamsNull = () => {
    return (
      includeAlumni === false &&
      firstNameSearchValue === '' &&
      lastNameSearchValue === '' &&
      majorSearchValue === '' &&
      minorSearchValue === '' &&
      hallSearchValue === '' &&
      classTypeSearchValue === '' &&
      homeCitySearchValue === '' &&
      stateSearchValue === '' &&
      countrySearchValue === '' &&
      departmentSearchValue === '' &&
      buildingSearchValue === ''
    );
  };

  const search = async () => {
    setHeader(<GordonLoader />);
    setPeopleSearchResults(null);
    setAdditionalOpsExpanded(false);

    let peopleSearchResults = [];
    peopleSearchResults = await goStalk.search(
      includeAlumni,
      firstNameSearchValue,
      lastNameSearchValue,
      majorSearchValue,
      minorSearchValue,
      hallSearchValue,
      classTypeSearchValue,
      homeCitySearchValue,
      stateSearchValue,
      countrySearchValue,
      departmentSearchValue,
      buildingSearchValue,
    );
    if (peopleSearchResults.length === 0) {
      setPeopleSearchResults(
        <Grid item xs={12}>
          <Typography variant="headline" align="center">
            No results found.
          </Typography>
        </Grid>,
      );
      setHeader('');
    } else {
      setPeopleSearchResults(
        <Media query="(min-width: 960px)">
          {(matches) =>
            matches
              ? peopleSearchResults.map((person) => <PeopleSearchResult Person={person} />)
              : peopleSearchResults.map((person) => <MobilePeopleSearchResult Person={person} />)
          }
        </Media>,
      );
      setHeader(makeHeader());
    }
  };

  const saveSearchParamsToHistory = () => {
    let searchParameters =
      `?firstName=${firstNameSearchValue}&lastName=${lastNameSearchValue}` +
      `&major=${majorSearchValue}&minor=${minorSearchValue}&hall=${hallSearchValue}&classType=${classTypeSearchValue}` +
      `&homeCity=${homeCitySearchValue}&state=${stateSearchValue}&country=${countrySearchValue}` +
      `&department=${departmentSearchValue}&building=${buildingSearchValue}&includeAlumni=${includeAlumni}`;
    props.history.push(searchParameters);
  };

  const clearSearchParams = () => {
    setIncludeAlmuni(false);
    setFirstNameSearchValue('');
    setLastNameSearchValue('');
    setHomeCitySearchValue('');
    setMajorSearchValue('');
    setMinorSearchValue('');
    setHallSearchValue('');
    setClassTypeSearchValue('');
    setStateSearchValue('');
    setCountrySearchValue('');
    setDepartmentSearchValue('');
    setBuildingSearchValue('');
  };

  const getDate = () => {
    return new Date();
  };

  const handleEnterKeyPress = (event) => {
    if (event.key === 'Enter') {
      search();
      saveSearchParamsToHistory();
    }
  };

  const { classes } = props;
  let includeAlumniCheckbox;

  const majorOptions = majors.map((major) => (
    <MenuItem value={major} key={major}>
      {major}
    </MenuItem>
  ));

  const minorOptions = minors.map((minor) => (
    <MenuItem value={minor} key={minor}>
      {minor}
    </MenuItem>
  ));

  const hallOptions = halls.map((hall) => (
    <MenuItem value={hall} key={hall}>
      {hall}
    </MenuItem>
  ));

  const stateOptions = states.map((state) => (
    <MenuItem value={state} key={state}>
      {state}
    </MenuItem>
  ));

  const countryOptions = countries.map((country) => (
    <MenuItem value={country} key={country}>
      {country}
    </MenuItem>
  ));

  const departmentOptions = departments.map((department) => (
    <MenuItem value={department} key={department}>
      {department}
    </MenuItem>
  ));

  const buildingOptions = buildings.map((building) => (
    <MenuItem value={building} key={building}>
      {building}
    </MenuItem>
  ));

  if (props.authentication) {
    if (personType !== 'stu' && personType !== '') {
      includeAlumniCheckbox = (
        <Grid item xs={6} justify="center">
          <FormControlLabel
            control={
              <Checkbox checked={includeAlumni} onChange={() => setIncludeAlmuni((i) => !i)} />
            }
            label="Include Alumni"
          />
        </Grid>
      );
    }

    let aprilFools = '';
    if (getDate().getMonth() === 3 && getDate().getDate() === 1) {
      aprilFools = (
        <Grid container spacing={2} alignItems="flex-end">
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
                value={relationshipStatusValue}
                onChange={(e) => setRelationshipStatusValue(e.target.value)}
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

    if (isOnline) {
      return (
        <Grid container justify="center" spacing={6}>
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent
                style={{
                  marginLeft: 8,
                  marginTop: 8,
                }}
              >
                <Typography variant="h5">General Info</Typography>
                <Grid container spacing={2} alignItems="flex-end">
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
                      fullWidth
                      value={firstNameSearchValue}
                      onChange={(e) => setFirstNameSearchValue(e.target.value)}
                      onKeyDown={handleEnterKeyPress}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} alignItems="flex-end">
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
                      value={lastNameSearchValue}
                      onChange={(e) => setLastNameSearchValue(e.target.value)}
                      onKeyDown={handleEnterKeyPress}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} alignItems="flex-end">
                  <Media
                    query="(min-width: 600px)"
                    render={() => (
                      <Grid item>
                        <FaBuilding style={styles.FontAwesome} />
                      </Grid>
                    )}
                  />
                  <Grid item xs={11}>
                    <FormControl fullWidth>
                      <InputLabel>Hall</InputLabel>
                      <Select
                        value={hallSearchValue}
                        onChange={(e) => setHallSearchValue(e.target.value)}
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
                {aprilFools}
              </CardContent>
              <Collapse in={additionalOpsExpanded} timeout="auto" unmountOnExit>
                <CardContent>
                  <CardActions
                    className={[classes.actions, 'card-expansion']}
                    disableActionSpacing
                    onClick={() => setAcademicsExpanded((e) => !e)}
                  >
                    <Typography variant="h5">Academics</Typography>
                    <IconButton
                      className={classnames(classes.expand, {
                        [classes.expandOpen]: academicsExpanded,
                      })}
                      aria-expanded={academicsExpanded}
                      aria-label="Show more"
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                  </CardActions>
                  <Collapse
                    in={academicsExpanded}
                    timeout="auto"
                    unmountOnExit
                    style={styles.CardContent}
                  >
                    <Grid container spacing={2} alignItems="flex-end">
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
                            value={majorSearchValue}
                            onChange={(e) => setMajorSearchValue(e.target.value)}
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
                            <FaBook style={styles.FontAwesome} />
                          </Grid>
                        )}
                      />
                      <Grid item xs={11}>
                        <FormControl fullWidth>
                          <InputLabel>Minor</InputLabel>
                          <Select
                            value={minorSearchValue}
                            onChange={(e) => setMinorSearchValue(e.target.value)}
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
                            <FaSchool style={styles.FontAwesome} />
                          </Grid>
                        )}
                      />
                      <Grid item xs={11}>
                        <FormControl fullWidth>
                          <InputLabel>Class</InputLabel>
                          <Select
                            value={classTypeSearchValue}
                            onChange={(e) => setClassTypeSearchValue(e.target.value)}
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
                    onClick={() => setHomeExpanded((e) => !e)}
                  >
                    <Typography variant="h5">Home</Typography>
                    <IconButton
                      className={classnames(classes.expand, {
                        [classes.expandOpen]: homeExpanded,
                      })}
                      aria-expanded={homeExpanded}
                      aria-label="Show more"
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                  </CardActions>
                  <Collapse
                    in={homeExpanded}
                    timeout="auto"
                    unmountOnExit
                    style={styles.CardContent}
                  >
                    <Grid container spacing={2} alignItems="flex-end">
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
                          value={homeCitySearchValue}
                          onChange={(e) => setHomeCitySearchValue(e.target.value)}
                          onKeyDown={handleEnterKeyPress}
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={2} alignItems="flex-end">
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
                            value={stateSearchValue}
                            onChange={(e) => setStateSearchValue(e.target.value)}
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
                            <FaGlobeAmericas style={styles.FontAwesome} />
                          </Grid>
                        )}
                      />
                      <Grid item xs={11}>
                        <FormControl fullWidth>
                          <InputLabel>Country</InputLabel>
                          <Select
                            value={countrySearchValue}
                            onChange={(e) => setCountrySearchValue(e.target.value)}
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
                    onClick={() => setOffDepExpanded((e) => !e)}
                  >
                    <Typography variant="h5">Building and Department</Typography>
                    <IconButton
                      className={classnames(classes.expand, {
                        [classes.expandOpen]: offDepExpanded,
                      })}
                      aria-expanded={offDepExpanded}
                      aria-label="Show more"
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                  </CardActions>
                  <Collapse
                    in={offDepExpanded}
                    timeout="auto"
                    unmountOnExit
                    style={styles.CardContent}
                  >
                    <Grid container spacing={2} alignItems="flex-end">
                      <Media
                        query="(min-width: 600px)"
                        render={() => (
                          <Grid item>
                            <FaBriefcase style={styles.FontAwesome} />
                          </Grid>
                        )}
                      />
                      <Grid item xs={11}>
                        <FormControl fullWidth>
                          <InputLabel>Department</InputLabel>
                          <Select
                            value={departmentSearchValue}
                            onChange={(e) => setDepartmentSearchValue(e.target.value)}
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
                            <FaBuilding style={styles.FontAwesome} />
                          </Grid>
                        )}
                      />
                      <Grid item xs={11}>
                        <FormControl fullWidth>
                          <InputLabel>Building</InputLabel>
                          <Select
                            value={buildingSearchValue}
                            onChange={(e) => setBuildingSearchValue(e.target.value)}
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
                        <Button color="primary" variant="outlined" onClick={clearSearchParams}>
                          Clear Input
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                  <br />
                  <Button color="primary" onClick={search} fullWidth variant="contained">
                    SEARCH
                  </Button>
                </Grid>
              </CardActions>
              <CardActions
                className={[classes.actions, 'card-expansion']}
                disableActionSpacing
                onClick={() => setAdditionalOpsExpanded((e) => !e)}
                style={{
                  marginTop: '-16px',
                }}
              >
                <Grid container alignItems="baseline" justify="center">
                  <Grid item>
                    <IconButton
                      className={classnames(classes.expand, {
                        [classes.expandOpen]: additionalOpsExpanded,
                      })}
                      aria-expanded={additionalOpsExpanded}
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
              {header}
              {peopleSearchResults}
            </Card>
          </Grid>
        </Grid>
      );
    } else {
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
};

export default withStyles(styles)(PeopleSearch);

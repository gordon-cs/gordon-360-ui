import React, { useCallback, useEffect, useState } from 'react';
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
import goStalk from '../../services/goStalk';
import user from '../../services/user';
import { gordonColors } from '../../theme';
import PeopleSearchResult from './components/PeopleSearchResult';
import MobilePeopleSearchResult from './components/MobilePeopleSearchResult';
import GordonLoader from '../../components/Loader';
import './peopleSearch.css';
import { useNetworkIsOnline } from '../../context/NetworkContext';
import OfflinePanel from '../../components/OfflinePanel';

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

const PeopleSearch = (props) => {
  const [personType, setPersonType] = useState('');
  const [academicsExpanded, setAcademicsExpanded] = useState(false);
  const [homeExpanded, setHomeExpanded] = useState(false);
  const [offDepExpanded, setOffDepExpanded] = useState(false);

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

  const handleAcademicsExpandClick = () => {
    setHomeExpanded(false);
    setOffDepExpanded(false);
    setAcademicsExpanded((e) => !e);
  };

  const handleHomeExpandClick = () => {
    setAcademicsExpanded(false);
    setOffDepExpanded(false);
    setHomeExpanded((e) => !e);
  };

  const handleOffDepExpandClick = () => {
    setAcademicsExpanded(false);
    setHomeExpanded(false);
    setOffDepExpanded((e) => !e);
  };

  const search = async (
    includeAlum,
    firstname,
    lastname,
    major,
    minor,
    hall,
    classType,
    homeCity,
    state,
    country,
    dept,
    building,
  ) => {
    setHeader(<GordonLoader />);
    setPeopleSearchResults(null);

    const results = await goStalk.search(
      includeAlum,
      firstname,
      lastname,
      major,
      minor,
      hall,
      classType,
      homeCity,
      state,
      country,
      dept,
      building,
    );
    if (results.length === 0) {
      setPeopleSearchResults(noResultsCard);
      setHeader('');
    } else {
      setPeopleSearchResults(
        <Media query="(min-width: 960px)">
          {(matches) =>
            matches
              ? results.map((person) => <PeopleSearchResult Person={person} />)
              : results.map((person) => <MobilePeopleSearchResult Person={person} />)
          }
        </Media>,
      );
      setHeader(makeHeader());
    }
  };

  const searchFromUrlParams = useCallback(() => {
    const urlParams = new URLSearchParams(window.location.search);
    let includeAlum = urlParams.get('includeAlumni') === 'true' || false;
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

    setIncludeAlmuni(includeAlum);
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
    search(
      includeAlum,
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
  }, []);

  useEffect(() => {
    window.onpopstate = () => {
      if (!window.location.href.includes('?')) {
        window.location.reload();
      } else {
        searchFromUrlParams();
      }
    };
  }, [searchFromUrlParams]);

  useEffect(() => {
    const loadPage = async () => {
      if (props.authentication) {
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
        setHalls(halls.map((h) => h.trim()));
        setStates(states);
        setCountries(countries);
        setDepartments(departments);
        setBuildings(buildings);
        setPersonType(profile.PersonType);

        if (window.location.href.includes('?')) {
          searchFromUrlParams();
        }
      }
    };

    loadPage();
  }, [props.authentication, searchFromUrlParams]);

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
      search(
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

  // Lower case using js to remove all caps, then capitalize with css
  const countryOptions = countries.map((country) => (
    <MenuItem value={country} key={country} style={{ textTransform: 'capitalize' }}>
      {country.toLowerCase()}
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
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox checked={includeAlumni} onChange={() => setIncludeAlmuni((b) => !b)} />
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
                <FaHeart style={styles.FontAwesome} Icon className={classes.icon} />
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

    if (!isOnline) {
      return <OfflinePanel componentName="People Search" />;
    } else {
      return (
        <Grid container justify="center" spacing={6}>
          <Grid item xs={12} md={8}>
            <Card style={{ padding: '0 3vw' }}>
              <CardContent>
                <CardHeader
                  title={
                    <div>
                      Search the
                      <b style={{ color: gordonColors.primary.cyan }}> Gordon </b>
                      Community
                    </div>
                  }
                />

                {/* Search Section 1: General Info */}
                <Grid container spacing={2}>
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
                          value={firstNameSearchValue}
                          onChange={(e) => setFirstNameSearchValue(e.target.value)}
                          onKeyDown={handleEnterKeyPress}
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
                          value={lastNameSearchValue}
                          onChange={(e) => setLastNameSearchValue(e.target.value)}
                          onKeyDown={handleEnterKeyPress}
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
                            value={hallSearchValue}
                            onChange={(e) => setHallSearchValue(e.target.value)}
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
                        majorSearchValue !== '' ||
                        minorSearchValue !== '' ||
                        classTypeSearchValue !== ''
                          ? {
                              backgroundColor: gordonColors.primary.cyan,
                              color: '#ffffff',
                            }
                          : {}
                      }
                      variant={academicsExpanded ? 'contained' : 'outlined'}
                      onClick={handleAcademicsExpandClick}
                    >
                      <AddIcon fontSize="inherit" />
                      Academic Info
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      color="primary"
                      style={
                        homeCitySearchValue !== '' ||
                        stateSearchValue !== '' ||
                        countrySearchValue !== ''
                          ? {
                              backgroundColor: gordonColors.primary.cyan,
                              color: '#ffffff',
                            }
                          : {}
                      }
                      variant={homeExpanded ? 'contained' : 'outlined'}
                      onClick={handleHomeExpandClick}
                    >
                      <AddIcon fontSize="inherit" />
                      Home Info
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      color="primary"
                      variant={offDepExpanded ? 'contained' : 'outlined'}
                      onClick={handleOffDepExpandClick}
                      style={
                        departmentSearchValue !== '' || buildingSearchValue !== ''
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
                          <FaBook style={styles.FontAwesome} className={classes.icon} />
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
                          <FaBook style={styles.FontAwesome} className={classes.icon} />
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
                          <FaSchool style={styles.FontAwesome} className={classes.icon} />
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
                <Collapse in={homeExpanded} timeout="auto" unmountOnExit style={styles.CardContent}>
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
                          <CityIcon style={styles.FontAwesome} className={classes.icon} />
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
                          <FaGlobeAmericas style={styles.FontAwesome} className={classes.icon} />
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
                          <FaBriefcase style={styles.FontAwesome} className={classes.icon} />
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
                          <FaBuilding style={styles.FontAwesome} className={classes.icon} />
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

              <CardActions>
                <Grid container justify="center" spacing={2}>
                  {/* Clear All Button */}
                  <Grid item xs={8} sm={'auto'}>
                    <Button
                      style={{ backgroundColor: gordonColors.neutral.lightGray }}
                      fullWidth
                      variant="contained"
                      onClick={() => clearSearchParams()}
                    >
                      Clear All
                    </Button>
                  </Grid>
                  {/* Search Button */}
                  <Grid item xs={8}>
                    <Button
                      color="primary"
                      onClick={() => {
                        saveSearchParamsToHistory();
                        search(
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
                      }}
                      fullWidth
                      variant="contained"
                      disabled={
                        !(
                          firstNameSearchValue ||
                          lastNameSearchValue ||
                          majorSearchValue ||
                          minorSearchValue ||
                          hallSearchValue ||
                          classTypeSearchValue ||
                          homeCitySearchValue ||
                          stateSearchValue ||
                          countrySearchValue ||
                          departmentSearchValue ||
                          buildingSearchValue
                        )
                      }
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
              {header}
              {peopleSearchResults}
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

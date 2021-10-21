import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  Fab,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
  withStyles,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import HomeIcon from '@material-ui/icons/Home';
import CityIcon from '@material-ui/icons/LocationCity';
import PersonIcon from '@material-ui/icons/Person';
import GordonOffline from 'components/GordonOffline';
import GordonUnauthorized from 'components/GordonUnauthorized';
import GordonLoader from 'components/Loader';
import { useAuth, useNetworkStatus, useUser } from 'hooks';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { IconContext } from 'react-icons';
import {
  FaBook,
  FaBriefcase,
  FaBuilding,
  FaGlobeAmericas,
  FaHeart,
  FaPrint,
  FaSchool,
} from 'react-icons/fa';
import Media from 'react-media';
import { useLocation } from 'react-router';
import ReactToPrint from 'react-to-print';
import goStalk from 'services/goStalk';
import { gordonColors } from 'theme';
import PeopleSearchResult from './components/PeopleSearchResult';
// @TODO CSSMODULES - outside directory
import styles from './components/PeopleSearchResult/PeopleSearchResult.module.css';

const styles2 = {
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
    padding: '1.5rem 0.75rem',
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
  <Grid item xs={12} direction="row" justifyContent="center" alignItems="center">
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
  <div style={styles2.headerStyle}>
    <Grid container direction="row" alignItems="center">
      <Grid item xs={5}>
        <Typography variant="body2" style={{ marginLeft: '6rem' }}>
          FULL NAME
        </Typography>
      </Grid>
      <Grid item xs={5}>
        <Typography variant="body2">TITLE/CLASS</Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography variant="body2">MAIL LOCATION</Typography>
      </Grid>
    </Grid>
  </div>
);

const peopleSearchHeaderMobile = (
  <div style={styles2.headerStyle}>
    <Grid container direction="row" justifyContent="center">
      <Grid item>
        <Typography variant="body2">RESULTS</Typography>
      </Grid>
    </Grid>
  </div>
);

const printPeopleSearchButton = (
  <Fab variant="extended" color="primary" style={styles2.printPeopleSearchButton}>
    <FaPrint />
    <Media query="(min-width: 960px)">
      <span style={styles2.printPeopleSearchButton__text}>&nbsp;&nbsp;Print Results</span>
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

//Configuration constants
const NUM_NONLAZY_IMAGES = 20; //The number of results for which images will be fetched immediately

const PeopleSearch = (props) => {
  const user = useUser();
  // advancedSearchExpanded: false,

  // arrays of table data from backend
  const [majors, setMajors] = useState([]);
  const [minors, setMinors] = useState([]);
  const [states, setStates] = useState([]);
  const [countries, setCountries] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [halls, setHalls] = useState([]);

  // These values *must* be in the same order as services/goStalk.js search function
  const [includeStudent, setIncludeStudent] = useState(true);
  const [includeFacStaff, setIncludeFacStaff] = useState(true);
  const [includeAlumni, setIncludeAlumni] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [major, setMajor] = useState('');
  const [minor, setMinor] = useState('');
  const [hall, setHall] = useState('');
  const [classType, setClassType] = useState('');
  const [homeCity, setHomeCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [department, setDepartment] = useState('');
  const [building, setBuilding] = useState('');

  const [loading, setLoading] = useState(true);

  // For April Fools:
  const [relationshipStatusValue, setRelationshipStatusValue] = useState('');

  const [displayLargeImage, setDisplayLargeImage] = useState(false);

  const [resultData, setResultData] = useState([]); //Array of collected data to be created
  const [header, setHeader] = useState('');

  const printRef = useRef();
  const isOnline = useNetworkStatus();
  const authenticated = useAuth();
  const location = useLocation();

  const searchValues = useMemo(
    () => ({
      includeStudent,
      includeFacStaff,
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
    }),
    [
      building,
      classType,
      country,
      department,
      firstName,
      hall,
      homeCity,
      includeAlumni,
      includeFacStaff,
      includeStudent,
      lastName,
      major,
      minor,
      state,
    ],
  );

  // componentDidUpdate() {
  //   // Browser 'back' arrow
  //   window.onpopstate = () => {
  //     if (!location.search) {
  //       setState({ header: '', resultData: null });
  //     }
  //     loadSearchParamsFromURL();
  //   };
  // }

  const updateURL = useCallback(async () => {
    const searchParameters = Object.entries(searchValues)
      .filter(([, value]) => value) // removes empty values
      .map(([key, value]) => `${key}=${value}`) // [ 'firstName=value', 'state=texas']
      .join('&'); // 'firstName=value&state=texas'

    // If the page is still the people page & the searchParameters are not the same as previous search
    if (
      props.history.location.pathname === '/people' &&
      props.history.location.search !== searchParameters
    ) {
      props.history.push(`?${searchParameters}`);
    }
  }, [props.history, searchValues]);

  //This is to prevent search from blank
  const canSearch = useCallback(() => {
    const { includeStudent, includeFacStaff, includeAlumni, ...necessarySearchValues } =
      searchValues;
    return Object.values(necessarySearchValues)
      .map((x) =>
        x
          .toString()
          .replace(/[^a-zA-Z0-9\s,.'-]/g, '')
          .trim(),
      )
      .some((x) => x);
  }, [searchValues]);

  const search = useCallback(async () => {
    if (!canSearch()) {
      // do not search, only search if there are some non-blank non-false values
    } else {
      setHeader(<GordonLoader />);
      setResultData([]);
      const results = await goStalk.search(...Object.values(searchValues));
      if (results.length === 0) {
        setHeader(null);
        setResultData(noResultsCard);
      } else {
        setHeader(
          <Media query="(min-width: 960px)">
            {(matches) =>
              matches && !displayLargeImage ? peopleSearchHeaderDesktop : peopleSearchHeaderMobile
            }
          </Media>,
        );

        setResultData(
          <Media query="(min-width: 960px)">
            {(matches) =>
              results.map((person, index) => (
                <PeopleSearchResult
                  key={person.AD_Username}
                  Person={person}
                  size={!matches ? 'single' : displayLargeImage ? 'largeImages' : 'full'}
                  lazyImages={index > NUM_NONLAZY_IMAGES ? true : false}
                />
              ))
            }
          </Media>,
        );
      }
      // will set url redundantly if loading from url, but not a major issue
      updateURL();
    }
  }, [canSearch, displayLargeImage, searchValues, updateURL]);

  const loadSearchParamsFromURL = useCallback(async () => {
    const urlParams = new URLSearchParams(window.location.search);

    setIncludeStudent(urlParams.get('includeStudent') === 'true' ? true : false);
    setIncludeFacStaff(urlParams.get('includeFacStaff') === 'true' ? true : false);
    setIncludeAlumni(urlParams.get('includeAlumni') || false);
    setFirstName(urlParams.get('firstName')?.trim() || '');
    setLastName(urlParams.get('lastName')?.trim() || '');
    setMajor(urlParams.get('major')?.trim() || '');
    setMinor(urlParams.get('minor')?.trim() || '');
    setHall(urlParams.get('hall')?.trim() || '');
    setClassType(urlParams.get('classType')?.trim() || '');
    setHomeCity(urlParams.get('homeCity')?.trim() || '');
    setState(urlParams.get('state')?.trim() || '');
    setCountry(urlParams.get('country')?.trim() || '');
    setDepartment(urlParams.get('department')?.trim() || '');
    setBuilding(urlParams.get('building')?.trim() || '');

    search();
  }, [search]);

  useEffect(() => {
    const loadPage = async () => {
      if (authenticated) {
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
        setMajors(majors);
        setMinors(minors);
        setHalls(halls);
        setStates(states);
        setCountries(countries);
        setDepartments(departments);
        setBuildings(buildings);

        if (user.profile?.personType?.includes?.('alum')) {
          setIncludeStudent(false);
          setIncludeAlumni(true);
        }

        if (location.search) {
          loadSearchParamsFromURL();
        } else {
          updateURL();
        }
      }

      setLoading(false);
    };

    loadPage();
  }, [
    authenticated,
    loadSearchParamsFromURL,
    location.search,
    updateURL,
    user.profile?.personType,
  ]);

  const handleEnterKeyPress = (event) => {
    if (event.key === 'Enter') {
      search();
    }
  };

  const { classes } = props;
  let PeopleSearchCheckbox;

  const printPeopleSearchHeader = (
    <div className={styles2.printHeader} align="center" style={{ display: 'none' }}>
      {/* show on print only */}
      <style>{`@media print {.printHeader{display: block !important;}}`}</style>

      <h1>{searchPageTitle}</h1>
      <span>
        Filters: {window.location.search.substring(1).replaceAll('&', ', ').replaceAll('%20', ' ')}
      </span>
      <br />
      <br />
    </div>
  );

  if (!authenticated) {
    return <GordonUnauthorized feature={'People Search'} />;
  }

  if (!isOnline) {
    return <GordonOffline feature="People Search" />;
  }
  PeopleSearchCheckbox = (
    <Grid item xs={12} lg={6} align="center">
      <Grid container alignItems="center" justifyContent="center">
        <Grid item>
          <FormLabel component="label">Include: &nbsp;</FormLabel>
        </Grid>
        {loading ? (
          <Grid item>
            <GordonLoader size={20} />
          </Grid>
        ) : (
          <Grid item>
            {!user.profile?.personType?.includes?.('alum') ? (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={includeStudent}
                    onChange={() => setIncludeStudent((i) => !i)}
                  />
                }
                label="Student"
              />
            ) : null}
            <FormControlLabel
              control={
                <Checkbox
                  checked={includeFacStaff}
                  onChange={() => setIncludeFacStaff((i) => !i)}
                />
              }
              label="Faculty/Staff"
            />
            {!user.profile?.personType?.includes?.('stu') ? (
              <FormControlLabel
                control={
                  <Checkbox checked={includeAlumni} onChange={() => setIncludeAlumni((i) => !i)} />
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
  if ((todaysDate.getMonth() === 3 && todaysDate.getDate() === 1) || true) {
    aprilFools = (
      <Grid container spacing={2} alignItems="center">
        <Media
          query="(min-width: 600px)"
          render={() => (
            <Grid item style={{ marginBottom: '-4px' }}>
              <FaHeart style={styles2.FontAwesome} className={classes.icon} />
            </Grid>
          )}
        />
        <Grid item xs>
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

  return (
    <Grid container justifyContent="center" spacing={6}>
      <Grid item xs={12} lg={10} xl={8}>
        <Card style={{ padding: '0 3vw' }}>
          <CardContent>
            <CardHeader title={searchPageTitle} />

            {/* Search Section 1: General Info */}
            <Grid container spacing={2} direction="row">
              {/* First Name */}
              <Grid item xs={12} sm={6}>
                <Grid container spacing={2} alignItems="center">
                  <Media
                    query="(min-width: 600px)"
                    render={() => (
                      <Grid item align="center" style={{ marginBottom: '-4px' }}>
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
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      onKeyDown={handleEnterKeyPress}
                      variant="filled"
                    />
                  </Grid>
                </Grid>
              </Grid>
              {/* Last Name */}
              <Grid item xs={12} sm={6}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs>
                    <TextField
                      id="last-name"
                      label="Last Name"
                      type="search"
                      fullWidth
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      onKeyDown={handleEnterKeyPress}
                      variant="filled"
                    />
                  </Grid>
                </Grid>
              </Grid>
              {/* Hall */}
              <Grid item xs={12}>
                <Grid container spacing={2} alignItems="center">
                  <Media
                    query="(min-width: 600px)"
                    render={() => (
                      <Grid item style={{ marginBottom: '-4px' }}>
                        <FaBuilding style={styles2.FontAwesome} className={classes.icon} />
                      </Grid>
                    )}
                  />
                  <Grid item xs>
                    <FormControl variant="filled" fullWidth>
                      <InputLabel id="residence-hall">Residence Hall</InputLabel>
                      <Select
                        labelId="residence-hall"
                        id="residence-hall"
                        value={hall}
                        onChange={(e) => setHall(e.target.value)}
                      >
                        <MenuItem label="All Halls" value="">
                          <em>All Halls</em>
                        </MenuItem>
                        {halls.map((hall) => (
                          <MenuItem value={hall} key={hall}>
                            {hall}
                          </MenuItem>
                        ))}
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
                          checked={displayLargeImage}
                          onChange={() => setDisplayLargeImage((d) => !d)}
                        />
                      }
                      label="Display Large Images"
                    />
                  </Grid>
                )}
              />
            </Grid>

            {/* Advanced Filtering */}
            <Grid container lg={6} align="center">
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  id="more-search-options-header"
                  aria-controls="more-search-options-controls"
                >
                  <Typography variant="h6" align="">
                    More Search Options
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {/* Expandable search filters */}
                  {/* Advanced Search Filters: Student/Alumni */}
                  <Grid container spacing={2} direction="row">
                    <Grid item xs={12} sm={4} variant="filled">
                      <br />
                      <Grid>
                        <Typography align="center" gutterBottom>
                          <InputLabel
                            style={{
                              color:
                                includeStudent || includeAlumni
                                  ? gordonColors.primary.blue
                                  : gordonColors.neutral.lightGray,
                            }}
                          >
                            {user.profile?.personType === 'stu' ? 'Student' : 'Student/Alumni'}
                          </InputLabel>
                        </Typography>
                      </Grid>
                      <Grid container spacing={2} alignItems="center">
                        <Media
                          query="(min-width: 600px)"
                          render={() => (
                            <Grid item xs="1" style={{ marginBottom: '-4px' }}>
                              <IconContext.Provider
                                value={{
                                  color:
                                    includeStudent || includeAlumni
                                      ? gordonColors.neutral.grayShades[900]
                                      : gordonColors.neutral.lightGray,
                                }}
                              >
                                <FaBook style={styles2.FontAwesome} className={classes.icon} />
                              </IconContext.Provider>
                            </Grid>
                          )}
                        />
                        <Grid item xs={11}>
                          <FormControl
                            variant="filled"
                            fullWidth
                            className={includeStudent || includeAlumni ? null : styles.disabled}
                            disabled={!includeAlumni && !includeStudent}
                          >
                            <InputLabel id="major">Major</InputLabel>
                            <Select
                              labelId="major"
                              id="major"
                              value={major}
                              onChange={(e) => setMajor(e.target.value)}
                            >
                              <MenuItem label="All Majors" value="">
                                <em>All Majors</em>
                              </MenuItem>
                              {majors.map((major) => (
                                <MenuItem value={major} key={major}>
                                  {major}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                      </Grid>
                      <Grid container spacing={2} alignItems="center">
                        <Media
                          query="(min-width: 600px)"
                          render={() => (
                            <Grid item xs="1" style={{ marginBottom: '-4px' }}>
                              <IconContext.Provider
                                value={{
                                  color: includeStudent
                                    ? gordonColors.neutral.grayShades[900]
                                    : gordonColors.neutral.lightGray,
                                }}
                              >
                                <FaBook style={styles2.FontAwesome} className={classes.icon} />
                              </IconContext.Provider>
                            </Grid>
                          )}
                        />
                        <Grid item xs={11}>
                          <FormControl
                            variant="filled"
                            fullWidth
                            className={includeStudent ? null : 'disabled'}
                            disabled={!includeStudent}
                          >
                            <InputLabel id="minor">Minor</InputLabel>
                            <Select
                              labelId="minor"
                              id="minor"
                              value={minor}
                              onChange={(e) => setMinor(e.target.value)}
                            >
                              <MenuItem label="All Minors" value="">
                                <em>All Minors</em>
                              </MenuItem>
                              {minors.map((minor) => (
                                <MenuItem value={minor} key={minor}>
                                  {minor}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                      </Grid>
                      <Grid container spacing={2} alignItems="center">
                        <Media
                          query="(min-width: 600px)"
                          render={() => (
                            <Grid item xs="1" style={{ marginBottom: '-4px' }}>
                              <IconContext.Provider
                                value={{
                                  color: includeStudent
                                    ? gordonColors.neutral.grayShades[900]
                                    : gordonColors.neutral.lightGray,
                                }}
                              >
                                <FaSchool style={styles2.FontAwesome} className={classes.icon} />
                              </IconContext.Provider>
                            </Grid>
                          )}
                        />
                        <Grid item xs={11}>
                          <FormControl
                            variant="filled"
                            fullWidth
                            className={includeStudent ? null : 'disabled'}
                            disabled={!includeStudent}
                          >
                            <InputLabel id="class">Class</InputLabel>
                            <Select
                              labelId="class"
                              id="class"
                              value={classType}
                              onChange={(e) => setClassType(e.target.value)}
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
                    </Grid>

                    {/* Advanced Search Filters: Faculty/Staff */}
                    <Grid item xs={12} sm={4} variant="h4">
                      <br />
                      <Typography align="center" gutterBottom>
                        <InputLabel
                          style={{
                            color: includeFacStaff
                              ? gordonColors.primary.blue
                              : gordonColors.neutral.lightGray,
                          }}
                        >
                          Faculty/Staff
                        </InputLabel>
                      </Typography>
                      <Grid container spacing={2} alignItems="center">
                        <Media
                          query="(min-width: 600px)"
                          render={() => (
                            <Grid item xs="1" style={{ marginBottom: '-4px' }}>
                              <IconContext.Provider
                                value={{
                                  color: includeFacStaff
                                    ? gordonColors.neutral.grayShades[900]
                                    : gordonColors.neutral.lightGray,
                                }}
                              >
                                <FaBriefcase style={styles2.FontAwesome} className={classes.icon} />
                              </IconContext.Provider>
                            </Grid>
                          )}
                        />
                        <Grid item xs={11}>
                          <FormControl
                            variant="filled"
                            fullWidth
                            className={includeFacStaff ? null : styles.disabled}
                            disabled={!includeFacStaff}
                          >
                            <InputLabel id="department-type">Dept.</InputLabel>
                            <Select
                              labelId="department-type"
                              id="department-type"
                              value={department}
                              onChange={(e) => setDepartment(e.target.value)}
                            >
                              <MenuItem label="All Departments" value="">
                                <em>All</em>
                              </MenuItem>
                              {departments.map((department) => (
                                <MenuItem value={department} key={department}>
                                  {department}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                      </Grid>
                      <Grid container spacing={2} alignItems="center">
                        <Media
                          query="(min-width: 600px)"
                          render={() => (
                            <Grid item xs="1" style={{ marginBottom: '-4px' }}>
                              <IconContext.Provider
                                value={{
                                  color: includeFacStaff
                                    ? gordonColors.neutral.grayShades[900]
                                    : gordonColors.neutral.lightGray,
                                }}
                              >
                                <FaBuilding style={styles2.FontAwesome} className={classes.icon} />
                              </IconContext.Provider>
                            </Grid>
                          )}
                        />
                        <Grid item xs={11}>
                          <FormControl
                            variant="filled"
                            fullWidth
                            className={includeFacStaff ? null : styles.disabled}
                            disabled={!includeFacStaff}
                          >
                            <InputLabel id="building-type">Building</InputLabel>
                            <Select
                              labelId="building-type"
                              id="building-type"
                              value={building}
                              onChange={(e) => setBuilding(e.target.value)}
                            >
                              <MenuItem label="All Buildings" value="">
                                <em>All</em>
                              </MenuItem>
                              {buildings.map((building) => (
                                <MenuItem value={building} key={building}>
                                  {building}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Grid>

                    {/* Advanced Search Filters: Everyone */}
                    <Grid item xs={12} sm={4} spacing={3}>
                      <br />
                      <Typography align="center" gutterBottom>
                        <InputLabel style={{ color: gordonColors.primary.blue }}>
                          {' '}
                          Everyone
                        </InputLabel>
                      </Typography>
                      <Grid container spacing={2} alignItems="center">
                        <Media
                          query="(min-width: 600px)"
                          render={() => (
                            <Grid item xs="1" style={{ marginBottom: '-4px' }}>
                              <HomeIcon style={styles2.FontAwesome} className={classes.icon} />
                            </Grid>
                          )}
                        />
                        <Grid item xs={11}>
                          <TextField
                            id="hometown"
                            label="Hometown"
                            type="search"
                            fullWidth
                            value={homeCity}
                            onChange={(e) => setHomeCity(e.target.value)}
                            onKeyDown={handleEnterKeyPress}
                            variant="filled"
                          />
                        </Grid>
                      </Grid>
                      <Grid container spacing={2} alignItems="center">
                        <Media
                          query="(min-width: 600px)"
                          render={() => (
                            <Grid item xs="1" style={{ marginBottom: '-4px' }}>
                              <CityIcon style={styles2.FontAwesome} className={classes.icon} />
                            </Grid>
                          )}
                        />
                        <Grid item xs={11}>
                          <FormControl variant="filled" fullWidth>
                            <InputLabel id="state">State</InputLabel>
                            <Select
                              labelId="state"
                              id="state"
                              value={state}
                              onChange={(e) => setState(e.target.value)}
                            >
                              <MenuItem label="All States" value="">
                                <em>All</em>
                              </MenuItem>
                              {states.map((state) => (
                                <MenuItem value={state} key={state}>
                                  {state}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                      </Grid>
                      <Grid container spacing={2} alignItems="center">
                        <Media
                          query="(min-width: 600px)"
                          render={() => (
                            <Grid item xs="1" style={{ marginBottom: '-4px' }}>
                              <FaGlobeAmericas
                                style={styles2.FontAwesome}
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
                              value={country}
                              onChange={(e) => setCountry(e.target.value)}
                            >
                              <MenuItem label="All Countries" value="">
                                <em>All</em>
                              </MenuItem>
                              {
                                // Lower case using js to remove all caps, then capitalize with css
                                countries.map((country) => (
                                  <MenuItem
                                    value={country}
                                    key={country}
                                    style={{ textTransform: 'capitalize' }}
                                  >
                                    {country.toLowerCase()}
                                  </MenuItem>
                                ))
                              }
                            </Select>
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Grid>
          </CardContent>

          <CardActions>
            <Grid container justifyContent="center" spacing={2}>
              {/* Reset Button */}
              <Grid item xs={8} sm={'auto'}>
                <Button
                  style={{ backgroundColor: gordonColors.neutral.lightGray }}
                  fullWidth
                  variant="contained"
                  onClick={() => {
                    setState(
                      {
                        searchValues: {
                          includeStudent: user.profile?.personType?.includes?.('alum')
                            ? false
                            : true,
                          includeFacStaff: true,
                          includeAlumni: user.profile?.personType?.includes?.('alum')
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
                        header: '',
                        resultData: null,
                        displayLargeImage: false,
                      },
                      () => updateURL(),
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
                    search();
                  }}
                  fullWidth
                  variant="contained"
                  disabled={!canSearch()}
                >
                  SEARCH
                </Button>
              </Grid>
            </Grid>
          </CardActions>
          <br />
        </Card>
        <br />
        <Card ref={printRef}>
          {printPeopleSearchHeader}
          {header}
          {resultData}
        </Card>
        {!user.profile?.personType?.includes?.('stu') && (
          <ReactToPrint
            trigger={() => {
              return printPeopleSearchButton;
            }}
            content={() => printRef.current}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default withStyles(styles2)(PeopleSearch);

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
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  Typography,
  withStyles,
} from '@material-ui/core';
import { ExpandMore, Home, LocationCity, Person } from '@material-ui/icons';
import GordonOffline from 'components/GordonOffline';
import GordonUnauthorized from 'components/GordonUnauthorized';
import GordonLoader from 'components/Loader';
import { useNetworkStatus, useUser } from 'hooks';
import { useCallback, useEffect, useState } from 'react';
import { IconContext } from 'react-icons';
import {
  FaBook,
  FaBriefcase,
  FaBuilding,
  FaGlobeAmericas,
  FaHeart,
  FaSchool,
} from 'react-icons/fa';
import Media from 'react-media';
import goStalk from 'services/goStalk';
import { toTitleCase } from 'services/utils';
import { gordonColors } from 'theme';
import SelectSearchField from './components/SelectSearchField';
import TextSearchField from './components/TextSearchField';

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

const relationship_statuses = [
  'Single',
  'Taken',
  'Engaged',
  'Married',
  'At DTR Bench Right NOW',
  '1st DTR',
  '2nd DTR',
  'Sat Together At Chapel',
  'Jesus Is My Significant Other',
  'Waiting For Her Boaz',
  'Waiting For His Proverbs 31 Woman',
  "It's Complicated",
];

const searchPageTitle = (
  <div align="center">
    Search the
    <b style={{ color: gordonColors.primary.cyan }}> Gordon </b>
    Community
  </div>
);

const initialSearchValues = {
  first_name: '',
  last_name: '',
  major: '',
  minor: '',
  residence_hall: '',
  class_year: '',
  home_town: '',
  state: '',
  country: '',
  department: '',
};

const isTodayAprilFools = () => {
  const todaysDate = new Date();
  return todaysDate.getMonth() === 3 && todaysDate.getDate() === 1;
};

const SearchFields = ({ classes, onSearch }) => {
  const { profile, loading: loadingProfile } = useUser();

  const [majors, setMajors] = useState([]);
  const [minors, setMinors] = useState([]);
  const [states, setStates] = useState([]);
  const [countries, setCountries] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [halls, setHalls] = useState([]);

  const [searchValues, setSearchValues] = useState(initialSearchValues);

  const [includeStudent, setIncludeStudent] = useState(true);
  const [includeFacStaff, setIncludeFacStaff] = useState(true);
  const [includeAlumni, setIncludeAlumni] = useState(false);

  const [displayLargeImage, setDisplayLargeImage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const isOnline = useNetworkStatus();

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
    if (canSearch()) {
      setSaving(true);
      const results = await goStalk.search(
        includeStudent,
        includeFacStaff,
        includeAlumni,
        searchValues,
      );
      onSearch(results, displayLargeImage);
      setSaving(false);
    }
  }, [
    canSearch,
    includeStudent,
    includeFacStaff,
    includeAlumni,
    searchValues,
    onSearch,
    displayLargeImage,
  ]);

  useEffect(() => {
    const loadPage = async () => {
      if (profile) {
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
        setCountries(countries.map((country) => toTitleCase(country)));
        setDepartments(departments);
        setBuildings(buildings);

        if (profile.PersonType?.includes?.('alum')) {
          setIncludeStudent(false);
          setIncludeAlumni(true);
        }
      }

      setLoading(false);
    };

    loadPage();
  }, [profile]);

  // useEffect(() => {
  // TODO: Load search params from URL on navigation / initial load
  // }, [profile, location.search, loadSearchParamsFromURL, updateURL]);

  const handleUpdate = (event) =>
    setSearchValues((sv) => ({ ...sv, [event.target.name]: event.target.value }));

  const handleEnterKeyPress = (event) => {
    if (event.key === 'Enter') {
      search();
    }
  };

  if (!isOnline) {
    return <GordonOffline feature="People Search" />;
  }

  if (loading || loadingProfile) {
    return <GordonLoader />;
  }

  if (!profile) {
    return <GordonUnauthorized feature={'People Search'} />;
  }

  const PeopleSearchCheckbox = (
    <Grid item xs={12} lg={6} align="center">
      <FormLabel component="label">Include: &nbsp;</FormLabel>
      {loading ? (
        <GordonLoader size={20} />
      ) : (
        <>
          {!profile.PersonType?.includes?.('alum') ? (
            <FormControlLabel
              control={
                <Checkbox checked={includeStudent} onChange={() => setIncludeStudent((i) => !i)} />
              }
              label="Student"
            />
          ) : null}
          <FormControlLabel
            control={
              <Checkbox checked={includeFacStaff} onChange={() => setIncludeFacStaff((i) => !i)} />
            }
            label="Faculty/Staff"
          />
          {!profile.PersonType?.includes?.('stu') ? (
            <FormControlLabel
              control={
                <Checkbox checked={includeAlumni} onChange={() => setIncludeAlumni((i) => !i)} />
              }
              label="Alumni"
            />
          ) : null}
        </>
      )}
    </Grid>
  );

  return (
    <Card style={{ padding: '0 3vw' }}>
      <CardContent>
        <CardHeader title={searchPageTitle} />

        {/* Search Section 1: General Info */}
        <Grid container spacing={2} direction="row">
          <Grid item xs={12} sm={6} onKeyDown={handleEnterKeyPress}>
            <TextSearchField
              name="first_name"
              value={searchValues.first_name}
              updateValue={handleUpdate}
              classes={classes}
              Icon={Person}
            />
          </Grid>

          <Grid item xs={12} sm={6} onKeyDown={handleEnterKeyPress}>
            <TextSearchField
              name="last_name"
              value={searchValues.last_name}
              updateValue={handleUpdate}
              classes={classes}
            />
          </Grid>

          <Grid item xs={12}>
            <SelectSearchField
              name="residence_hall"
              value={searchValues.residence_hall}
              updateValue={handleUpdate}
              options={halls}
              Icon={FaBuilding}
              classes={classes}
            />
          </Grid>

          {isTodayAprilFools() ? (
            <Grid item xs={12}>
              <SelectSearchField
                name="relationship_status"
                value={searchValues.relationship_status}
                updateValue={handleUpdate}
                options={relationship_statuses}
                Icon={FaHeart}
                classes={classes}
              />
            </Grid>
          ) : null}

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
        <Grid container align="center">
          <Accordion style={{ flexGrow: 1 }}>
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
              <Grid container spacing={2} direction="row">
                {/* Advanced Search Filters: Student/Alumni */}
                <Grid item xs={12} md={4}>
                  <Typography
                    align="center"
                    gutterBottom
                    color={includeStudent || includeAlumni ? 'primary' : 'initial'}
                  >
                    {profile.PersonType === 'stu' ? 'Student' : 'Student/Alumni'}
                  </Typography>
                  <SelectSearchField
                    name="major"
                    value={searchValues.major}
                    updateValue={handleUpdate}
                    options={majors}
                    classes={classes}
                    Icon={FaBook}
                    disabled={!includeStudent && !includeAlumni}
                  />
                  <SelectSearchField
                    name="minor"
                    value={searchValues.minor}
                    updateValue={handleUpdate}
                    options={minors}
                    classes={classes}
                    Icon={FaBook}
                    disabled={!includeStudent}
                  />
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
                          value={searchValues.class_year}
                          onChange={(e) =>
                            setSearchValues((sv) => ({ ...sv, class_year: e.target.value }))
                          }
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
                <Grid item xs={12} md={4}>
                  <Typography
                    align="center"
                    gutterBottom
                    color={includeFacStaff ? 'primary' : 'initial'}
                  >
                    Faculty/Staff
                  </Typography>
                  <SelectSearchField
                    name="department"
                    value={searchValues.department}
                    updateValue={handleUpdate}
                    options={departments}
                    classes={classes}
                    Icon={FaBriefcase}
                    disabled={!includeFacStaff}
                  />
                  <SelectSearchField
                    name="building"
                    value={searchValues.building}
                    options={buildings}
                    classes={classes}
                    Icon={FaBuilding}
                    disabled={!includeFacStaff}
                  />
                </Grid>

                {/* Advanced Search Filters: Everyone */}
                <Grid item xs={12} sm={4} spacing={3}>
                  <Typography align="center" gutterBottom color="primary">
                    Everyone
                  </Typography>
                  <TextSearchField
                    name="home_town"
                    value={searchValues.home_town}
                    updateValue={handleUpdate}
                    classes={classes}
                    Icon={Home}
                    onKeyDown={handleEnterKeyPress}
                  />
                  <SelectSearchField
                    name="state"
                    value={searchValues.state}
                    updateValue={handleUpdate}
                    options={states}
                    Icon={LocationCity}
                    classes={classes}
                  />
                  <SelectSearchField
                    name="country"
                    value={searchValues.country}
                    updateValue={handleUpdate}
                    options={countries}
                    Icon={FaGlobeAmericas}
                    classes={classes}
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </CardContent>

      <CardActions>
        <Button variant="contained" onClick={() => setSearchValues(initialSearchValues)}>
          RESET
        </Button>
        {saving ? (
          <GordonLoader />
        ) : (
          <Button
            color="primary"
            onClick={search}
            fullWidth
            variant="contained"
            disabled={!canSearch()}
          >
            SEARCH
          </Button>
        )}
      </CardActions>
      <br />
    </Card>
  );
};

export default withStyles(styles2)(SearchFields);

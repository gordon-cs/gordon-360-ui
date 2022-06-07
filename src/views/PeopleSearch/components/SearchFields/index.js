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
  FormControlLabel,
  FormLabel,
  Grid,
  Switch,
  Typography,
} from '@material-ui/core';
import { ExpandMore, Home, LocationCity, Person } from '@material-ui/icons';
import GordonLoader from 'components/Loader';
import { useUser } from 'hooks';
import { useCallback, useEffect, useState } from 'react';
import {
  FaBook,
  FaBriefcase,
  FaBuilding,
  FaGlobeAmericas,
  FaHeart,
  FaSchool,
} from 'react-icons/fa';
import Media from 'react-media';
import goStalk, { Class } from 'services/goStalk';
import { toTitleCase } from 'services/utils';
import { gordonColors } from 'theme';
import SelectSearchField from './components/SelectSearchField';
import TextSearchField from './components/TextSearchField';

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
  building: '',
};

const isTodayAprilFools = () => {
  const todaysDate = new Date();
  return todaysDate.getMonth() === 3 && todaysDate.getDate() === 1;
};

const SearchFields = ({ onSearch, displayLargeImage, setDisplayLargeImage }) => {
  const { profile } = useUser();

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

  const [loading, setLoading] = useState(true);
  const [loadingSearch, setLoadingSearch] = useState(false);

  //This is to prevent search from blank
  const canSearch = useCallback(() => {
    return Object.values(searchValues)
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
      setLoadingSearch(true);

      const results = await goStalk.search(
        includeStudent,
        includeFacStaff,
        includeAlumni,
        searchValues,
      );
      onSearch(results);
      setLoadingSearch(false);
    }
  }, [canSearch, includeStudent, includeFacStaff, includeAlumni, searchValues, onSearch]);

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

  if (loading) {
    return <GordonLoader />;
  }

  const handleUpdate = (event) =>
    setSearchValues((sv) => ({ ...sv, [event.target.name]: event.target.value }));

  const handleEnterKeyPress = (event) => {
    if (event.key === 'Enter') {
      search();
    }
  };

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
              Icon={Person}
            />
          </Grid>

          <Grid item xs={12} sm={6} onKeyDown={handleEnterKeyPress}>
            <TextSearchField
              name="last_name"
              value={searchValues.last_name}
              updateValue={handleUpdate}
            />
          </Grid>

          <Grid item xs={12}>
            <SelectSearchField
              name="residence_hall"
              value={searchValues.residence_hall}
              updateValue={handleUpdate}
              options={halls}
              Icon={FaBuilding}
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
              <Typography variant="h6" align="center">
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
                    Icon={FaBook}
                    disabled={!includeStudent && !includeAlumni}
                  />
                  <SelectSearchField
                    name="minor"
                    value={searchValues.minor}
                    updateValue={handleUpdate}
                    options={minors}
                    Icon={FaBook}
                    disabled={!includeStudent}
                  />
                  <SelectSearchField
                    name="class_year"
                    value={searchValues.class_year}
                    updateValue={handleUpdate}
                    options={Object.values(Class).filter((value) => typeof value !== 'number')}
                    Icon={FaSchool}
                    disabled={!includeStudent}
                  />
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
                    Icon={FaBriefcase}
                    disabled={!includeFacStaff}
                  />
                  <SelectSearchField
                    name="building"
                    value={searchValues.building}
                    options={buildings}
                    Icon={FaBuilding}
                    disabled={!includeFacStaff}
                  />
                </Grid>

                {/* Advanced Search Filters: Everyone */}
                <Grid item xs={12} md={4}>
                  <Typography align="center" gutterBottom color="primary">
                    Everyone
                  </Typography>
                  <TextSearchField
                    name="home_town"
                    value={searchValues.home_town}
                    updateValue={handleUpdate}
                    Icon={Home}
                    onKeyDown={handleEnterKeyPress}
                  />
                  <SelectSearchField
                    name="state"
                    value={searchValues.state}
                    updateValue={handleUpdate}
                    options={states}
                    Icon={LocationCity}
                  />
                  <SelectSearchField
                    name="country"
                    value={searchValues.country}
                    updateValue={handleUpdate}
                    options={countries}
                    Icon={FaGlobeAmericas}
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
        {loadingSearch ? (
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

export default SearchFields;

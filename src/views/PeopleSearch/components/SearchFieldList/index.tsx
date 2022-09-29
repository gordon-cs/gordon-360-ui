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
  Typography,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import GordonLoader from 'components/Loader';
import { useAuthGroups, useUser } from 'hooks';
import {
  ChangeEvent,
  Dispatch,
  KeyboardEvent,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  FaBook,
  FaBriefcase,
  FaBuilding,
  FaGlobeAmericas,
  FaHeart,
  FaSchool,
  FaHome as Home,
  FaUser as Person,
  FaMapMarkerAlt as LocationCity,
} from 'react-icons/fa';
import { useHistory, useLocation } from 'react-router';
import { AuthGroup } from 'services/auth';
import peopleSearchService, { Class, PeopleSearchQuery, SearchResult } from 'services/peopleSearch';
import { toTitleCase, searchParamSerializerFactory } from 'services/utils';
import { gordonColors } from 'theme';
import SearchField from './components/SearchField';

/**
 * A Regular Expression that matches any string with any alphanumeric character `[a-z][A-Z][0-9]`.
 * See [RegExp Character Classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Character_Classes#types) for more info.
 */
const containsLetterRegExp = /\w/;

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
  <>
    Search the
    <b style={{ color: gordonColors.primary.blue }}> Gordon </b>
    Community
  </>
);

const defaultSearchParams: PeopleSearchQuery = {
  includeStudent: true,
  includeFacStaff: true,
  includeAlumni: false,
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

const { serializeSearchParams, deserializeSearchParams } =
  searchParamSerializerFactory(defaultSearchParams);

const isTodayAprilFools = () => {
  const todaysDate = new Date();
  return todaysDate.getMonth() === 3 && todaysDate.getDate() === 1;
};

type Props = {
  onSearch: Dispatch<SetStateAction<SearchResult[] | null>>;
};

const SearchFieldList = ({ onSearch }: Props) => {
  const { profile } = useUser();
  const history = useHistory();
  const location = useLocation();

  const [isStudent, isFacStaff, isAlumni] = useAuthGroups(
    AuthGroup.Student,
    AuthGroup.FacStaff,
    AuthGroup.Alumni,
  );

  const [majors, setMajors] = useState<string[]>([]);
  const [minors, setMinors] = useState<string[]>([]);
  const [states, setStates] = useState<string[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  const [departments, setDepartments] = useState<string[]>([]);
  const [buildings, setBuildings] = useState<string[]>([]);
  const [halls, setHalls] = useState<string[]>([]);

  /**
   * Default search params adjusted for the user's identity.
   */
  const initialSearchParams: PeopleSearchQuery = useMemo(
    () => ({
      ...defaultSearchParams,
      // Only students and facstaff search students by default - alumni aren't allowed to search students
      includeStudent: isStudent || isFacStaff,
      // Only alumni search alumni by default
      includeAlumni: isAlumni,
    }),
    [isAlumni, isFacStaff, isStudent],
  );
  const [searchParams, setSearchParams] = useState(initialSearchParams);

  // Used to only read search params from URL on first load (and on back/forward navigate via event listener)
  const shouldReadSearchParamsFromURL = useRef(true);

  const [loading, setLoading] = useState(true);
  const [loadingSearch, setLoadingSearch] = useState(false);

  /**
   * Whether the user can search for the current params.
   * This prevents a search with empty params, which freezes the client by trying to render thousands of results
   */
  const canSearch = useMemo(() => {
    const { includeStudent, includeFacStaff, includeAlumni, ...criteria } = searchParams;

    // Must search some cohort of people
    const includesSomeone = includeStudent || includeFacStaff || includeAlumni;

    // Must search for some non-empty criteria
    const anySearchCriteria = Object.values(criteria).some((c) => containsLetterRegExp.test(c));

    return includesSomeone && anySearchCriteria;
  }, [searchParams]);

  const search = useCallback(async () => {
    if (canSearch) {
      setLoadingSearch(true);

      await peopleSearchService.search(searchParams).then(onSearch);

      const newQueryString = serializeSearchParams(searchParams);
      // If search params are new since last search, add search to history
      if (location.search !== newQueryString) {
        history.push(newQueryString);
      }

      setLoadingSearch(false);
    }
  }, [canSearch, searchParams, onSearch, location.search, history]);

  useEffect(() => {
    const loadPage = async () => {
      const [majors, minors, halls, states, countries, departments, buildings] = await Promise.all([
        peopleSearchService.getMajors(),
        peopleSearchService.getMinors(),
        peopleSearchService.getHalls(),
        peopleSearchService.getStates(),
        peopleSearchService.getCountries(),
        peopleSearchService.getDepartments(),
        peopleSearchService.getBuildings(),
      ]);
      setMajors(majors);
      setMinors(minors);
      setHalls(halls);
      setStates(states);
      setCountries(countries.map((country) => toTitleCase(country)));
      setDepartments(departments);
      setBuildings(buildings);

      setLoading(false);
    };

    loadPage();
  }, [isAlumni]);

  useEffect(() => {
    // Read search params from URL on navigate (including first load)
    if (shouldReadSearchParamsFromURL.current) {
      const newSearchParams = deserializeSearchParams(new URLSearchParams(location.search));

      setSearchParams((oldSearchParams) => {
        // If there are no search params in the URL, reset to initialSearchParams
        if (newSearchParams === null) {
          return initialSearchParams;
        }

        // Update search params with values from URL query string
        return {
          ...oldSearchParams,
          ...newSearchParams,
        };
      });

      shouldReadSearchParamsFromURL.current = false;
    }

    // Read search params from URL on 'popstate' (back/forward navigation) events
    const onNavigate = () => (shouldReadSearchParamsFromURL.current = true);
    window.addEventListener('popstate', onNavigate);
    return () => window.removeEventListener('popstate', onNavigate);
  }, [location.search, initialSearchParams]);

  const handleUpdate = (event: ChangeEvent<HTMLInputElement>) =>
    setSearchParams((sp) => ({
      ...sp,
      [event.target.name]:
        event.target.type === 'checkbox' ? event.target.checked : event.target.value,
    }));

  const handleEnterKeyPress = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      search();
    }
  };

  if (loading) {
    return <GordonLoader />;
  }

  const PeopleSearchCheckbox = (
    <Grid item xs={12} md={6}>
      <FormLabel component="label">Include: &nbsp;</FormLabel>
      {loading ? (
        <GordonLoader size={20} />
      ) : (
        <>
          {
            // Only students and FacStaff can search students
            isStudent || isFacStaff ? (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={searchParams.includeStudent}
                    name="includeStudent"
                    onChange={handleUpdate}
                  />
                }
                label="Student"
              />
            ) : null
          }
          <FormControlLabel
            control={
              <Checkbox
                checked={searchParams.includeFacStaff}
                name="includeFacStaff"
                onChange={handleUpdate}
              />
            }
            label="Faculty/Staff"
          />
          {
            // Only Alumni and FacStaff can search students
            isAlumni || isFacStaff ? (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={searchParams.includeAlumni}
                    name="includeAlumni"
                    onChange={handleUpdate}
                  />
                }
                label="Alumni"
              />
            ) : null
          }
        </>
      )}
    </Grid>
  );

  return (
    <Card style={{ padding: '1rem' }}>
      <CardContent>
        <CardHeader title={searchPageTitle} titleTypographyProps={{ align: 'center' }} />

        {/* Search Section 1: General Info */}
        <Grid container spacing={2} direction="row" alignItems="center" justifyContent="center">
          <Grid item xs={12} sm={6} onKeyDown={handleEnterKeyPress}>
            <SearchField
              name="first_name"
              value={searchParams.first_name}
              updateValue={handleUpdate}
              Icon={Person}
            />
          </Grid>

          <Grid item xs={12} sm={6} onKeyDown={handleEnterKeyPress}>
            <SearchField
              name="last_name"
              value={searchParams.last_name}
              updateValue={handleUpdate}
            />
          </Grid>

          <Grid item xs={12}>
            <SearchField
              name="residence_hall"
              value={searchParams.residence_hall}
              updateValue={handleUpdate}
              options={halls}
              Icon={FaBuilding}
              select
            />
          </Grid>

          {isTodayAprilFools() ? (
            <Grid item xs={12}>
              <SearchField
                name="relationship_status"
                value={searchParams.relationship_status ?? ''}
                updateValue={handleUpdate}
                options={relationship_statuses}
                Icon={FaHeart}
                select
              />
            </Grid>
          ) : null}

          {PeopleSearchCheckbox}
        </Grid>

        {/* Advanced Filtering */}
        <Grid container alignItems="center">
          <Accordion style={{ flexGrow: 1 }} elevation={3}>
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
                    color={
                      searchParams.includeStudent || searchParams.includeAlumni
                        ? 'primary'
                        : 'initial'
                    }
                  >
                    {profile?.PersonType === 'stu' ? 'Student' : 'Student/Alumni'}
                  </Typography>
                  <SearchField
                    name="major"
                    value={searchParams.major}
                    updateValue={handleUpdate}
                    options={majors}
                    Icon={FaBook}
                    select
                    disabled={!searchParams.includeStudent && !searchParams.includeAlumni}
                  />
                  <SearchField
                    name="minor"
                    value={searchParams.minor}
                    updateValue={handleUpdate}
                    options={minors}
                    Icon={FaBook}
                    select
                    disabled={!searchParams.includeStudent}
                  />
                  <SearchField
                    name="class_year"
                    value={searchParams.class_year}
                    updateValue={handleUpdate}
                    options={
                      Object.values(Class).filter((value) => typeof value !== 'number') as string[]
                    }
                    Icon={FaSchool}
                    select
                    disabled={!searchParams.includeStudent}
                  />
                </Grid>

                {/* Advanced Search Filters: Faculty/Staff */}
                <Grid item xs={12} md={4}>
                  <Typography
                    align="center"
                    gutterBottom
                    color={searchParams.includeFacStaff ? 'primary' : 'initial'}
                  >
                    Faculty/Staff
                  </Typography>
                  <SearchField
                    name="department"
                    value={searchParams.department}
                    updateValue={handleUpdate}
                    options={departments}
                    Icon={FaBriefcase}
                    select
                    disabled={!searchParams.includeFacStaff}
                  />
                  <SearchField
                    name="building"
                    value={searchParams.building}
                    updateValue={handleUpdate}
                    options={buildings}
                    Icon={FaBuilding}
                    select
                    disabled={!searchParams.includeFacStaff}
                  />
                </Grid>

                {/* Advanced Search Filters: Everyone */}
                <Grid item xs={12} md={4}>
                  <Typography align="center" gutterBottom color="primary">
                    Everyone
                  </Typography>
                  <SearchField
                    name="home_town"
                    value={searchParams.home_town}
                    updateValue={handleUpdate}
                    Icon={Home}
                  />
                  <SearchField
                    name="state"
                    value={searchParams.state}
                    updateValue={handleUpdate}
                    options={states}
                    Icon={LocationCity}
                    select
                  />
                  <SearchField
                    name="country"
                    value={searchParams.country}
                    updateValue={handleUpdate}
                    options={countries}
                    Icon={FaGlobeAmericas}
                    select
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </CardContent>

      <CardActions>
        <Button variant="contained" onClick={() => setSearchParams(initialSearchParams)}>
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
            disabled={!canSearch}
          >
            SEARCH
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default SearchFieldList;

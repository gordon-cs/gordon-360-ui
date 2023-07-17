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
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import GordonLoader from 'components/Loader';
import { useAuthGroups, useUser } from 'hooks';
import {
  ChangeEvent,
  Dispatch,
  KeyboardEvent,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  FaBook,
  FaBriefcase,
  FaBuilding,
  FaCalendarTimes,
  FaGlobeAmericas,
  FaHeart,
  FaPaperPlane,
  FaSchool,
  FaHome as Home,
  FaMapMarkerAlt as LocationCity,
  FaUser as Person,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import addressService from 'services/address';
import { AuthGroup } from 'services/auth';
import peopleSearchService, { Class, PeopleSearchQuery, SearchResult } from 'services/peopleSearch';
import { compareByProperty, searchParamSerializerFactory } from 'services/utils';
import styles from './SearchFieldList.module.css';
import SearchField, { SelectOption } from './components/SearchField';
import Slider from '@mui/material/Slider';
import Switch from '@mui/material/Switch';

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
    <b className={styles.people_text}> Gordon </b>
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
  class_standing: '',
  graduation_year: '',
  home_town: '',
  state: '',
  country: '',
  department: '',
  building: '',
  initial_year: '',
  final_year: '',
  involvement: '',
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

const AdvancedOptionsColumn = ({ children, ...otherProps }: { children: ReactNode }) => (
  <Grid
    container
    spacing={2}
    direction="column"
    justifyContent="flex-start"
    alignItems="center"
    item
    xs={12}
    md={4}
    {...otherProps}
  >
    {children}
  </Grid>
);

const SearchFieldList = ({ onSearch }: Props) => {
  const { profile } = useUser();
  const navigate = useNavigate();

  const [isStudent, isFacStaff, isAlumni] = useAuthGroups(
    AuthGroup.Student,
    AuthGroup.FacStaff,
    AuthGroup.Alumni,
  );

  const [majors, setMajors] = useState<string[]>([]);
  const [minors, setMinors] = useState<string[]>([]);
  const [states, setStates] = useState<SelectOption[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  const [departments, setDepartments] = useState<SelectOption[]>([]);
  const [buildings, setBuildings] = useState<string[]>([]);
  const [halls, setHalls] = useState<string[]>([]);
  const currentYear = new Date().getFullYear();
  const [graduationYearRange, setGraduationYearRange] = useState<number[]>([1889, currentYear]);
  // 1889 is the establish date of Gordon
  const [switchYearRange, setSwitchYearRange] = useState(true);
  const [involvements, setInvolvements] = useState<string[]>([]);

  /**
   * Default search params adjusted for the user's identity.
   */
  const initialSearchParams: PeopleSearchQuery = useMemo(
    () => ({
      ...defaultSearchParams,
      // Only students and facstaff search students by default - alumni aren't allowed to search students
      includeStudent: isStudent || isFacStaff,
      // Only alumni search alumni by default
      includeAlumni: isAlumni && !isStudent && !isFacStaff,
    }),
    [isAlumni, isFacStaff, isStudent],
  );
  const [searchParams, setSearchParams] = useState(initialSearchParams);

  const [loading, setLoading] = useState(true);
  const [loadingSearch, setLoadingSearch] = useState(false);

  /**
   * Whether the user can search for the current params.
   * This prevents a search with empty params, which freezes the client by trying to render thousands of results
   */
  const canSearch = (params: PeopleSearchQuery) => {
    const { includeStudent, includeFacStaff, includeAlumni, ...criteria } = params;

    // Must search some cohort of people
    const includesSomeone = includeStudent || includeFacStaff || includeAlumni;

    // Must search for some non-empty criteria
    const anySearchCriteria = Object.values(criteria).some((c) => containsLetterRegExp.test(c));

    return includesSomeone && anySearchCriteria;
  };

  const search = useCallback(
    async (params: PeopleSearchQuery) => {
      if (canSearch(params)) {
        setLoadingSearch(true);

        await peopleSearchService.search(params).then(onSearch);

        const newQueryString = serializeSearchParams(params);
        // If search params are new since last search, add search to history
        if (window.location.search !== newQueryString) {
          navigate(newQueryString);
        }

        setLoadingSearch(false);
      }
    },
    [canSearch, searchParams, onSearch, navigate],
  );

  useEffect(() => {
    const loadPage = async () => {
      const [majors, minors, halls, states, countries, departments, buildings, involvements] =
        await Promise.all([
          peopleSearchService.getMajors(),
          peopleSearchService.getMinors(),
          peopleSearchService.getHalls(),
          addressService.getStates(),
          addressService.getCountries(),
          peopleSearchService.getDepartmentDropdownOptions(),
          peopleSearchService.getBuildings(),
          peopleSearchService.getInvolvements(),
        ]);
      setMajors(majors);
      setMinors(minors);
      setHalls(halls);
      setStates(states.map((s) => ({ label: s.Name, value: s.Abbreviation })));
      setCountries(countries.map((c) => c.Name));
      setDepartments(departments);
      setBuildings(buildings);
      setInvolvements(involvements);
      setLoading(false);
    };

    loadPage();
  }, []);
  useEffect(() => {
    const readSearchParamsFromURL = () => {
      const newSearchParams = deserializeSearchParams(new URLSearchParams(window.location.search));

      const recalculate = (oldSearchParams: PeopleSearchQuery) => {
        // If there are no search params in the URL, reset to initialSearchParams
        if (newSearchParams === null) {
          return initialSearchParams;
        }

        // Update search params with values from URL query string
        return {
          ...oldSearchParams,
          ...newSearchParams,
        };
      };
      const params = recalculate(searchParams);
      setSearchParams(params);
      search(params);
    };
    // Read search params from URL when SearchFieldList mounts (or initialSearchParams changes)
    readSearchParamsFromURL();

    // Read search params from URL on 'popstate' (back/forward navigation) events
    window.addEventListener('popstate', readSearchParamsFromURL);
    return () => window.removeEventListener('popstate', readSearchParamsFromURL);
  }, []);

  const handleUpdate = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'graduation_year') {
      setSearchParams((sp) => ({
        ...sp,
        class_standing: '',
        minor: '',
      }));
    } else if (event.target.name === 'class_standing') {
      setSearchParams((sp) => ({
        ...sp,
        initial_year: '',
        final_year: '',
        graduation_year: '',
      }));
    }

    setSearchParams((sp) => ({
      ...sp,
      [event.target.name]:
        event.target.type === 'checkbox' ? event.target.checked : event.target.value,
    }));
    if (event.target.name === 'includeFacStaff' && !event.target.checked) {
      setSearchParams((sp) => ({
        ...sp,
        building: '',
        department: '',
      }));
    } else if (event.target.name === 'includeStudent' && !event.target.checked) {
      setSearchParams((sp) => ({
        ...sp,
        major: '',
        minor: '',
        class_year: '',
      }));
    } else if (event.target.name === 'includeAlumni' && !event.target.checked) {
      setSearchParams((sp) => ({
        ...sp,
        graduation_year: '',
      }));
    }
  };

  const handleEnterKeyPress = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      search(searchParams);
    }
  };

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setGraduationYearRange(newValue as number[]);
    let values = graduationYearRange.toString().split(',');
    setSearchParams((sp) => ({
      ...sp,
      initial_year: values[0],
      final_year: values[1],
    }));
    setSearchParams((sp) => ({
      ...sp,
      class_standing: '',
    }));
  };

  const handleSwitchChange = () => {
    if (switchYearRange) {
      setSearchParams((sp) => ({
        ...sp,
        initial_year: '',
        final_year: '',
      }));
    }
    setSwitchYearRange((prev) => !prev);
  };

  if (loading) {
    return <GordonLoader />;
  }

  const PeopleSearchCheckbox = (
    <Grid item xs={12} md={6} className={styles.people_section}>
      <FormLabel component="label" color="primary">
        Include: &nbsp;
      </FormLabel>
      {loading ? (
        <GordonLoader size={20} />
      ) : (
        <>
          {
            // Only students and FacStaff can search students
            (isStudent || isFacStaff) && (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={searchParams.includeStudent}
                    name="includeStudent"
                    onChange={handleUpdate}
                    color="secondary"
                  />
                }
                label="Student"
              />
            )
          }
          <FormControlLabel
            control={
              <Checkbox
                checked={searchParams.includeFacStaff}
                name="includeFacStaff"
                onChange={handleUpdate}
                color="secondary"
              />
            }
            label="Faculty/Staff"
          />
          {
            // Only Alumni and FacStaff can search students
            (isAlumni || isFacStaff) && (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={searchParams.includeAlumni}
                    name="includeAlumni"
                    onChange={handleUpdate}
                    color="secondary"
                  />
                }
                label="Alumni"
              />
            )
          }
        </>
      )}
    </Grid>
  );

  return (
    <Card className={styles.people_section}>
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
              options={halls.sort()}
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
                options={relationship_statuses.sort()}
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
              expandIcon={<ExpandMore className={styles.people} />}
              id="more-search-options-header"
              aria-controls="more-search-options-controls"
            >
              <Typography variant="h6" align="center" className={styles.people_searchbar}>
                More Search Options
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={4} direction="row">
                {/* Advanced Search Filters: Student/Alumni */}
                <AdvancedOptionsColumn>
                  <Typography align="center" gutterBottom color="neutral">
                    {profile?.PersonType === 'stu' ? 'Student' : 'Student/Alumni'}
                  </Typography>
                  <SearchField
                    name="major"
                    value={searchParams.major}
                    updateValue={handleUpdate}
                    options={majors.sort()}
                    Icon={FaBook}
                    select
                    disabled={!searchParams.includeStudent && !searchParams.includeAlumni}
                  />
                  <SearchField
                    name="minor"
                    value={searchParams.minor}
                    updateValue={handleUpdate}
                    options={minors.sort()}
                    Icon={FaBook}
                    select
                    disabled={!searchParams.includeStudent}
                  />
                  <SearchField
                    name="class_standing"
                    value={searchParams.class_standing}
                    updateValue={handleUpdate}
                    options={
                      Object.values(Class).filter((value) => typeof value !== 'number') as string[]
                    }
                    Icon={FaSchool}
                    select
                    disabled={!searchParams.includeStudent}
                  />
                  <SearchField
                    name="involvement"
                    value={searchParams.involvement}
                    updateValue={handleUpdate}
                    options={involvements.sort()}
                    Icon={FaPaperPlane}
                    select
                    disabled={!searchParams.includeStudent && !searchParams.includeAlumni}
                  />

                  {(isAlumni || isFacStaff) && switchYearRange ? (
                    <SearchField
                      name="graduation_year"
                      value={searchParams.graduation_year}
                      updateValue={handleUpdate}
                      options={Array.from({ length: currentYear - 1889 + 1 }, (_, i) => ({
                        value: (currentYear - i).toString(),
                        label: (currentYear - i).toString(),
                      }))}
                      Icon={FaCalendarTimes}
                      disabled={!searchParams.includeAlumni}
                      select
                    />
                  ) : (
                    <Grid item width={225}>
                      <Slider
                        getAriaLabel={() => 'graduationYearRange'}
                        value={graduationYearRange}
                        onChange={handleSliderChange}
                        valueLabelDisplay="auto"
                        getAriaValueText={toString}
                        min={1889}
                        max={currentYear}
                        disabled={!searchParams.includeAlumni}
                        color="secondary"
                      />
                      <Typography fontSize={15} align="center">
                        {graduationYearRange[0]}-{graduationYearRange[1]}
                      </Typography>
                    </Grid>
                  )}
                  {(isAlumni || isFacStaff) && (
                    <FormControlLabel
                      control={<Switch onChange={handleSwitchChange} color="secondary" />}
                      label={switchYearRange ? 'Search by Year Range' : 'Search by Graduation Year'}
                      labelPlacement="end"
                    />
                  )}
                </AdvancedOptionsColumn>

                {/* Advanced Search Filters: Faculty/Staff */}
                <AdvancedOptionsColumn>
                  <Typography align="center" gutterBottom color="neutral">
                    Faculty/Staff
                  </Typography>
                  <SearchField
                    name="department"
                    value={searchParams.department}
                    updateValue={handleUpdate}
                    options={departments.sort(compareByProperty('label'))}
                    Icon={FaBriefcase}
                    select
                    disabled={!searchParams.includeFacStaff}
                  />
                  <SearchField
                    name="building"
                    value={searchParams.building}
                    updateValue={handleUpdate}
                    options={buildings.sort()}
                    Icon={FaBuilding}
                    select
                    disabled={!searchParams.includeFacStaff}
                  />
                </AdvancedOptionsColumn>

                {/* Advanced Search Filters: Everyone */}
                <AdvancedOptionsColumn>
                  <Typography align="center" color="neutral">
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
                    options={states.sort(compareByProperty('label'))}
                    Icon={LocationCity}
                    select
                  />
                  <SearchField
                    name="country"
                    value={searchParams.country}
                    updateValue={handleUpdate}
                    options={countries.sort()}
                    Icon={FaGlobeAmericas}
                    select
                  />
                </AdvancedOptionsColumn>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </CardContent>

      <CardActions>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setSearchParams(initialSearchParams)}
        >
          RESET
        </Button>
        {loadingSearch ? (
          <GordonLoader />
        ) : (
          <Button
            color="primary"
            onClick={() => search(searchParams)}
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

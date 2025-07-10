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
  TextField,
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
import { BiMaleFemale as GenderIcon } from 'react-icons/bi';
import { FaMagnifyingGlass as MagnifyingGlass } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import addressService from 'services/address';
import { AuthGroup } from 'services/auth';
import peopleSearchService, { Class, PeopleSearchQuery, SearchResult } from 'services/peopleSearch';
import { compareByProperty, searchParamSerializerFactory } from 'services/utils';
import styles from './SearchFieldList.module.css';
import SearchField, { SelectOption } from './components/SearchField';
import Slider from '@mui/material/Slider';
import Switch from '@mui/material/Switch';
import { debounce } from 'lodash';

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
    <b className={styles.search_field_list_gordon_text}> Gordon </b>
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
  gender: '',
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
  const [gender, setGender] = useState<string[]>([]);
  const [searchText, setSearchText] = useState('');

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
  const debouncedFullNameUpdate = useMemo(
    () =>
      debounce((fullName: string) => {
        const parts = fullName.trim().split(/\s+/);

        let first_name = '';
        let last_name = '';

        if (parts.length === 1) {
          // Try both ways: put the word in first_name only, leave last_name blank
          first_name = parts[0];
          last_name = '';
        } else if (parts.length >= 2) {
          first_name = parts[0];
          last_name = parts.slice(1).join(' ');
        }

        setSearchParams((sp: PeopleSearchQuery) => ({
          ...sp,
          first_name,
          last_name,
        }));
      }, 300),
    [setSearchParams],
  );

  const [fullNameInput, setFullNameInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadingSearch, setLoadingSearch] = useState(false);

  /**
   * Whether the user can search for the current params.
   * This prevents a search with empty params, which freezes the client by trying to render thousands of results
   * @param params
   */
  const canSearch = (params: PeopleSearchQuery) => {
    const { includeStudent, includeFacStaff, includeAlumni, ...criteria } = params;

    const includesSomeone = includeStudent || includeFacStaff || includeAlumni;

    const anySearchCriteria =
      Object.values(criteria).some((c) => containsLetterRegExp.test(c)) ||
      containsLetterRegExp.test(fullNameInput) ||
      containsLetterRegExp.test(searchText);

    return includesSomeone && anySearchCriteria;
  };

  const search = useCallback(
    async (params: PeopleSearchQuery) => {
      if (!canSearch(params)) return;

      setLoadingSearch(true);

      let results: SearchResult[] = [];

      const rawQuery = searchText.trim().toLowerCase();
      const hasSearchText = containsLetterRegExp.test(rawQuery);

      const queryParts = rawQuery
        .split(/\s+/) // split on one or more spaces
        .filter((part) => part.length > 0);

      if (fullNameInput && !params.last_name) {
        // Perform full_name search
        const words = fullNameInput.trim().split(/\s+/);
        const first_name = words[0];
        const last_name = words.length > 1 ? words.slice(1).join(' ') : '';

        const [firstResults, lastResults] = await Promise.all([
          peopleSearchService.search({ ...params, first_name, last_name }),
          ...(words.length === 1
            ? [peopleSearchService.search({ ...params, first_name: '', last_name: first_name })]
            : []),
        ]);

        const all = [...firstResults, ...lastResults];
        const deduped = Array.from(new Map(all.map((p) => [p.AD_Username, p])).values());
        results = deduped;
      } else {
        // Regular search with given filters
        results = await peopleSearchService.search(params);
      }

      // Apply full-text filter if `searchText` is used
      if (hasSearchText) {
        results = results.filter((person) => {
          const allFields = [
            person.FirstName,
            person.LastName,
            person.NickName,
            person.MaidenName,
            'Title' in person ? person.Title : '',
            'Department' in person ? person.Department : '',
            'Major' in person ? person.Major : '',
            'Minor' in person ? person.Minor : '',
            'Involvement' in person ? person.Involvement : '',
            'Hall' in person ? person.Hall : '',
            'Class' in person ? person.Class : '',
            'HomeCity' in person ? person.HomeCity : '',
            'HomeState' in person ? person.HomeState : '',
            'HomeCountry' in person ? person.HomeCountry : '',
            'Keywords' in person && Array.isArray(person.Keywords) ? person.Keywords.join(' ') : '',
          ];

          const normalizedFields = allFields
            .filter(Boolean)
            .map((field) => (field as string).toLowerCase().replace(/\s+/g, ' '))
            .join(' ');

          return queryParts.every((part) =>
            normalizedFields.includes(part.toLowerCase().replace(/\s+/g, ' ')),
          );
        });
      }

      onSearch(results);

      const newQueryString = serializeSearchParams(params);
      if (window.location.search !== newQueryString) {
        navigate(newQueryString);
      }

      setLoadingSearch(false);
    },
    [canSearch, onSearch, navigate, searchText, fullNameInput],
  );

  useEffect(() => {
    const loadPage = async () => {
      const [
        majors,
        minors,
        halls,
        states,
        countries,
        departments,
        buildings,
        involvements,
        gender,
      ] = await Promise.all([
        peopleSearchService.getMajors(),
        peopleSearchService.getMinors(),
        peopleSearchService.getHalls(),
        addressService.getStates(),
        addressService.getCountries(),
        peopleSearchService.getDepartmentDropdownOptions(),
        peopleSearchService.getBuildings(),
        peopleSearchService.getInvolvements(),
        peopleSearchService.getGender(),
      ]);
      setMajors(majors);
      setMinors(minors);
      setHalls(halls);
      setStates(states.map((s) => ({ label: s.Name, value: s.Abbreviation })));
      setCountries(countries.map((c) => c.Name));
      setDepartments(departments);
      setBuildings(buildings.map((b) => b.Description));
      setInvolvements(involvements);
      setGender(gender.toSorted());
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
        initial_year: '',
        final_year: '',
        graduation_year: '',
      }));
    }
  };
  const handleEnterKeyPress = async (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      const inputValue = (event.target as HTMLInputElement).value.trim();
      if (!inputValue) return;

      const words = inputValue.split(/\s+/);
      let allResults: SearchResult[] = [];

      if (words.length >= 2) {
        // Two or more words → treat first word as first_name, rest as last_name
        const fullNameResults = await peopleSearchService.search({
          ...searchParams,
          first_name: words[0],
          last_name: words.slice(1).join(' '),
        });
        allResults = fullNameResults;
      } else {
        // Only one word → search both first_name and last_name separately and combine
        const word = words[0];
        const firstNameResults = await peopleSearchService.search({
          ...searchParams,
          first_name: word,
          last_name: '',
        });

        const lastNameResults = await peopleSearchService.search({
          ...searchParams,
          first_name: '',
          last_name: word,
        });

        // Combine and dedupe
        const uniqueMap = new Map<string, SearchResult>();
        [...firstNameResults, ...lastNameResults].forEach((person) => {
          uniqueMap.set(person.AD_Username, person);
        });
        allResults = Array.from(uniqueMap.values());
      }

      onSearch(allResults);
    }
  };

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setGraduationYearRange(newValue as number[]);
    let values = newValue.toString().split(',');
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
    setSearchParams((sp) => ({
      ...sp,
      initial_year: '1889', //gordon est
      final_year: String(currentYear),
      graduation_year: '',
    }));
    setSwitchYearRange((prev) => !prev);
  };

  if (loading) {
    return <GordonLoader />;
  }

  const PeopleSearchCheckbox = (
    <Grid item xs={12} md={6} className={styles.search_field_list_people_text}>
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
    <Card className={styles.search_field_list_gordon_text}>
      <CardHeader
        title={searchPageTitle}
        titleTypographyProps={{ align: 'center' }}
        className="gc360_header"
      />
      <CardContent>
        {/* Search Section 1: General Info */}
        <Grid container spacing={2} direction="row" alignItems="center" justifyContent="center">
          <Grid item xs={12} onKeyDown={(e) => e.key === 'Enter' && search(searchParams)}>
            <SearchField
              name="full_name"
              value={fullNameInput}
              updateValue={(e) => {
                const fullName = e.target.value;
                setFullNameInput(fullName);
                // No need to debounce anymore
              }}
              Icon={Person}
            />
          </Grid>
          <Grid item xs={12} onKeyDown={(e) => e.key === 'Enter' && search(searchParams)}>
            <SearchField
              name="Search All Fields"
              value={searchText}
              updateValue={(e) => setSearchText(e.target.value)}
              Icon={MagnifyingGlass}
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
              expandIcon={<ExpandMore className={styles.search_field_list_accordion_arrow} />}
              id="more-search-options-header"
              aria-controls="more-search-options-controls"
            >
              <Typography
                variant="h6"
                align="center"
                className={styles.search_field_list_people_text}
              >
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
                    name="residence_hall"
                    value={searchParams.residence_hall}
                    updateValue={handleUpdate}
                    options={halls.sort()}
                    Icon={FaBuilding}
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
                    <Grid item container spacing={1}>
                      <Grid item xs={6} md={6.75}>
                        <SearchField
                          name="initial_year"
                          value={searchParams.initial_year}
                          updateValue={handleUpdate}
                          options={Array.from(
                            {
                              length: searchParams.final_year
                                ? Number(searchParams.final_year) - 1889 + 1
                                : currentYear - 1889 + 1,
                            },
                            (_, i) => ({
                              value: searchParams.final_year
                                ? (Number(searchParams.final_year) - i).toString()
                                : (currentYear - i).toString(),
                              label: searchParams.final_year
                                ? (Number(searchParams.final_year) - i).toString()
                                : (currentYear - i).toString(),
                            }),
                          ).reverse()}
                          Icon={FaCalendarTimes}
                          disabled={!searchParams.includeAlumni}
                          defaultDisabled
                          select
                        />
                      </Grid>
                      <Grid item xs={6} md={5.25}>
                        <SearchField
                          name="final_year"
                          value={searchParams.final_year}
                          updateValue={handleUpdate}
                          options={Array.from(
                            {
                              length: searchParams.initial_year
                                ? currentYear - Number(searchParams.initial_year) + 1
                                : currentYear - 1889 + 1,
                            },
                            (_, i) => ({
                              value: (currentYear - i).toString(),
                              label: (currentYear - i).toString(),
                            }),
                          ).reverse()}
                          disabled={!searchParams.includeAlumni}
                          defaultDisabled
                          select
                        />
                      </Grid>
                    </Grid>
                  )}
                  {(isAlumni || isFacStaff) && (
                    <FormControlLabel
                      control={<Switch onChange={handleSwitchChange} color="secondary" />}
                      label={switchYearRange ? 'Search by Year Range' : 'Search by Graduation Year'}
                      labelPlacement="end"
                      disabled={!searchParams.includeAlumni}
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
                    name="gender"
                    value={searchParams.gender}
                    updateValue={handleUpdate}
                    options={gender}
                    Icon={GenderIcon}
                    select
                  />
                  <SearchField
                    name="home_town"
                    value={searchParams.home_town}
                    updateValue={handleUpdate}
                    Icon={Home}
                  />
                  <SearchField
                    name="State/Provinces"
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

      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <CardActions>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              setSearchParams(initialSearchParams);
              setFullNameInput('');
              setSearchText('');
            }}
          >
            CLEAR
          </Button>
          {loadingSearch ? (
            <GordonLoader />
          ) : (
            <Button
              color="secondary"
              onClick={() => search(searchParams)}
              className={styles.search_field_list_search_width}
              variant="contained"
              disabled={!canSearch(searchParams)}
            >
              SEARCH
            </Button>
          )}
        </CardActions>
      </Grid>
    </Card>
  );
};

export default SearchFieldList;

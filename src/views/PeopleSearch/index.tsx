import {
  Card,
  CardContent,
  CardHeader,
  Fab,
  Grid,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import GordonOffline from 'components/GordonOffline';
import GordonUnauthorized from 'components/GordonUnauthorized';
import GordonLoader from 'components/Loader';
import { useNetworkStatus, useUser } from 'hooks';
import { useRef, useState } from 'react';
import { FaPrint } from 'react-icons/fa';
import ReactToPrint from 'react-to-print';
import { SearchResult } from 'services/peopleSearch';
import PeopleSearchResult from './components/PeopleSearchResult';
import SearchFieldList from './components/SearchFieldList';
import styles from './PeopleSearch.module.scss';

//Configuration constants
const NUM_NONLAZY_IMAGES = 20; //The number of results for which images will be fetched immediately

const PeopleSearch = () => {
  const [searchResults, setSearchResults] = useState<SearchResult[] | null>(null);
  const { profile, loading: loadingProfile } = useUser();
  const isOnline = useNetworkStatus();
  const printRef = useRef(null);
  const isLargeScreen = useMediaQuery('(min-width: 960px)');

  if (!isOnline) {
    return <GordonOffline feature="People Search" />;
  }

  if (loadingProfile) {
    return <GordonLoader />;
  }

  if (!profile) {
    return <GordonUnauthorized feature="People Search" />;
  }

  return (
    <Grid container justifyContent="center" spacing={2}>
      <Grid item xs={12} lg={10} xl={8}>
        <SearchFieldList onSearch={setSearchResults} />
      </Grid>
      {searchResults !== null && (
        <Grid item xs={12} lg={10} xl={8}>
          <Card ref={printRef}>
            <CardHeader variant="h2" className={styles.header} title="Results" />
            {searchResults.length ? (
              searchResults.map((person, index) => (
                <PeopleSearchResult
                  key={person.AD_Username || `${person.FirstName}${person.LastName}`}
                  person={person}
                  lazyLoadAvatar={index > NUM_NONLAZY_IMAGES}
                />
              ))
            ) : (
              <CardContent>
                <Typography variant="h5" align="center">
                  No results found.
                </Typography>
              </CardContent>
            )}
          </Card>
          {!profile.PersonType?.includes?.('stu') && (
            <ReactToPrint
              trigger={() => (
                <Fab
                  variant="extended"
                  color="primary"
                  style={{
                    position: 'fixed',
                    margin: 0,
                    bottom: 'min(5vw, 4rem)',
                    right: 'max(2rem, 5vw)',
                    zIndex: 1,
                  }}
                >
                  <FaPrint />
                  {isLargeScreen && <span>&nbsp;&nbsp;Print Results</span>}
                </Fab>
              )}
              content={() => printRef.current}
            />
          )}
        </Grid>
      )}
    </Grid>
  );
};

export default PeopleSearch;

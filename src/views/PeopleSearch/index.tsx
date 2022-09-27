import { Card, CardContent, Fab, Grid, Typography, useMediaQuery } from '@material-ui/core';
import GordonOffline from 'components/GordonOffline';
import GordonUnauthorized from 'components/GordonUnauthorized';
import GordonLoader from 'components/Loader';
import { useNetworkStatus, useUser } from 'hooks';
import { useRef, useState } from 'react';
import { FaPrint } from 'react-icons/fa';
import Media from 'react-media';
import ReactToPrint from 'react-to-print';
import { SearchResult } from 'services/goStalk';
import PeopleSearchHeader from './components/PeopleSearchHeader';
import PeopleSearchResult from './components/PeopleSearchResult';
import SearchFieldList from './components/SearchFields';

const printPeopleSearchButton = (
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
    <Media query="(min-width: 960px)">
      <span>&nbsp;&nbsp;Print Results</span>
    </Media>
  </Fab>
);

//Configuration constants
const NUM_NONLAZY_IMAGES = 20; //The number of results for which images will be fetched immediately

const PeopleSearch = () => {
  const [searchResults, setSearchResults] = useState<SearchResult[] | null>(null);
  const [displayLargeImage, setDisplayLargeImage] = useState(false);
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
        <SearchFieldList
          onSearch={setSearchResults}
          displayLargeImage={displayLargeImage}
          setDisplayLargeImage={setDisplayLargeImage}
        />
      </Grid>
      {searchResults !== null && (
        <Grid item xs={12} lg={10} xl={8}>
          <Card ref={printRef}>
            <PeopleSearchHeader displayLargeImage={displayLargeImage} />

            {searchResults.length ? (
              searchResults.map((person, index) => (
                <PeopleSearchResult
                  key={person.AD_Username || `${person.FirstName}${person.LastName}`}
                  person={person}
                  size={!isLargeScreen ? 'single' : displayLargeImage ? 'largeImages' : 'full'}
                  lazyImages={index > NUM_NONLAZY_IMAGES ? true : false}
                />
              ))
            ) : (
              <Card>
                <CardContent>
                  <Typography variant="h4" align="center">
                    No results found.
                  </Typography>
                </CardContent>
              </Card>
            )}
          </Card>
          {!profile.PersonType?.includes?.('stu') && (
            <ReactToPrint
              trigger={() => printPeopleSearchButton}
              content={() => printRef.current}
            />
          )}
        </Grid>
      )}
    </Grid>
  );
};

export default PeopleSearch;

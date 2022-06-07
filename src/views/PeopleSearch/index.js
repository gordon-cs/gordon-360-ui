import { Card, CardContent, Fab, Grid, Typography, withStyles } from '@material-ui/core';
import GordonOffline from 'components/GordonOffline';
import GordonUnauthorized from 'components/GordonUnauthorized';
import GordonLoader from 'components/Loader';
import { useNetworkStatus, useUser } from 'hooks';
import { useRef, useState } from 'react';
import { FaPrint } from 'react-icons/fa';
import Media from 'react-media';
import ReactToPrint from 'react-to-print';
import PeopleSearchHeader from './components/PeopleSearchHeader';
import PeopleSearchResult from './components/PeopleSearchResult';
import SearchFields from './components/SearchFields';

const styles2 = {
  printPeopleSearchButton: {
    position: 'fixed',
    margin: 0,
    bottom: 'min(5vw, 4rem)',
    right: 'max(2rem, 5vw)',
    zIndex: 1,
  },
};

const printPeopleSearchButton = (
  <Fab variant="extended" color="primary" style={styles2.printPeopleSearchButton}>
    <FaPrint />
    <Media query="(min-width: 960px)">
      <span>&nbsp;&nbsp;Print Results</span>
    </Media>
  </Fab>
);

//Configuration constants
const NUM_NONLAZY_IMAGES = 20; //The number of results for which images will be fetched immediately

const PeopleSearch = () => {
  const [searchResults, setSearchResults] = useState(null);
  const [displayLargeImage, setDisplayLargeImage] = useState(false);
  const { profile, loading: loadingProfile } = useUser();
  const isOnline = useNetworkStatus();
  const printRef = useRef();

  if (!isOnline) {
    return <GordonOffline feature="People Search" />;
  }

  if (loadingProfile) {
    return <GordonLoader />;
  }

  if (!profile) {
    return <GordonUnauthorized feature={'People Search'} />;
  }

  return (
    <Grid container justifyContent="center" spacing={6}>
      <Grid item xs={12} lg={10} xl={8}>
        <SearchFields
          onSearch={setSearchResults}
          displayLargeImage={displayLargeImage}
          setDisplayLargeImage={setDisplayLargeImage}
        />
        {searchResults !== null && (
          <>
            <br />
            <Card ref={printRef}>
              <PeopleSearchHeader displayLargeImage={displayLargeImage} />

              {searchResults.length ? (
                <Media query="(min-width: 960px)">
                  {(matches) =>
                    searchResults.map((person, index) => (
                      <PeopleSearchResult
                        key={person.AD_Username}
                        Person={person}
                        size={!matches ? 'single' : displayLargeImage ? 'largeImages' : 'full'}
                        lazyImages={index > NUM_NONLAZY_IMAGES ? true : false}
                      />
                    ))
                  }
                </Media>
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
                trigger={() => {
                  return printPeopleSearchButton;
                }}
                content={() => printRef.current}
              />
            )}
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default withStyles(styles2)(PeopleSearch);

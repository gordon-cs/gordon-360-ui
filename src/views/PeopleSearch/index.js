import { Card, CardContent, Fab, Grid, Typography, withStyles } from '@material-ui/core';
import GordonOffline from 'components/GordonOffline';
import GordonUnauthorized from 'components/GordonUnauthorized';
import GordonLoader from 'components/Loader';
import { useNetworkStatus, useUser } from 'hooks';
import { useCallback, useRef, useState } from 'react';
import { FaPrint } from 'react-icons/fa';
import Media from 'react-media';
import ReactToPrint from 'react-to-print';
import goStalk from 'services/goStalk';
import { gordonColors } from 'theme';
import PeopleSearchResult from './components/PeopleSearchResult';
import SearchFields from './components/SearchFields';

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

const PeopleSearch = () => {
  const { profile, loading: loadingProfile } = useUser();

  const [searchResults, setSearchResults] = useState([]); //Array of collected data to be created
  const [header, setHeader] = useState('');

  const printRef = useRef();
  const isOnline = useNetworkStatus();

  const search = useCallback(async (searchValues, displayLargeImage) => {
    setHeader(<GordonLoader />);
    setSearchResults([]);
    const results = await goStalk.search(...Object.values(searchValues));
    if (results.length === 0) {
      setHeader(null);
      setSearchResults(noResultsCard);
    } else {
      setHeader(
        <Media query="(min-width: 960px)">
          {(matches) =>
            matches && !displayLargeImage ? peopleSearchHeaderDesktop : peopleSearchHeaderMobile
          }
        </Media>,
      );

      setSearchResults(
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
  }, []);

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
        <SearchFields search={search} />
        <br />
        <Card ref={printRef}>
          {printPeopleSearchHeader}
          {header}
          {searchResults}
        </Card>
        {!profile.PersonType?.includes?.('stu') && (
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

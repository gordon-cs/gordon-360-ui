import { useIsAuthenticated } from '@azure/msal-react';
import { Button, CardHeader, Grid } from '@mui/material';
import EventList from './components/EventList';
import { useEffect, useState } from 'react';
import gordonEvent, { Event } from 'services/event';
import EventFilters from './components/EventFilters';
import { HashLink } from 'react-router-hash-link';

const Events = () => {
  const [unfilteredEvents, setUnfilteredEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true);

      const allEvents = isAuthenticated
        ? await gordonEvent.getAllEvents()
        : await gordonEvent.getAllGuestEvents();
      setUnfilteredEvents(allEvents);

      setLoading(false);
    };

    loadEvents();
  }, [isAuthenticated]);

  const content = <EventList loading={loading} events={filteredEvents} />;

  return (
    <Grid container justifyContent="center" spacing={6}>
      <Grid item xs={12} lg={10} xl={8}>
        <EventFilters
          unfilteredEvents={unfilteredEvents}
          onFilterEvents={setFilteredEvents}
          setLoading={setLoading}
        />
        <br />

        <Grid item xs={12}>
          {content}
        </Grid>
        <CardHeader
          xs={12}
          className="gc360_header"
          title={
            <div style={{ textAlign: 'center' }}>
              <p>To find other events, adjust your filters above.</p>
              <Button
                variant="contained"
                color="secondary"
                component={HashLink}
                to="#top"
                smooth
                id="bottom"
              >
                Jump to Top
              </Button>
            </div>
          }
          id="bottom"
        />
      </Grid>
    </Grid>
  );
};
export default Events;

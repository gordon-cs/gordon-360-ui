import 'add-to-calendar-button';

import { Box, Chip, Grid, Stack, Typography, alpha, useTheme } from '@mui/material';

// Icons
import EventIcon from '@mui/icons-material/Event';
import EventBusyIcon from '@mui/icons-material/EventBusy';

import { Event } from 'services/event';
import GordonLoader from 'components/Loader';

import EventItem from './components/EventItem';

// ---------------------------------------------------------
// EventList Component (Main Container)
// ---------------------------------------------------------

type EventListProps = {
  events?: Event[];
  loading: boolean;
};

const EventList = ({ events, loading }: EventListProps) => {
  const theme = useTheme();

  const noEvents = (
    <Grid item xs={12}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        py={6}
        sx={{ border: `1px dashed ${theme.palette.divider}`, borderRadius: 3 }}
      >
        <EventBusyIcon sx={{ fontSize: 40, color: theme.palette.action.disabled, mb: 1.5 }} />
        <Typography variant="subtitle1" color="text.secondary" fontWeight={600}>
          No events scheduled
        </Typography>
        <Typography variant="body2" color="text.disabled" mt={0.5}>
          Check back soon for upcoming events.
        </Typography>
      </Box>
    </Grid>
  );

  return (
    <Box className="gc360_event_list" sx={{ py: 1 }}>
      {/* Header */}
      <Stack
        direction="row"
        alignItems="flex-end"
        justifyContent="space-between"
        mb={2.5}
        pb={1.5}
        spacing={2}
      >
        <Box>
          <Typography
            variant="overline"
            color="primary.main"
            fontWeight={700}
            letterSpacing={1.2}
            display="block"
            lineHeight={1.4}
          >
            Campus Calendar
          </Typography>
          <Typography variant="h5" component="h2" fontWeight={800} color="text.primary">
            Upcoming Events
          </Typography>
        </Box>

        {!loading && events && events.length > 0 && (
          <Chip
            icon={<EventIcon fontSize="small" sx={{ color: 'primary.main !important' }} />}
            label={`${events.length} ${events.length === 1 ? 'event' : 'events'}`}
            size="small"
            sx={{
              bgcolor: alpha(theme.palette.primary.main, 0.1),
              color: 'primary.main',
              fontWeight: 700,
              mb: '2px',
            }}
          />
        )}
      </Stack>

      <Box
        sx={{
          height: 3,
          borderRadius: 1,
          mb: 2.5,
          mt: -2.5,
          background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${alpha(
            theme.palette.primary.main,
            0,
          )})`,
        }}
      />

      {loading ? (
        <Box display="flex" justifyContent="center" py={4}>
          <GordonLoader disableShrink />
        </Box>
      ) : (
        <Grid container spacing={1.5}>
          {!events || events.length < 1
            ? noEvents
            : events.map((event) => <EventItem event={event} key={event.Event_ID} />)}
        </Grid>
      )}
    </Box>
  );
};

export default EventList;

import { useState } from 'react';
import { format, isValid, parseISO } from 'date-fns';
import 'add-to-calendar-button';

import { Box, Card, Collapse, Divider, Grid, Stack, Typography, useTheme } from '@mui/material';

// Icons
import EventIcon from '@mui/icons-material/Event';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { Event } from 'services/event';
import { STORAGE_COLOR_PREFERENCE_KEY } from 'theme';
import styles from './EventItem.module.css';

// ---------------------------------------------------------
// Helper Functions
// ---------------------------------------------------------

const checkLightMode = (mode: string | null) => {
  if (mode === 'dark') return 'dark';
  if (mode === 'light') return 'light';
  if (mode === 'bodyScheme') return 'bodyScheme';
  return 'system';
};

/**
 * Pulls a { month, day } pair out of an event's StartDate for the calendar
 * badge. Falls back to null so callers can render a plain icon instead when
 * a start date isn't available or doesn't parse.
 */
const getDateParts = (startDate?: string) => {
  if (!startDate) return null;
  const parsed = parseISO(startDate);
  if (!isValid(parsed)) return null;
  return {
    month: format(parsed, 'MMM'),
    day: format(parsed, 'd'),
  };
};

// ---------------------------------------------------------
// DateBadge
// ---------------------------------------------------------

const DateBadge = ({ startDate }: { startDate?: string }) => {
  const parts = getDateParts(startDate);
  return (
    <Box
      aria-hidden="true"
      sx={{
        flexShrink: 0,
        width: 50,
        height: 50,
        borderRadius: 2,
        bgcolor: 'primary.main',
        color: 'primary.contrastText',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        lineHeight: 1,
      }}
    >
      {parts ? (
        <>
          <Typography
            sx={{
              fontSize: '0.65rem',
              fontWeight: 700,
              letterSpacing: 0.6,
              textTransform: 'uppercase',
            }}
          >
            {parts.month}
          </Typography>
          <Typography sx={{ fontSize: '1.2rem', fontWeight: 800, lineHeight: 1.15 }}>
            {parts.day}
          </Typography>
        </>
      ) : (
        <EventIcon fontSize="small" />
      )}
    </Box>
  );
};

// ---------------------------------------------------------
// EventItem Component (Individual Card)
// ---------------------------------------------------------

type EventItemProps = {
  event: Event;
};

const EventItem = ({ event }: EventItemProps) => {
  const [expanded, setExpanded] = useState(false);
  const theme = useTheme();

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card
        elevation={expanded ? 3 : 0}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 3,
          border: `1px solid ${theme.palette.divider}`,
          borderTop: `3px solid ${theme.palette.primary.main}`,
          transition: 'all 0.2s ease-in-out',
          overflow: expanded ? 'visible' : 'hidden', // Required for the calendar dropdown to not get clipped
          '&:hover': { boxShadow: theme.shadows[2] },
        }}
      >
        {/* Clickable Header Area */}
        <Box
          onClick={() => setExpanded(!expanded)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') setExpanded(!expanded);
          }}
          tabIndex={0}
          sx={{ p: 1.75, flexGrow: 1, cursor: 'pointer', outline: 'none' }}
        >
          <Stack direction="row" spacing={1.5} alignItems="flex-start">
            <DateBadge startDate={event.StartDate} />

            <Box flexGrow={1} minWidth={0}>
              <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                <Typography
                  variant="h6"
                  component="h3"
                  fontWeight={700}
                  fontSize="1.05rem"
                  lineHeight={1.25}
                  sx={{
                    display: '-webkit-box',
                    WebkitLineClamp: expanded ? 'none' : 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {event.title}
                </Typography>
                <ExpandMoreIcon
                  color="action"
                  sx={{
                    transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease',
                    ml: 1,
                    mt: '-2px',
                  }}
                />
              </Box>
              <Typography variant="body2" color="text.secondary" mt={0.25}>
                {event.date}
              </Typography>
            </Box>
          </Stack>

          <Stack spacing={0.75} mt={1.5} pl="0.25rem">
            <Stack direction="row" spacing={1} alignItems="center">
              <AccessTimeIcon fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                {event.timeRange}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="flex-start">
              <LocationOnIcon fontSize="small" color="action" sx={{ mt: '2px' }} />
              <Typography variant="body2" color="text.secondary">
                {event.location}
              </Typography>
            </Stack>
          </Stack>
        </Box>

        {/* Collapsible Details */}
        <Collapse
          in={expanded}
          timeout="auto"
          unmountOnExit
          // Force overflow visible after animation finishes so calendar dropdown isn't cut off
          onEntered={(node) => {
            node.style.overflow = 'visible';
          }}
          sx={{ overflow: expanded ? 'visible' : 'hidden' }}
        >
          <Divider sx={{ mx: 1.75 }} />
          <Box p={1.75} pt={1.5}>
            <Typography
              variant="body2"
              className={styles.descriptionText}
              sx={{ lineHeight: 1.6, m: 0, mb: 2 }}
            >
              {event.Description || 'No description available'}
            </Typography>

            {event.StartDate !== '' && event.EndDate !== '' && (
              <Box display="flex" justifyContent="center">
                <add-to-calendar-button
                  name={event.title}
                  options="'Google','Microsoft365|Gordon Outlook','Apple','Outlook.com|Outlook','MicrosoftTeams'"
                  location={event.location}
                  startDate={format(new Date(event.StartDate), 'yyyy-MM-dd')}
                  endDate={format(new Date(event.EndDate), 'yyyy-MM-dd')}
                  startTime={format(new Date(event.StartDate), 'HH:mm')}
                  endTime={format(new Date(event.EndDate), 'HH:mm')}
                  timeZone="currentBrowser"
                  label="Add to Calendar"
                  description={event.Description}
                  lightMode={checkLightMode(localStorage.getItem(STORAGE_COLOR_PREFERENCE_KEY))}
                ></add-to-calendar-button>
              </Box>
            )}
          </Box>
        </Collapse>
      </Card>
    </Grid>
  );
};

export default EventItem;

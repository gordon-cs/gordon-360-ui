import { Grid, ListItem, ListItemButton, Typography, Chip } from '@mui/material';
import styles from '../Listing.module.css';
import { Link } from 'react-router-dom';
import { isPast } from 'date-fns';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { Activity } from 'services/recim/activity';
import SportsFootballIcon from '@mui/icons-material/SportsFootball';
import SportsCricketIcon from '@mui/icons-material/SportsCricket';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import { standardDate, formatDateTimeRange } from '../../Helpers';

const activityTypeIconPair = [
  {
    type: 'League',
    icon: <SportsFootballIcon />,
  },
  {
    type: 'Tournament',
    icon: <SportsCricketIcon />,
  },
  {
    type: 'One Off',
    icon: <LocalActivityIcon />,
  },
];

type Props = {
  activity: Activity;
};

const ActivityListItem = ({ activity }: Props) => {
  const activeSeries = activity.Series.find((series) => isPast(Date.parse(series.StartDate)));
  const activeSeriesMessage =
    activeSeries && activeSeries.Name + ' until ' + standardDate(activeSeries.EndDate);

  if (!activity) return null;

  return (
    <ListItem key={activity.ID} className={styles.listingWrapper}>
      <ListItemButton
        component={Link}
        to={`/recim/activity/${activity.ID}`}
        className={styles.listing}
      >
        <Grid container columnSpacing={2} alignItems="center">
          <Grid item container direction="column" xs={12} sm={4} spacing={1}>
            <Grid item>
              <Typography className={styles.listingTitle}>{activity.Name}</Typography>
            </Grid>
            <Grid item>
              <Chip
                icon={activityTypeIconPair.find((type) => type.type === activity.Type)?.icon}
                label={activity.Type}
                color={'success'}
                className={
                  styles['activityType_' + activity.Type.toLowerCase().replace(/\s+/g, '')]
                }
                size="small"
              />
            </Grid>
          </Grid>
          <Grid item container xs={12} sm={7} direction="column" spacing={1}>
            {activity.StartDate && (
              <Grid item>
                <Typography sx={{ color: 'gray', fontWeight: 'bold' }}>
                  {activity.EndDate
                    ? formatDateTimeRange(activity.StartDate, activity.EndDate)
                    : standardDate(activity.StartDate) + ` - TBD`}
                </Typography>
              </Grid>
            )}
            <Grid item container columnSpacing={2}>
              {activity.RegistrationOpen && (
                <Grid item>
                  <Chip
                    icon={<EventAvailableIcon />}
                    label={'Registration Open'}
                    color={'success'}
                    size="small"
                  />
                </Grid>
              )}
              <Grid item>
                <Typography className={styles.listingSubtitle}>
                  {activity.RegistrationOpen
                    ? 'Registration closes ' + standardDate(activity.RegistrationEnd)
                    : activeSeriesMessage}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};

export default ActivityListItem;

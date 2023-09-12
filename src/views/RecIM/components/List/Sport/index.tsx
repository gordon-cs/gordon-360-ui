import styles from '../List.module.css';
import { Sport } from 'services/recim/sport';
import {
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import itemStyles from '../Listing/Listing.module.css';
import { useState } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

type Props = {
  sports: Sport[];
  confirmDelete: (sport: Sport) => void;
  editDetails: (sport: Sport) => void;
};

const SportList = ({ sports, confirmDelete, editDetails }: Props) =>
  !sports?.length ? (
    <Typography className={styles.secondaryText}>No sports to show.</Typography>
  ) : (
    <List>
      {sports.map((sport) => (
        <SportListItem sport={sport} confirmDelete={confirmDelete} editDetails={editDetails} />
      ))}
    </List>
  );

type ItemProps = Omit<Props, 'sports'> & { sport: Sport };

const SportListItem = ({ sport, confirmDelete, editDetails }: ItemProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const optionsOpen = Boolean(anchorEl);

  if (!sport) return null;

  return (
    <ListItem
      className={`${itemStyles.listingWrapper} ${itemStyles.listing}`}
      secondaryAction={
        <IconButton edge="end" onClick={(event) => setAnchorEl(event.currentTarget)}>
          <MoreHorizIcon />
        </IconButton>
      }
      sx={{ mb: '1rem' }}
    >
      <Grid container alignContent="center">
        <Grid item xs={5}>
          <ListItemText primary={sport.Name} secondary={sport.Description} />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2">
            <b>Rules: </b>
            {sport.Rules}
          </Typography>
        </Grid>
      </Grid>
      <Menu
        open={optionsOpen}
        onClose={() => setAnchorEl(null)}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem
          dense
          onClick={() => {
            editDetails(sport);
            setAnchorEl(null);
          }}
          divider
        >
          Edit details
        </MenuItem>
        <MenuItem
          dense
          onClick={() => {
            confirmDelete(sport);
            setAnchorEl(null);
          }}
          className={itemStyles.redButton}
        >
          Delete sport
        </MenuItem>
      </Menu>
    </ListItem>
  );
};

export default SportList;

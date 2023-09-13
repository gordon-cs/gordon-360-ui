import styles from '../List.module.css';
import listItemStyles from '../Listing/Listing.module.css';
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import { useState } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Surface } from 'services/recim/match';

type Props = {
  surfaces: Surface[];
  confirmDelete: (surface: Surface) => void;
  editDetails: (surface: Surface) => void;
};

const SurfaceList = ({ surfaces, confirmDelete, editDetails }: Props) =>
  !surfaces?.length ? (
    <Typography className={styles.secondaryText}>No surfaces to show.</Typography>
  ) : (
    <List dense>
      {surfaces.map((surface) => (
        <SurfaceListing surface={surface} confirmDelete={confirmDelete} editDetails={editDetails} />
      ))}
    </List>
  );

type ItemProps = Omit<Props, 'surfaces'> & { surface: Surface };

const SurfaceListing = ({ surface, confirmDelete, editDetails }: ItemProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const optionsOpen = Boolean(anchorEl);

  if (!surface) return null;

  return (
    <ListItem
      key={surface.ID}
      className={listItemStyles.listing}
      secondaryAction={
        <IconButton edge="end" onClick={(event) => setAnchorEl(event.currentTarget)}>
          <MoreHorizIcon />
        </IconButton>
      }
    >
      <ListItemText secondary={surface.Description}>{surface.Name}</ListItemText>
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
            editDetails(surface);
            setAnchorEl(null);
          }}
          divider
        >
          Edit details
        </MenuItem>
        <MenuItem
          dense
          onClick={() => {
            confirmDelete(surface);
            setAnchorEl(null);
          }}
          className={listItemStyles.redButton}
        >
          Delete surface
        </MenuItem>
      </Menu>
    </ListItem>
  );
};

export default SurfaceList;

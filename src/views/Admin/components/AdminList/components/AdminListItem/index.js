import { useState } from 'react';
import admin from 'services/admin';
import { gordonColors } from 'theme';

import { Button, ListItem, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import GordonDialogBox from 'components/GordonDialogBox';

const AdminListItem = ({ Admin, onRemove }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleConfirmedRemove = () => {
    // TODO: Detect removing self and display confirmation dialog
    admin.removeAdmin(Admin.Username);
    onRemove(Admin.Username);
  };

  const buttonStyle = {
    background: gordonColors.secondary.red,
    color: 'white',
  };

  return (
    <>
      <ListItem divider>
        <ListItemText primary={Admin.Username} />
        <ListItemSecondaryAction>
          <Button variant="contained" style={buttonStyle} onClick={() => setIsDialogOpen(true)}>
            Remove
          </Button>
        </ListItemSecondaryAction>
      </ListItem>

      <GordonDialogBox
        open={isDialogOpen}
        title="Remove Site Admin"
        buttonName="Remove"
        buttonClicked={handleConfirmedRemove}
        cancelButtonClicked={() => setIsDialogOpen(false)}
      >
        Are you sure you want to remove {Admin.Username} from being a site admin?
      </GordonDialogBox>
    </>
  );
};

export default AdminListItem;

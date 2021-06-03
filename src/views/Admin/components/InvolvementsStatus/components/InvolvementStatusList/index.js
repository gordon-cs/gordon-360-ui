import React from 'react';
import { Link } from 'react-router-dom';

import { ListItem, ListItemAvatar, Avatar, ListItemText } from '@material-ui/core';

const ListItemLink = (props) => <ListItem button component={Link} {...props} />;

const InvolvementStatusList = ({ Activity, session }) => {
  return (
    <ListItemLink
      className="gc360-link"
      to={`/activity/${session}/${Activity.ActivityCode}`}
      divider
    >
      <ListItemAvatar>
        <Avatar
          variant="rounded"
          src={Activity.ActivityImagePath}
          alt={Activity.ActivityDescription}
        />
      </ListItemAvatar>
      <ListItemText primary={Activity.ActivityDescription} />
    </ListItemLink>
  );
};

export default InvolvementStatusList;

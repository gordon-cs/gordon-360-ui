import { Link } from 'react-router-dom';
import { ListItem, ListItemAvatar, Avatar, ListItemText } from '@material-ui/core';

const ListItemLink = (props) => <ListItem button component={Link} {...props} />;

const InvolvementStatusListItem = ({ involvement, session }) => {
  return (
    <ListItemLink
      className="gc360_link"
      to={`/activity/${session}/${involvement.ActivityCode}`}
      divider
    >
      <ListItemAvatar>
        <Avatar
          variant="rounded"
          src={involvement.ActivityImagePath}
          alt={involvement.ActivityDescription}
        />
      </ListItemAvatar>
      <ListItemText primary={involvement.ActivityDescription} />
    </ListItemLink>
  );
};

export default InvolvementStatusListItem;

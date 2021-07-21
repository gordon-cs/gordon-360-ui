import React from 'react';
import LinkIcon from '@material-ui/icons/InsertLink';

import { ListItemIcon, ListItemText, ListSubheader, List, ListItem } from '@material-ui/core';

import CanvasIcon from './images/Canvas.ico';
import GordonIcon from './images/GordonFavicon.ico';
import GOIcon from './images/GoGordonFavicon.ico';
import MyGordonIcon from './images/MyGordonFavicon.ico';

function ListItemLink(props) {
  return <ListItem component="a" {...props} />;
}

const GordonLinksList = () => (
  <>
    <List
      component="nav"
      subheader={
        <ListSubheader component="div" disableSticky>
          Academics
        </ListSubheader>
      }
    >
      <ListItemLink
        target="_blank"
        rel="noopener"
        href="https://www.gordon.edu"
        className={styles.gc360-text-link}
      >
        <ListItemIcon>
          <img src={GordonIcon} alt="gordon" width="16" height="16" />
        </ListItemIcon>
        <ListItemText primary="Gordon College" />
      </ListItemLink>
      <ListItemLink
        target="_blank"
        rel="noopener"
        href="https://my.gordon.edu"
        className={styles.gc360-text-link}
      >
        <ListItemIcon>
          <img src={MyGordonIcon} alt="my gordon" width="16" height="16" />
        </ListItemIcon>
        <ListItemText primary="My Gordon" />
      </ListItemLink>
      <ListItemLink
        target="_blank"
        rel="noopener"
        href="https://go.gordon.edu"
        className={styles.gc360-text-link}
      >
        <ListItemIcon>
          <img src={GOIcon} alt="go gordon" width="16" height="16" />
        </ListItemIcon>
        <ListItemText primary="Go Gordon" />
      </ListItemLink>
      <ListItemLink
        target="_blank"
        rel="noopener"
        href="https://canvas.gordon.edu"
        className={styles.gc360-text-link}
      >
        <ListItemIcon>
          <img src={CanvasIcon} alt="canvas" width="16" height="16" />
        </ListItemIcon>
        <ListItemText primary="Canvas" />
      </ListItemLink>
    </List>
    <List component="nav" subheader={<ListSubheader component="div">Information</ListSubheader>}>
      <ListItemLink
        target="_blank"
        rel="noopener"
        href="http://athletics.gordon.edu/"
        className={styles.gc360-text-link}
      >
        <ListItemIcon>
          <LinkIcon style={{ fontSize: 16 }} />
        </ListItemIcon>
        <ListItemText primary="Fighting Scots" />
      </ListItemLink>
      <ListItemLink
        target="_blank"
        rel="noopener"
        href="http://stories.gordon.edu/"
        className={styles.gc360-text-link}
      >
        <ListItemIcon>
          <LinkIcon style={{ fontSize: 16 }} />
        </ListItemIcon>
        <ListItemText primary="The Bell" />
      </ListItemLink>
      <ListItemLink
        target="_blank"
        rel="noopener"
        href="https://www.gordon.edu/titleix"
        className={styles.gc360-text-link}
      >
        <ListItemIcon>
          <LinkIcon style={{ fontSize: 16 }} />
        </ListItemIcon>
        <ListItemText primary="Sexual Discrimination and Harassment" />
      </ListItemLink>
      <ListItemLink
        target="_blank"
        rel="noopener"
        href="https://www.gordon.edu/map"
        className={styles.gc360-text-link}
      >
        <ListItemIcon>
          <LinkIcon style={{ fontSize: 16 }} />
        </ListItemIcon>
        <ListItemText primary="Gordon College Maps" />
      </ListItemLink>
    </List>
  </>
);

export default GordonLinksList;

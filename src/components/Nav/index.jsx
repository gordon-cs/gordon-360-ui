import { Divider, Drawer } from '@mui/material';
import GordonNavAvatar from './components/NavAvatar';
import GordonNavLinks from './components/NavLinks';
import styles from './Nav.module.css';

const GordonNav = ({ onDrawerToggle, drawerOpen }) => (
  <Drawer
    variant="temporary"
    open={drawerOpen}
    classes={{
      paper: styles.gordon_nav_drawer,
    }}
    onClose={onDrawerToggle}
    ModalProps={{
      keepMounted: true, // Better open performance on mobile.
    }}
  >
    <div className={styles.nav_avatar}>
      <GordonNavAvatar onLinkClick={onDrawerToggle} />
      <Divider />
    </div>
    <GordonNavLinks onLinkClick={onDrawerToggle} />
  </Drawer>
);

export default GordonNav;

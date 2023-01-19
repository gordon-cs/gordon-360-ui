import { Divider, Drawer } from '@mui/material';
import GordonNavAvatar from './components/NavAvatar';
import GordonNavLinks from './components/NavLinks';
import styles from './Nav.module.css';

const GordonNav = ({ onDrawerToggle, drawerOpen }) => (
  <section className={styles.gordon_nav}>
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
      <GordonNavAvatar onLinkClick={onDrawerToggle} />
      <Divider />
      <GordonNavLinks onLinkClick={onDrawerToggle} />
    </Drawer>
  </section>
);

export default GordonNav;

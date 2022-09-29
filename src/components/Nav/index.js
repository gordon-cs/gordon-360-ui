import { Divider, Drawer, Hidden } from '@mui/material';
import GordonNavAvatar from './components/NavAvatar';
import GordonNavLinks from './components/NavLinks';
import styles from './Nav.module.css';

const GordonNav = ({ onDrawerToggle, drawerOpen }) => {
  const drawer = (
    <>
      <GordonNavAvatar onLinkClick={onDrawerToggle} />
      <Divider />
      <GordonNavLinks onLinkClick={onDrawerToggle} />
    </>
  );

  return (
    <section className={styles.gordon_nav}>
      <Hidden mdUp>
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
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden lgDown implementation="css">
        <Drawer
          variant="permanent"
          open
          classes={{
            paper: styles.drawer,
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
    </section>
  );
};

export default GordonNav;

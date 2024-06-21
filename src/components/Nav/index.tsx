import { Divider, Drawer } from '@mui/material';
import GordonNavAvatar from './components/NavAvatar';
import GordonNavLinks from './components/NavLinks';
import styles from './Nav.module.css';

type Props = {
  onDrawerToggle: () => void;
  drawerOpen: boolean;
};

const GordonNav = ({ onDrawerToggle, drawerOpen }: Props) => (
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
      <div className={styles.nav_avatar}>
        <GordonNavAvatar onLinkClick={onDrawerToggle} />
        <Divider />
      </div>
      <GordonNavLinks onLinkClick={onDrawerToggle} />
    </Drawer>
  </section>
);

export default GordonNav;

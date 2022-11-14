import { Fab } from '@mui/material';
import PostAddIcon from '@mui/icons-material/PostAdd';
import GordonLoader from 'components/Loader';
import GordonSnackbar from 'components/Snackbar';
import { useWindowSize } from 'hooks';
import { useEffect, useState } from 'react';
import contentManagementService from 'services/contentManagement';
import BannerList from '../BannerList';
import NewBannerDialog from '../NewBannerDialog';
import styles from './BannerAdmin.module.scss';

const BREAKPOINT_WIDTH = 1580; //The width at which the FAB no longer overlaps the banners

const BannerAdmin = () => {
  const [banners, setBanners] = useState([]);
  const [isNewBannerDialogOpen, setIsNewBannerDialogOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, text: '', severity: '' });
  const [loading, setLoading] = useState(true);
  const [width] = useWindowSize();

  useEffect(() => {
    const loadPage = async () => {
      setLoading(true);
      const existingBanners = await contentManagementService.getSlides();
      setBanners(existingBanners);
      setLoading(false);
    };

    loadPage();
  }, []);

  const createSnackbar = (text, severity) => {
    setSnackbar({ open: true, text, severity });
  };

  async function handleBannerDelete(ID) {
    let result = await contentManagementService.deleteSlide(ID);
    if (result === undefined) {
      createSnackbar('Banner Failed to Delete', 'error');
    } else {
      setBanners((b) => b.filter((banner) => banner.ID !== ID));
      createSnackbar('Banner Deleted Successfully', 'success');
    }
  }

  return (
    <>
      <Fab
        aria-label="add"
        color="primary"
        onClick={() => setIsNewBannerDialogOpen(true)}
        className={styles.fab}
        variant={width > BREAKPOINT_WIDTH ? 'extended' : 'circular'}
      >
        <PostAddIcon />
        {width > BREAKPOINT_WIDTH ? 'Add Banner' : ''}
      </Fab>

      <NewBannerDialog
        open={isNewBannerDialogOpen}
        setOpen={setIsNewBannerDialogOpen}
        createSnackbar={createSnackbar}
        addBanner={(newBanner) => setBanners((b) => [...b, newBanner])}
      />

      <GordonSnackbar
        {...snackbar}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      />

      {loading ? (
        <GordonLoader />
      ) : (
        <BannerList banners={banners} handleBannerDelete={handleBannerDelete} />
      )}
    </>
  );
};

export default BannerAdmin;

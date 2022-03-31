import { Fab } from '@material-ui/core';
import PostAddIcon from '@material-ui/icons/PostAdd';
import GordonLoader from 'components/Loader';
import GordonSnackbar from 'components/Snackbar';
import { useWindowSize } from 'hooks';
import { useEffect, useState } from 'react';
import cmsService from 'services/cms';
import BannerList from '../BannerList';
import NewBannerDialog from '../NewBannerDialog';

const BREAKPOINT_WIDTH = 1500;

const styles = {
  fab: {
    margin: 0,
    top: 'auto',
    right: 40,
    bottom: 40,
    left: 'auto',
    position: 'fixed',
    zIndex: 1,
  },
};

const BannerAdmin = () => {
  const [banners, setBanners] = useState([]);
  const [isNewBannerDialogOpen, setIsNewBannerDialogOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, text: '', severity: '' });
  const [loading, setLoading] = useState(true);
  const [width] = useWindowSize();

  useEffect(() => {
    const loadPage = async () => {
      setLoading(true);
      const existingBanners = await cmsService.getSlides();
      setBanners(existingBanners);
      setLoading(false);
    };

    loadPage();
  }, []);

  const createSnackbar = (text, severity) => {
    setSnackbar({ open: true, text, severity });
  };

  async function handleBannerDelete(ID) {
    let result = await cmsService.deleteSlide(ID);
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
        variant="extended"
        color="primary"
        onClick={() => setIsNewBannerDialogOpen(true)}
        style={styles.fab}
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

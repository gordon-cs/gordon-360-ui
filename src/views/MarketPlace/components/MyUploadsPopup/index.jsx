// MyUploadsPopup.jsx
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  IconButton,
  CircularProgress,
  AppBar,
  Toolbar,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import styles from '../../MarketPlace.module.scss';
import { useEffect, useState } from 'react';
import MarketPlacePopup from '../MarketPlacePopup';
import marketplaceService from 'services/marketplace';
import GordonLogo from '../../images/gordoncollegelogo.jpg';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const MyUploadsPopup = ({ open, onClose, backendURL, createSnackbar, onUpdateListing }) => {
  const [myListings, setMyListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const theme = useTheme();
  const isPhone = useMediaQuery(theme.breakpoints.down('sm'));

  const fetchMyListings = () => {
    setLoading(true);
    marketplaceService
      .getMyListings()
      .then(setMyListings)
      .catch(() => console.error('Failed to load user listings'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (!open) return;
    fetchMyListings();
  }, [open]);

  const handleUpdateListing = (updatedListing) => {
    // Optionally update local state immediately
    setMyListings((prevListings) =>
      prevListings.map((listing) => (listing.Id === updatedListing.Id ? updatedListing : listing)),
    );
    // Refetch to ensure fresh data
    fetchMyListings();

    if (selectedItem?.Id === updatedListing.Id) {
      setSelectedItem(updatedListing);
    }
    if (onUpdateListing) {
      onUpdateListing(updatedListing);
    }
  };

  const handleStatusChange = (id, newStatusId) => {
    if (newStatusId === 3) {
      // Assuming 3 means Deleted
      setMyListings((prev) => prev.filter((listing) => listing.Id !== id));
    } else {
      setMyListings((prev) =>
        prev.map((listing) =>
          listing.Id === id ? { ...listing, StatusId: newStatusId } : listing,
        ),
      );
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <AppBar position="static" sx={{ backgroundColor: 'primary.main', boxShadow: 'none' }}>
        <Toolbar>
          <Typography variant="h5">
            <Box component="span">My</Box>{' '}
            <Box component="span" sx={{ fontWeight: 'bold', color: 'warning.main' }}>
              Uploads
            </Box>
          </Typography>
        </Toolbar>
      </AppBar>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{ position: 'absolute', right: 8, top: 8, color: 'white' }}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent dividers>
        {loading ? (
          <Box display="flex" justifyContent="center" my={4}>
            <CircularProgress />
          </Box>
        ) : myListings.length === 0 ? (
          <Typography color="text.secondary">You haven't uploaded any listings yet.</Typography>
        ) : (
          <Grid container spacing={3} sx={{ mt: 1 }}>
            {myListings.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.Id}>
                <Card
                  onClick={() => {
                    setSelectedItem(item);
                    setPopupOpen(true);
                  }}
                  className={styles.card}
                  sx={{
                    borderRadius: '10px',
                    cursor: 'pointer',
                    backgroundColor: item.StatusId === 2 ? 'neutral.dark' : 'neutral.main',
                    position: 'relative',
                  }}
                >
                  {item.StatusId === 2 && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        color: 'white',
                        borderRadius: '20px',
                        padding: '2px 12px',
                        fontWeight: 'bold',
                        fontSize: '1.25rem',
                        zIndex: 10,
                      }}
                    >
                      SOLD
                    </Box>
                  )}
                  {item.ImagePaths?.length > 0 ? (
                    <CardMedia
                      component="div"
                      image={`${backendURL}${item.ImagePaths[0]}`}
                      title={item.Name}
                      sx={{
                        width: '100%',
                        paddingTop: '90%',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        display: { xs: 'block', sm: 'block' }, // visible on all devices
                      }}
                    />
                  ) : (
                    !isPhone && (
                      <CardMedia
                        component="div"
                        image={GordonLogo}
                        title="Placeholder"
                        sx={{
                          width: '100%',
                          paddingTop: '90%',
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }}
                      />
                    )
                  )}

                  <CardContent>
                    <Typography fontWeight="bold">{item.Name}</Typography>
                    <Typography variant="body2" fontStyle="italic">
                      {item.CategoryName !== 'Services'
                        ? `${item.ConditionName} • ${item.CategoryName}`
                        : item.CategoryName}
                    </Typography>

                    <Typography variant="body2">
                      {item.Price === 0 || item.Price === '' ? 'Free' : `$${item.Price}`}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </DialogContent>
      <MarketPlacePopup
        key={selectedItem?.Id} // This forces React to recreate the component when selectedItem changes
        open={popupOpen}
        item={selectedItem}
        onClose={() => {
          setPopupOpen(false);
          setSelectedItem(null);
        }}
        onStatusChange={handleStatusChange}
        onUpdateListing={handleUpdateListing}
        createSnackbar={createSnackbar}
      />
    </Dialog>
  );
};

export default MyUploadsPopup;

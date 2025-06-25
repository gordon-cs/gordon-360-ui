import {
  AppBar,
  Toolbar,
  Typography,
  Dialog,
  DialogContent,
  Grid,
  Box,
  Button,
  Menu,
  MenuItem,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useNetworkStatus from 'hooks/useNetworkStatus';
import { useEffect, useState } from 'react';
import { getProfileImage, getProfileInfo } from 'services/marketplace';
import Slider from 'react-slick';
import marketplaceService from 'services/marketplace';
import { msalInstance } from 'index';

const MarketPlacePopup = ({ open, item, onClose }) => {
  const isOnline = useNetworkStatus();
  const navigate = useNavigate();
  const [profileImg, setProfileImg] = useState(null);
  const [profileInfo, setProfileInfo] = useState(null);
  const backendURL = import.meta.env.VITE_API_URL;
  const currentUsername = msalInstance.getActiveAccount()?.username;
  const currentUsernameShort = currentUsername?.split('@')[0];

  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleMenuSelect = (option) => {
    console.log('User selected:', option);
    switch (option) {
      case 'Delete':
        handleDelete();
        break;
      case 'Mark as Sold':
        handleSold();
        break;
      case 'Unmark as Sold':
        handleSold();
        break;
    }
    // TODO: Add your logic for each option here (Delete/Edit/Report/Mark as Sold)
    handleMenuClose();
  };

  const handleDelete = async () => {
    try {
      if (!item?.Id) throw new Error('No item ID found');
      await marketplaceService.changeListingStatus(item.Id, 'Deleted');
      console.log('Item deleted successfully');
      onClose(); // Close the dialog after deletion
      // Optionally trigger a refresh or notify parent about deletion here
    } catch (error) {
      console.error('Failed to delete item:', error);
      // Optionally show user feedback on error
    }
  };

  const handleSold = async () => {
    console.log('Item Status: ', item.StatusId);
    try {
      if (!item?.Id) throw new Error('No item ID found');

      if (item.StatusId === 2) {
        await marketplaceService.changeListingStatus(item.Id, 'For Sale');
        console.log('Item marked as unsold successfully');
      } else {
        await marketplaceService.changeListingStatus(item.Id, 'Sold');
        console.log('Item marked as sold successfully');
      }

      onClose(); // Close the dialog after status change
    } catch (error) {
      console.error('Failed to change item status:', error);
      // Optionally show user feedback on error
    }
  };

  useEffect(() => {
    if (item?.PosterUsername) {
      // Fetch profile image as before
      getProfileImage(item.PosterUsername)
        .then((data) => {
          const img = data.pref
            ? `data:image/png;base64,${data.pref}`
            : data.def
              ? `data:image/png;base64,${data.def}`
              : null;

          setProfileImg(img);
        })
        .catch(() => setProfileImg(null));

      // Fetch profile info
      getProfileInfo(item.PosterUsername)
        .then((info) => {
          setProfileInfo(info);
        })
        .catch(() => setProfileInfo(null));
    }
  }, [item?.PosterUsername]);

  if (!item) return null;

  const images = (item.ImagePaths?.filter(Boolean) || []).map(
    (imgPath) => `${backendURL}${imgPath}`,
  );

  console.log('backendURL:', backendURL);
  console.log('raw ImagePaths:', item?.ImagePaths);
  console.log('full image URLs:', images);

  const NextArrow = ({ onClick }) => (
    <Box
      onClick={onClick}
      sx={{
        width: 20,
        height: 20,
        borderRadius: '50%',
        position: 'absolute',
        top: '50%',
        right: -20,
        transform: 'translateY(-50%)',
        cursor: 'pointer',
        zIndex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'secondary.main',
        fontSize: 50,
        userSelect: 'none',
      }}
    >
      ›
    </Box>
  );
  const PrevArrow = ({ onClick }) => (
    <Box
      onClick={onClick}
      sx={{
        width: 20,
        height: 20,
        borderRadius: '50%',
        position: 'absolute',
        top: '50%',
        left: -20,
        transform: 'translateY(-50%)',
        cursor: 'pointer',
        zIndex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'secondary.main',
        fontSize: 50,
        userSelect: 'none',
      }}
    >
      ‹
    </Box>
  );

  console.log('currentUsername:', currentUsername);
  console.log('item.PosterUsername:', item.PosterUsername);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <AppBar position="static" sx={{ backgroundColor: 'primary.main', boxShadow: 'none' }}>
        <Toolbar>
          <Typography variant="h5">
            <Box component="span" sx={{ fontWeight: 'bold', color: 'warning.main' }}>
              Gordon
            </Box>{' '}
            Marketplace
          </Typography>
        </Toolbar>
      </AppBar>
      <DialogContent dividers>
        <Grid container spacing={3}>
          {/* Left - Image and Seller */}
          <Grid item xs={12} md={6}>
            {images.length > 1 ? (
              <Slider
                nextArrow={<NextArrow />}
                prevArrow={<PrevArrow />}
                dots={images.length <= 12}
                infinite
                speed={500}
                slidesToShow={1}
                slidesToScroll={1}
                swipeToSlide={true}
                accessibility={true}
              >
                {images.map((img, index) => (
                  <Box
                    key={index}
                    sx={{
                      width: '100%',
                      height: 0,
                      paddingTop: '100%',
                      position: 'relative',
                      borderRadius: 2,
                      backgroundColor: '#000',
                    }}
                  >
                    <img
                      src={img}
                      alt={`${item.Name} - ${index + 1}`}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: 8,
                      }}
                    />
                  </Box>
                ))}
              </Slider>
            ) : (
              <Box
                sx={{
                  width: '100%',
                  height: 0,
                  paddingTop: '100%',
                  position: 'relative',
                  borderRadius: 2,
                  backgroundColor: '#000',
                }}
              >
                <img
                  src={images[0]}
                  alt={item.Name}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: 8,
                  }}
                />
              </Box>
            )}

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                mt: 2,
                cursor: 'pointer',
                width: '50%',
              }}
              onClick={() => {
                if (isOnline) {
                  navigate(`/profile/${item.PosterUsername}`);
                  onClose(); // optional: close dialog when navigating
                }
              }}
            >
              <img
                src={profileImg}
                alt={`${item.PosterUsername}'s profile`}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  objectFit: 'cover',
                  marginRight: 12,
                  cursor: 'pointer',
                }}
                onClick={() => {
                  if (isOnline) {
                    navigate(`/profile/${item.PosterUsername}`);
                    onClose();
                  }
                }}
              />

              <Typography fontWeight="bold">
                {profileInfo
                  ? `${profileInfo.NickName} ${profileInfo.LastName}`
                  : item.PosterUsername}
              </Typography>
            </Box>
          </Grid>

          {/* Right - Product Info */}
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <Typography variant="h6" fontWeight="bold">
                {item.Name}
              </Typography>
              <Typography sx={{ cursor: 'pointer', fontSize: '1.5rem' }} onClick={handleMenuClick}>
                ⋮
              </Typography>

              <Menu anchorEl={menuAnchorEl} open={Boolean(menuAnchorEl)} onClose={handleMenuClose}>
                {currentUsernameShort === item.PosterUsername ? (
                  <>
                    <MenuItem onClick={() => handleMenuSelect('Edit')}>Edit</MenuItem>
                    {item.StatusId === 2 ? (
                      <MenuItem onClick={() => handleMenuSelect('Mark as Sold')}>
                        Unmark as Sold
                      </MenuItem>
                    ) : (
                      <MenuItem onClick={() => handleMenuSelect('Mark as Sold')}>
                        Mark as Sold
                      </MenuItem>
                    )}
                    <MenuItem onClick={() => handleMenuSelect('Delete')} sx={{ color: 'red' }}>
                      Delete
                    </MenuItem>
                    <MenuItem onClick={() => handleMenuSelect('Report')} sx={{ color: 'red' }}>
                      Report
                    </MenuItem>
                  </>
                ) : (
                  <MenuItem onClick={() => handleMenuSelect('Report')} sx={{ color: 'red' }}>
                    Report
                  </MenuItem>
                )}
              </Menu>
            </Box>

            <Typography variant="h6" sx={{ my: 1 }}>
              ${item.Price}
            </Typography>

            <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
              {item.CategoryName}
            </Typography>

            <Typography variant="subtitle2" fontStyle="italic" gutterBottom>
              {item.ConditionName}
            </Typography>
            <Typography
              variant="body2"
              sx={{ mb: 3, mr: 3, whiteSpace: 'normal', wordBreak: 'break-word' }}
            >
              {item.Detail}
            </Typography>

            {item.StatusId === 2 ? (
              <Button
                variant="contained"
                sx={{ backgroundColor: 'primary.main' }}
                fullWidth
                disabled
              >
                Contact via Email
              </Button>
            ) : (
              <a
                href={`mailto:${item.PosterUsername}@gordon.edu?subject=${encodeURIComponent(
                  'Hello from the App',
                )}&body=${encodeURIComponent(
                  `Hi there,\n\nI wanted to reach out regarding ${item.Name}. Is it still available for purchase?`,
                )}`}
                style={{ textDecoration: 'none', display: 'block' }}
              >
                <Button variant="contained" sx={{ backgroundColor: 'primary.main' }} fullWidth>
                  Contact via Email
                </Button>
              </a>
            )}
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default MarketPlacePopup;

import {
  AppBar,
  Toolbar,
  Typography,
  Dialog,
  DialogContent,
  Divider,
  Grid,
  Box,
  Button,
  Menu,
  MenuItem,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import userService from 'services/user';
import ImageGallery from 'react-image-gallery';
import marketplaceService from 'services/marketplace';
import { msalInstance } from 'index';
import styles from '../../MarketPlace.module.scss';
import { AuthGroup } from 'services/auth';
import { useAuthGroups, useNetworkStatus } from 'hooks';
import ListingUploader from '../ListingUploader';
import { useMediaQuery } from '@mui/material';

const MarketPlacePopup = ({
  open,
  item,
  onClose,
  onStatusChange,
  onUpdateListing,
  onDelete,
  createSnackbar,
}) => {
  const isOnline = useNetworkStatus();
  const navigate = useNavigate();
  const [profileImg, setProfileImg] = useState(null);
  const [profileInfo, setProfileInfo] = useState(null);
  const backendURL = import.meta.env.VITE_API_URL;
  const currentUsername = msalInstance.getActiveAccount()?.username;
  const currentUsernameShort = currentUsername?.split('@')[0];
  const isSiteAdmin = useAuthGroups(AuthGroup.SiteAdmin);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const isPhone = useMediaQuery('(max-width:600px)');

  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleMenuClick = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  // Handler to open the edit dialog
  const openEditDialog = () => {
    setIsEditOpen(true);
    handleMenuClose();
  };

  // Handler to close the edit dialog
  const closeEditDialog = () => {
    setIsEditOpen(false);
  };

  const handleMenuSelect = (option) => {
    // eslint-disable-next-line default-case
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
      case 'Report':
        handleReport();
        break;
      case 'Edit':
        openEditDialog();
        break;
    }

    handleMenuClose();
  };

  const handleDelete = async () => {
    try {
      if (!item?.Id) throw new Error('No item ID found');
      await marketplaceService.changeListingStatus(item.Id, 'Deleted');
      onStatusChange(item.Id, 3);
      console.log('Item deleted successfully');
      onClose(); // Close the dialog after deletion
      createSnackbar('Listing deleted successfully!', 'success');
      if (onDelete) {
        onDelete(); // Refresh listings
      }
    } catch (error) {
      console.error('Failed to delete item:', error);
      createSnackbar('Failed to delete item', 'error');
    }
  };

  const handleSold = async () => {
    console.log('Item Status: ', item.StatusId);
    try {
      if (!item?.Id) throw new Error('No item ID found');

      if (item.StatusId === 2) {
        await marketplaceService.changeListingStatus(item.Id, 'For Sale');
        onStatusChange(item.Id, 1);
        console.log('Item marked as unsold successfully');
        createSnackbar('Listing unmarked as sold', 'info');
      } else {
        await marketplaceService.changeListingStatus(item.Id, 'Sold');
        onStatusChange(item.Id, 2);
        console.log('Item marked as sold successfully');
        createSnackbar('Listing marked as sold successfully!', 'success');
      }

      onClose(); // Close the dialog after status change
    } catch (error) {
      console.error('Failed to change item status:', error);
      createSnackbar('Failed to change listing status', 'error');
      // Optionally show user feedback on error
    }
  };

  const handleReport = () => {
    const subject = `Reported Gordon360 Marketplace Listing - "${item.Name}" (ID: ${item.Id})`;

    const body = `
Hello Student Life,

A marketplace post has been reported by a user as potentially inappropriate or against the college guidelines.

Reported Post Details:
- Title: ${item.Name}
- Post ID: ${item.Id}
- Posted by: ${item.PosterUsername}
- Reported by: ${currentUsername}

Please review the post at your earliest convenience.

Thank you
`.trim();

    const mailtoLink = `mailto:StudentLife@gordon.edu?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  useEffect(() => {
    if (item?.PosterUsername) {
      // Fetch profile image as before
      userService
        .getImage(item.PosterUsername)
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
      userService
        .getInformalName(item.PosterUsername)
        .then(setProfileInfo)
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

  return (
    <>
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
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8, color: 'white' }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Grid container spacing={3}>
            {/* Left - Image and Seller */}
            <Grid item xs={12} md={6} sx={{ position: 'relative' }}>
              {images.length > 0 && (
                <div className={styles.sliderWrapper}>
                  <ImageGallery
                    items={images.map((img, index) => ({
                      original: img,
                      thumbnail: img,
                      originalAlt: `${item.Name} - ${index + 1}`,
                      thumbnailAlt: `${item.Name} thumbnail - ${index + 1}`,
                    }))}
                    showThumbnails={!isPhone && images.length > 1}
                    renderCustomControls={
                      isPhone
                        ? () => (
                            <div
                              style={{
                                position: 'absolute',
                                bottom: 10,
                                left: '50%',
                                transform: 'translateX(-50%)',
                                color: 'primary.contrastText',
                                padding: '4px 8px',
                                borderRadius: 4,
                                fontSize: 14,
                                textAlign: 'center',
                                minWidth: 50,
                              }}
                            >
                              {currentIndex + 1} / {images.length}
                            </div>
                          )
                        : undefined
                    }
                    onSlide={setCurrentIndex}
                    showPlayButton={false}
                    showFullscreenButton={false}
                    autoPlay={false}
                    renderItem={(item) => (
                      <div className="image-gallery-image">
                        <img
                          src={item.original}
                          alt={item.originalAlt}
                          style={{
                            width: '100%',
                            maxHeight: 400,
                            minHeight: 400,
                            objectFit: 'contain',
                          }}
                        />
                      </div>
                    )}
                  />
                </div>
              )}

              <Divider
                variant="fullWidth"
                sx={{
                  my: 4,
                  borderColor: 'transparent',
                }}
              />

              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  margin: 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  mt: 4,
                  mb: 0,
                  cursor: 'pointer',
                  width: '50%',
                }}
                onClick={() => {
                  if (isOnline) {
                    navigate(`/profile/${item.PosterUsername}`);
                    onClose();
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
            <Grid item xs={12} md={isPhone || images.length > 0 ? 6 : 12}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <Typography variant="h6" fontWeight="bold">
                  {item.Name}
                </Typography>
                <Typography variant="subtitle1" fontStyle="italic">
                  {new Date(item.PostedAt).toDateString()}
                </Typography>

                <Typography
                  sx={{ cursor: 'pointer', fontSize: '1.5rem' }}
                  onClick={handleMenuClick}
                >
                  ⋮
                </Typography>

                <Menu
                  anchorEl={menuAnchorEl}
                  open={Boolean(menuAnchorEl)}
                  onClose={handleMenuClose}
                >
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
                  ) : isSiteAdmin ? (
                    <>
                      <MenuItem onClick={() => handleMenuSelect('Delete')} sx={{ color: 'red' }}>
                        Delete
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
                {item.Price === 0 ? 'Free' : `$${item.Price}`}
              </Typography>

              <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                {item.CategoryName}
              </Typography>

              {item.CategoryName !== 'Services' && (
                <Typography variant="subtitle2" sx={{ fontStyle: 'italic' }}>
                  {item.ConditionName}
                </Typography>
              )}
              <Divider sx={{ my: 2 }} />
              <Typography
                variant="body2"
                sx={{ mb: 3, mr: 3, whiteSpace: 'pre-line', wordBreak: 'break-word' }}
              >
                {item.Detail}
              </Typography>

              {currentUsernameShort === item.PosterUsername ? (
                <Button
                  variant="contained"
                  sx={{ backgroundColor: 'warning.main' }}
                  fullWidth
                  onClick={() => handleMenuSelect('Mark as Sold')}
                >
                  {item.StatusId === 2 ? 'Unmark as Sold' : 'Mark as Sold'}
                </Button>
              ) : item.StatusId === 2 ? (
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
                    `Gordon Marketplace: Interest in ${item.Name}`,
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
      {item && (
        <ListingUploader
          open={isEditOpen}
          onClose={closeEditDialog}
          isEdit={true}
          listing={item}
          onSubmit={(updatedListing) => {
            console.log('Received updated listing:', updatedListing);
            if (onUpdateListing) {
              onUpdateListing(updatedListing);
            }
            closeEditDialog();
            onClose();
          }}
          createSnackbar={createSnackbar}
        />
      )}
    </>
  );
};

export default MarketPlacePopup;

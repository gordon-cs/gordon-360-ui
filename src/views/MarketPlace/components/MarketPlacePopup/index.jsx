import {
  AppBar,
  Toolbar,
  Typography,
  Dialog,
  DialogContent,
  Grid,
  Box,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useNetworkStatus from 'hooks/useNetworkStatus';
import React, { useEffect, useState } from 'react';
import { getProfileImage, getProfileInfo } from 'services/marketplace';
import Slider from 'react-slick';

const MarketPlacePopup = ({ open, item, onClose }) => {
  const isOnline = useNetworkStatus();
  const navigate = useNavigate();
  const [profileImg, setProfileImg] = useState(null);
  const [profileInfo, setProfileInfo] = useState(null);

  useEffect(() => {
    if (item?.uploader) {
      // Fetch profile image as before
      getProfileImage(item.uploader)
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
      getProfileInfo(item.uploader)
        .then((info) => {
          setProfileInfo(info);
        })
        .catch(() => setProfileInfo(null));
    }
  }, [item?.uploader]);

  if (!item) return null;

  const images = [item.image1, item.image2, item.image3].filter(Boolean);

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
                dots
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
                      alt={`${item.title} - ${index + 1}`}
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
                  alt={item.title}
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
                  navigate(`/profile/${item.uploader}`);
                  onClose(); // optional: close dialog when navigating
                }
              }}
            >
              <img
                src={profileImg}
                alt={`${item.uploader}'s profile`}
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
                    navigate(`/profile/${item.uploader}`);
                    onClose();
                  }
                }}
              />

              <Typography fontWeight="bold">
                {profileInfo ? `${profileInfo.NickName} ${profileInfo.LastName}` : item.uploader}
              </Typography>
            </Box>
          </Grid>

          {/* Right - Product Info */}
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <Typography variant="h6" fontWeight="bold">
                {item.title}
              </Typography>
              <Typography sx={{ cursor: 'pointer', fontSize: '1.5rem' }}>⋮</Typography>
            </Box>

            <Typography variant="h6" sx={{ my: 1 }}>
              $ {item.cost}
            </Typography>

            <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
              Category
            </Typography>
            <Typography
              variant="body2"
              sx={{ mb: 3, mr: 3, whiteSpace: 'normal', wordBreak: 'break-word' }}
            >
              {item.desc}
            </Typography>

            <a
              href={`mailto:${item.uploader}@gordon.edu?subject=${encodeURIComponent(
                'Hello from the App',
              )}&body=${encodeURIComponent(
                `Hi there,\n\nI wanted to reach out regarding ${item.title}. Is it still available for purchase?`,
              )}`}
              style={{ textDecoration: 'none', display: 'block' }}
            >
              <Button variant="contained" sx={{ backgroundColor: 'primary.main' }} fullWidth>
                Contact via Email
              </Button>
            </a>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default MarketPlacePopup;

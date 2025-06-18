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

const MarketPlacePopup = ({ open, item, onClose }) => {
  const isOnline = useNetworkStatus();
  const navigate = useNavigate();

  if (!item) return null;

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
            <Box
              sx={{
                width: '100%',
                height: 0,
                paddingTop: '100%',
                backgroundColor: '#000000',
                borderRadius: 2,
                position: 'relative',
              }}
            >
              <img
                src={item.image}
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
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  backgroundColor: '#ddd',
                  mr: 1.5,
                }}
              />
              <Typography fontWeight="bold">{item.uploader}</Typography>
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
            <Typography variant="body2" sx={{ mb: 3 }}>
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

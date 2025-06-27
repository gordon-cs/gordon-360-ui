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
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import marketplaceService from 'services/marketplace';

const MyUploadsPopup = ({ open, onClose, backendURL }) => {
  const [myListings, setMyListings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;

    setLoading(true);
    marketplaceService
      .getMyListings()
      .then(setMyListings)
      .catch(() => console.error('Failed to load user listings'))
      .finally(() => setLoading(false));
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        My Uploads
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        {loading ? (
          <Box display="flex" justifyContent="center" my={4}>
            <CircularProgress />
          </Box>
        ) : myListings.length === 0 ? (
          <Typography color="text.secondary">You haven't uploaded any listings yet.</Typography>
        ) : (
          <Grid container spacing={3}>
            {myListings.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.Id}>
                <Card
                  sx={{
                    borderRadius: '10px',
                    cursor: 'pointer',
                    backgroundColor: item.StatusId === 2 ? 'neutral.dark' : 'background.paper',
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
                  <CardMedia
                    component="div"
                    image={`${backendURL}${item.ImagePaths?.[0]}`}
                    sx={{
                      width: '100%',
                      paddingTop: '90%',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                  <CardContent>
                    <Typography fontWeight="bold">{item.Name}</Typography>
                    <Typography variant="body2" fontStyle="italic">
                      {item.ConditionName} • {item.CategoryName}
                    </Typography>
                    <Typography variant="body2">
                      {item.Price === 0 || item.Price === '' ? 'Free' : `$ ${item.Price}`}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default MyUploadsPopup;

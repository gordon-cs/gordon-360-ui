import { useEffect, useState } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Dialog,
  DialogContent,
  DialogActions,
} from '@mui/material';
import styles from './MarketPlace.module.scss';
import DATA from './dummyPosts/dummyPosts';
import useNetworkStatus from 'hooks/useNetworkStatus';
import { useNavigate } from 'react-router-dom';
import MarketPlacePopup from './components/MarketPlacePopup';
import ListingUploader from './components/ListingUploader';

const categories = ['All', 'Books', 'Clothing', 'Electronics'];
const prices = ['All', 'Low to High', 'High to Low'];
const sorts = ['Newest', 'Oldest'];

const Marketplace = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [uploaderOpen, setUploaderOpen] = useState(false);

  const handleCardClick = (item) => {
    setSelectedItem(item);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedItem(null);
  };

  const isOnline = useNetworkStatus();
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box
        sx={{
          backgroundColor: 'transparent',
          minHeight: '100vh',
          p: 2,
          width: '70em',

          justifyContent: 'center',
        }}
      >
        <Box sx={{ backgroundColor: 'neutral.light', borderRadius: '10px' }}>
          {/* Header */}
          <AppBar
            position="static"
            sx={{
              backgroundColor: 'primary.main',
              borderTopLeftRadius: '10px',
              borderTopRightRadius: '10px',
              boxShadow: 'none',
            }}
          >
            <Toolbar>
              <Typography variant="h5">
                <Box component="span" sx={{ fontWeight: 'bold', color: 'warning.main' }}>
                  Gordon
                </Box>{' '}
                Marketplace
              </Typography>
            </Toolbar>
          </AppBar>

          {/* Search and Filters */}
          <Box sx={{ p: 2, mt: 2 }}>
            <TextField variant="outlined" placeholder="Search" fullWidth sx={{ mb: 2 }} />

            <Box
              sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'space-between' }}
            >
              <FormControl className={`gc360_header ${styles.form}`}>
                <InputLabel>Category</InputLabel>
                <Select label="Category">
                  {categories.map((cat) => (
                    <MenuItem key={cat} value={cat}>
                      {cat}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl className={`gc360_header ${styles.form}`}>
                <InputLabel>Price</InputLabel>
                <Select label="Price">
                  {prices.map((price) => (
                    <MenuItem key={price} value={price}>
                      {price}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl className={`gc360_header ${styles.form}`}>
                <InputLabel>Sort</InputLabel>
                <Select label="Sort">
                  {sorts.map((sort) => (
                    <MenuItem key={sort} value={sort}>
                      {sort}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Button
                variant="contained"
                sx={{ borderRadius: '10px', margin: '5px' }}
                onClick={() => setUploaderOpen(true)}
              >
                New Listing
              </Button>
            </Box>
          </Box>
        </Box>

        {/* Listings */}
        <Box sx={{ mt: 3, p: 2, backgroundColor: 'neutral.light', borderRadius: 1 }}>
          <Grid container spacing={3}>
            {DATA.map((item) => (
              <Grid item xs={6} sm={6} md={3} lg={3} key={item}>
                <Card
                  variant="outlined"
                  className={styles.card}
                  onClick={() => handleCardClick(item)}
                  sx={{ cursor: 'pointer' }}
                >
                  <CardMedia
                    component="div"
                    image={item.image}
                    title={item.title}
                    sx={{
                      width: '100%',
                      paddingTop: '90%', // 1:1 aspect ratio
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                  <CardContent>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {item.title}
                    </Typography>
                    <Typography variant="subtitle2" sx={{ fontStyle: 'italic' }}>
                      {item.condition}
                    </Typography>
                    <Typography variant="body2">$ {item.cost}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
      {/** Dialog for when a card is clicked */}
      <MarketPlacePopup open={dialogOpen} item={selectedItem} onClose={handleDialogClose} />
      {/** Dialog for uploading a post */}
      <ListingUploader open={uploaderOpen} onClose={() => setUploaderOpen(false)} />
    </Box>
  );
};

export default Marketplace;

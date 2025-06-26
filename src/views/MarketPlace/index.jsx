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
  Checkbox,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormControlLabel,
} from '@mui/material';
import styles from './MarketPlace.module.scss';
import DATA from './dummyPosts/dummyPosts';
import useNetworkStatus from 'hooks/useNetworkStatus';
import { useNavigate } from 'react-router-dom';
import MarketPlacePopup from './components/MarketPlacePopup';
import ListingUploader from './components/ListingUploader';
import marketplaceService from 'services/marketplace';

const sorts = ['Date', 'Price', 'Title'];
const order = ['Ascending', 'Descending'];

const Marketplace = () => {
  const [listings, setListings] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [error, setError] = useState(null);
  const backendURL = import.meta.env.VITE_API_URL;

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');
  const [categoryId, setCategoryId] = useState(undefined); // number or undefined
  const [statusId, setStatusId] = useState(1); // e.g., 2 for Sold or undefined
  const [minPrice, setMinPrice] = useState(undefined);
  const [maxPrice, setMaxPrice] = useState(undefined);
  const [sortBy, setSortBy] = useState('Date');
  const [desc, setDesc] = useState(false);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [uploaderOpen, setUploaderOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [conditions, setConditions] = useState([]);

  const updateListingStatus = (id, newStatusId) => {
    setListings((prevListings) =>
      prevListings.map((listing) =>
        listing.Id === id ? { ...listing, StatusId: newStatusId } : listing,
      ),
    );
  };

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

  useEffect(() => {
    marketplaceService
      .getCategories()
      .then(setCategories)
      .catch(() => console.error('Failed to load categories'));

    marketplaceService
      .getConditions()
      .then(setConditions)
      .catch(() => console.error('Failed to load conditions'));
  }, []);

  useEffect(() => {
    setLoading(true);
    marketplaceService
      .getFilteredListings(categoryId, statusId, minPrice, maxPrice, search, sortBy, desc)
      .then((data) => {
        setListings(data);
        setError(null);
      })
      .catch(() => {
        setError('Failed to load marketplace listings');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [categoryId, statusId, minPrice, maxPrice, search, sortBy, desc]);

  console.log('backendURL:', backendURL);

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
        <Box
          sx={{
            backgroundColor: 'neutral.light',
            borderRadius: '10px',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', // Add this
          }}
        >
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
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={9}>
                <TextField
                  variant="outlined"
                  placeholder="Search"
                  fullWidth
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={3} display="flex" alignItems="center">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={statusId === 1}
                      onChange={(e) => {
                        setStatusId(e.target.checked ? 1 : undefined);
                      }}
                    />
                  }
                  label="Filter Out Sold Items"
                  sx={{ color: 'text.secondary' }} // change 'red' to any valid color
                />
              </Grid>
            </Grid>

            <Box
              sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'space-between' }}
            >
              <FormControl className={`gc360_header ${styles.form}`}>
                <InputLabel>Category</InputLabel>
                <Select
                  label="Category"
                  value={categoryId || ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    setCategoryId(val === '' ? undefined : Number(val));
                  }}
                >
                  <MenuItem
                    value=""
                    sx={{
                      '&:hover': {
                        backgroundColor: 'primary.50', // adjust color as needed
                      },
                      '&.Mui-selected': {
                        backgroundColor: 'primary.50', // selected color
                      },
                      '&.Mui-selected:hover': {
                        backgroundColor: 'primary.50', // selected+hover color
                      },
                    }}
                  >
                    All
                  </MenuItem>
                  {categories.map((cat) => (
                    <MenuItem
                      key={cat.Id}
                      value={cat.Id}
                      sx={{
                        '&:hover': {
                          backgroundColor: 'primary.50', // adjust color as needed
                        },
                        '&.Mui-selected': {
                          backgroundColor: 'primary.50', // selected color
                        },
                        '&.Mui-selected:hover': {
                          backgroundColor: 'primary.50', // selected+hover color
                        },
                      }}
                    >
                      {cat.CategoryName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl className={`gc360_header ${styles.form}`}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      type="number"
                      inputProps={{ step: 1, min: 0 }}
                      variant="outlined"
                      placeholder="Min Price"
                      fullWidth
                      value={minPrice ?? ''}
                      onChange={(e) =>
                        setMinPrice(e.target.value === '' ? undefined : Number(e.target.value))
                      }
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      type="number"
                      inputProps={{ step: 1, min: 0 }}
                      variant="outlined"
                      placeholder="Max Price"
                      fullWidth
                      value={maxPrice ?? ''}
                      onChange={(e) =>
                        setMaxPrice(e.target.value === '' ? undefined : Number(e.target.value))
                      }
                    />
                  </Grid>
                </Grid>
              </FormControl>

              <FormControl className={`gc360_header ${styles.form}`}>
                <InputLabel>Sort</InputLabel>
                <Select
                  label="Sort"
                  value={sortBy || ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    setSortBy(val === '' ? undefined : val);
                  }}
                >
                  {sorts.map((sort) => (
                    <MenuItem
                      key={sort}
                      value={sort}
                      sx={{
                        '&:hover': {
                          backgroundColor: 'primary.50', // adjust color as needed
                        },
                        '&.Mui-selected': {
                          backgroundColor: 'primary.50', // selected color
                        },
                        '&.Mui-selected:hover': {
                          backgroundColor: 'primary.50', // selected+hover color
                        },
                      }}
                    >
                      {sort}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl className={`gc360_header ${styles.form}`}>
                <InputLabel>Order</InputLabel>
                <Select
                  label="Order"
                  value={desc ? 'Descending' : 'Ascending'}
                  onChange={(e) => {
                    setDesc(e.target.value === 'Descending');
                  }}
                >
                  {order.map((o) => (
                    <MenuItem
                      key={o}
                      value={o}
                      sx={{
                        '&:hover': {
                          backgroundColor: 'primary.50', // adjust color as needed
                        },
                        '&.Mui-selected': {
                          backgroundColor: 'primary.50', // selected color
                        },
                        '&.Mui-selected:hover': {
                          backgroundColor: 'primary.50', // selected+hover color
                        },
                      }}
                    >
                      {o}
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
        <Box
          sx={{
            mt: 3,
            p: 2,
            backgroundColor: 'neutral.light',
            borderRadius: '10px',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Grid container spacing={3}>
            {loading && <Typography color="text.secondary">Loading listings...</Typography>}
            {error && <Typography color="error">{error}</Typography>}
            {!loading &&
              !error &&
              listings.map((item) => (
                <Grid item xs={6} sm={6} md={3} lg={3} key={item.Id}>
                  <Card
                    variant="outlined"
                    className={styles.card}
                    onClick={() => handleCardClick(item)}
                    sx={{
                      cursor: 'pointer',
                      borderRadius: '10px',
                      backgroundColor: item.StatusId === 2 ? 'neutral.dark' : 'transparent',
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
                          pointerEvents: 'none',
                          userSelect: 'none',
                        }}
                      >
                        SOLD
                      </Box>
                    )}
                    <CardMedia
                      component="div"
                      image={`${backendURL}${item.ImagePaths?.[0]}`}
                      title={item.Name}
                      sx={{
                        width: '100%',
                        paddingTop: '90%', // 1:1 aspect ratio
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    />
                    <CardContent>
                      <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                        {/* Left column */}
                        <Box>
                          <Typography variant="subtitle1" fontWeight="bold">
                            {item.Name}
                          </Typography>
                          <Typography variant="subtitle2" sx={{ fontStyle: 'italic' }}>
                            {item.ConditionName}
                          </Typography>
                          <Typography variant="body2">
                            {item.Price === 0 || item.Price === '' ? 'Free' : `$ ${item.Price}`}
                          </Typography>
                        </Box>

                        {/* Right column */}
                        <Typography
                          variant="subtitle2"
                          sx={{
                            fontStyle: 'italic',
                            maxWidth: '50%',
                            textAlign: 'right',
                            wordBreak: 'normal',
                          }}
                        >
                          {item.CategoryName}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Box>
      </Box>
      {/** Dialog for when a card is clicked */}
      <MarketPlacePopup
        open={dialogOpen}
        item={selectedItem}
        onClose={handleDialogClose}
        onStatusChange={updateListingStatus}
      />

      {/** Dialog for uploading a post */}
      <ListingUploader open={uploaderOpen} onClose={() => setUploaderOpen(false)} />
    </Box>
  );
};

export default Marketplace;

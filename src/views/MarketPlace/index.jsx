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
  Pagination,
  IconButton,
} from '@mui/material';
import CategoryEditor from './components/CategoryEditor';
import ConditionEditor from './components/ConditionEditor';
import styles from './MarketPlace.module.scss';
import MarketPlacePopup from './components/MarketPlacePopup';
import ListingUploader from './components/ListingUploader';
import MyUploadsPopup from './components/MyUploadsPopup';
import marketplaceService from 'services/marketplace';
import GordonSnackbar from 'components/Snackbar';
import { AuthGroup } from 'services/auth';
import { useAuthGroups, useNetworkStatus } from 'hooks';
// import DATA from './dummyPosts/dummyPosts';

const sorts = ['Date', 'Price', 'Title'];
const order = ['Ascending', 'Descending'];

/**
 * Marketplace component renders the main UI for browsing and managing marketplace listings.
 *
 * Features:
 * - Displays all marketplace listings in a responsive grid layout.
 * - Allows filtering listings by search term, category, price range, and status (e.g., for sale).
 * - Provides sorting options (e.g., by date, price, or title) and sort order.
 * - Includes pagination for navigating large sets of results.
 * - Enables uploading new listings via a modal dialog.
 * - Lets users view and manage their own uploads through a separate modal.
 * - Opens a detailed popup when clicking on a listing card to view more information or update status.
 *
 * Uses:
 * - `@mui/material` components for layout and UI.
 * - `marketplaceService` for fetching and updating listing data.
 * - Custom components: `MarketPlacePopup`, `ListingUploader`, `MyUploadsPopup`.
 *
 * @component
 * @returns  The rendered Marketplace page.
 */

const Marketplace = () => {
  const [openCategoryEditor, setOpenCategoryEditor] = useState(false);
  const [openConditionEditor, setOpenConditionEditor] = useState(false);
  const [listings, setListings] = useState([]);
  const [myUploadsOpen, setMyUploadsOpen] = useState(false);
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
  const [desc, setDesc] = useState(true);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = 20;
  const [dialogOpen, setDialogOpen] = useState(false);
  const [uploaderOpen, setUploaderOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [conditions, setConditions] = useState([]);
  const isSiteAdmin = useAuthGroups(AuthGroup.SiteAdmin);

  const updateListingStatus = (id, newStatusId) => {
    setListings((prevListings) =>
      prevListings.map((listing) =>
        listing.Id === id ? { ...listing, StatusId: newStatusId } : listing,
      ),
    );
  };

  const handleUpdateListing = (updatedListing) => {
    setListings((prevListings) =>
      prevListings.map((listing) => (listing.Id === updatedListing.Id ? updatedListing : listing)),
    );

    if (selectedItem?.Id === updatedListing.Id) {
      setSelectedItem(updatedListing);
    }
  };

  const [snackbar, setSnackbar] = useState({
    message: '',
    severity: '',
    open: false,
  });

  const createSnackbar = (message, severity) => {
    setSnackbar({ message, severity, open: true });
  };

  const handleNewListing = (newListing) => {
    // Add new listing to the current list, could be prepend or append as needed
    setListings((prev) => [newListing, ...prev]);

    // Close uploader modal
    setUploaderOpen(false);
  };

  const handleCardClick = (item) => {
    setSelectedItem(item);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedItem(null);
  };

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

  const fetchListings = () => {
    setLoading(true);
    return Promise.all([
      marketplaceService.getFilteredListingsCount(categoryId, statusId, minPrice, maxPrice, search),
      marketplaceService.getFilteredListings(
        categoryId,
        statusId,
        minPrice,
        maxPrice,
        search,
        sortBy,
        desc,
        page,
        pageSize,
      ),
    ])
      .then(([count, listings]) => {
        setTotalCount(count);
        setListings(listings);
        setError(null);
      })
      .catch(() => {
        setError('Failed to load marketplace listings');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchListings();
  }, [categoryId, statusId, minPrice, maxPrice, search, sortBy, desc, page]);

  console.log('backendURL:', backendURL);
  console.log('Props passed to ListingUploader:', { createSnackbar });

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
                      backgroundColor: 'transparent',
                      '&:hover, &.Mui-selected, &.Mui-selected:hover': {
                        backgroundColor: 'primary.50',
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
                        backgroundColor: 'transparent',
                        '&:hover, &.Mui-selected, &.Mui-selected:hover': {
                          backgroundColor: 'primary.50',
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
                        backgroundColor: 'transparent',
                        '&:hover, &.Mui-selected, &.Mui-selected:hover': {
                          backgroundColor: 'primary.50',
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
                        backgroundColor: 'transparent',
                        '&:hover, &.Mui-selected, &.Mui-selected:hover': {
                          backgroundColor: 'primary.50',
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
              {isSiteAdmin && (
                <>
                  <Button
                    variant="contained"
                    sx={{ borderRadius: '10px', margin: '5px' }}
                    onClick={() => setOpenCategoryEditor(true)}
                  >
                    Edit Categories
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ borderRadius: '10px', margin: '5px' }}
                    onClick={() => setOpenConditionEditor(true)}
                  >
                    Edit Conditions
                  </Button>
                </>
              )}
              <Button
                variant="contained"
                sx={{ borderRadius: '10px', margin: '5px' }}
                onClick={() => setMyUploadsOpen(true)}
              >
                My Uploads
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
                    variant="elevation"
                    className={styles.card}
                    onClick={() => handleCardClick(item)}
                    sx={{
                      cursor: 'pointer',
                      borderRadius: '10px',
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
                          pointerEvents: 'none',
                          userSelect: 'none',
                        }}
                      >
                        SOLD
                      </Box>
                    )}
                    {item.ImagePaths?.length > 0 && (
                      <CardMedia
                        component="div"
                        image={`${backendURL}${item.ImagePaths[0]}`}
                        title={item.Name}
                        sx={{
                          width: '100%',
                          paddingTop: '90%',
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }}
                      />
                    )}

                    <CardContent>
                      <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                        {/* Left column */}
                        <Box>
                          <Typography variant="subtitle1" fontWeight="bold">
                            {item.Name}
                          </Typography>
                          {item.CategoryName !== 'Services' && (
                            <Typography variant="subtitle2" sx={{ fontStyle: 'italic' }}>
                              {item.ConditionName}
                            </Typography>
                          )}
                          <Typography variant="body2">
                            {item.Price === 0 || item.Price === '' ? 'Free' : `$${item.Price}`}
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
                            display: { xs: 'none', sm: 'block' }, // hides on mobile
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
          {!loading && !error && (
            <Box display="flex" justifyContent="center" mt={3}>
              <Pagination
                count={Math.ceil(totalCount / pageSize)}
                page={page}
                onChange={(_, value) => setPage(value)}
                color="primary"
              />
            </Box>
          )}
        </Box>
      </Box>

      {/** Dialog for when a card is clicked */}
      <MarketPlacePopup
        open={dialogOpen}
        item={selectedItem}
        onClose={handleDialogClose}
        onStatusChange={updateListingStatus}
        onUpdateListing={(updatedListing) => {
          handleUpdateListing(updatedListing);
          fetchListings(); // Refresh listings after update
        }}
        onDelete={() => {
          fetchListings(); // Refresh listings after delete
        }}
        createSnackbar={createSnackbar}
      />

      {/** Dialog for viewing and editing my uploads */}
      <MyUploadsPopup
        open={myUploadsOpen}
        onClose={() => setMyUploadsOpen(false)}
        backendURL={backendURL}
        createSnackbar={createSnackbar}
        onUpdateListing={handleUpdateListing}
      />

      {/** Dialog for uploading a post */}
      <ListingUploader
        open={uploaderOpen}
        onClose={() => setUploaderOpen(false)}
        onSubmit={handleNewListing}
        createSnackbar={createSnackbar}
      />

      {/** Snackbar present for 360 */}
      <GordonSnackbar
        open={snackbar.open}
        text={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      />

      {/** Dialog for Editing the Categories (SiteAdmin only) */}
      <CategoryEditor
        open={openCategoryEditor}
        onClose={() => setOpenCategoryEditor(false)}
        categories={categories}
        setCategories={setCategories}
        createSnackbar={createSnackbar}
      />

      {/** Dialog for Editing the Conditions (SiteAdmin only) */}
      <ConditionEditor
        open={openConditionEditor}
        onClose={() => setOpenConditionEditor(false)}
        conditions={conditions}
        setConditions={setConditions}
        createSnackbar={createSnackbar}
      />
    </Box>
  );
};

export default Marketplace;

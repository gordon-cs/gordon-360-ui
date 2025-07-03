import { useState, useEffect } from 'react';
import heic2any from 'heic2any';
import {
  Dialog,
  AppBar,
  Toolbar,
  Typography,
  DialogContent,
  TextField,
  Box,
  Button,
  Grid,
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
} from '@mui/material';
import { InputAdornment } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import marketplaceService from 'services/marketplace';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import CloseIcon from '@mui/icons-material/Close';
import GordonLoader from 'components/Loader';

const ListingUploader = ({
  open,
  onClose,
  isEdit = false,
  listing = null,
  onSubmit,
  createSnackbar,
}) => {
  const theme = useTheme();
  const [isUploadingImages, setIsUploadingImages] = useState(false);
  const isDark = theme.palette.mode === 'dark';
  const [selectedCondition, setSelectedCondition] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [uploadedImages, setUploadedImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [categories, setCategories] = useState([]);
  const [conditions, setConditions] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isSubmitDisabled =
    !selectedCategory ||
    !agreed ||
    !productName.trim() ||
    !description.trim() ||
    (selectedCategory !== 'Services' && !selectedCondition);

  // !isEdit;

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      const selectedCategoryObj = categories.find((cat) => cat.CategoryName === selectedCategory);
      const selectedConditionObj = conditions.find(
        (cond) => cond.ConditionName === selectedCondition,
      );

      const listingData = {
        Name: productName.trim(),
        Detail: description,
        Price: price ? parseFloat(price) : 0,
        CategoryId: selectedCategoryObj ? selectedCategoryObj.Id : null,
        ConditionId: selectedConditionObj ? selectedConditionObj.Id : 1,
      };

      let resultListing;
      console.log('Submitting listing data:', listingData);
      if (!isEdit) {
        const imagesBase64 = await Promise.all(uploadedImages.map((file) => fileToBase64(file)));
        listingData.ImagesBase64 = imagesBase64;

        resultListing = await marketplaceService.createListing(listingData);
        createSnackbar('Listing created successfully!', 'success');
      } else {
        resultListing = await marketplaceService.updateListing(listing.Id, listingData);
        createSnackbar('Listing updated successfully!', 'success');
      }

      resultListing.CategoryName = selectedCategoryObj?.CategoryName ?? '';
      resultListing.ConditionName = selectedConditionObj?.ConditionName ?? '';
      onSubmit(resultListing); // <-- pass back the new or updated listing
      onClose();
    } catch (error) {
      if (error?.errors) {
        console.error('Validation errors:', error.errors);
      } else {
        console.error('Error submitting listing:', error);
        createSnackbar('Failed to submit listing. Please try again.', 'error');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result); // keep full data URI

      reader.onerror = (error) => reject(error);
    });
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const [fetchedCategories, fetchedConditions] = await Promise.all([
          marketplaceService.getCategories(),
          marketplaceService.getConditions(),
        ]);
        setCategories(fetchedCategories);
        setConditions(fetchedConditions);
      } catch (err) {
        console.error('Failed to load categories or conditions', err);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    if (isEdit && listing) {
      setSelectedCategory(listing.CategoryName); // or find category name from ID
      setSelectedCondition(listing.ConditionName); // or find condition name from ID
      setProductName(listing.Name);
      setPrice(listing.Price?.toString() || '');
      setDescription(listing.Detail);
      setUploadedImages([]); // clear images, since you want to disable editing images
    } else {
      // Clear form for create mode
      setSelectedCategory('');
      setSelectedCondition('');
      setProductName('');
      setPrice('');
      setDescription('');
      setUploadedImages([]);
    }
  }, [isEdit, listing]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <AppBar position="static" sx={{ backgroundColor: 'primary.main' }}>
        <Toolbar>
          <Typography variant="h6" fontWeight="bold" sx={{ flexGrow: 1 }}>
            Gordon{' '}
            <Box component="span" sx={{ color: 'warning.main' }}>
              Marketplace
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

      <DialogContent sx={{ p: 4 }}>
        <Typography variant="h6" gutterBottom>
          {isEdit ? 'Edit Listing' : 'Create a New Listing'}
        </Typography>

        {/* Categories */}
        <Box sx={{ mb: 3, p: 2, backgroundColor: theme.palette.neutral.main, borderRadius: 2 }}>
          <Typography fontWeight="bold" gutterBottom>
            Item Category:
          </Typography>
          <FormGroup row>
            {categories.map((cat) => (
              <FormControlLabel
                key={cat.Id}
                control={
                  <Checkbox
                    checked={selectedCategory === cat.CategoryName}
                    onChange={() =>
                      setSelectedCategory((prev) =>
                        prev === cat.CategoryName ? '' : cat.CategoryName,
                      )
                    }
                  />
                }
                label={cat.CategoryName}
                TypographyProps={{ fontSize: '0.875rem' }}
              />
            ))}
          </FormGroup>
        </Box>

        {/* Condition */}
        <Box
          sx={{
            mb: 3,
            p: 2,
            backgroundColor: theme.palette.neutral.main,
            borderRadius: 2,
          }}
        >
          <Typography fontWeight="bold" gutterBottom>
            Condition:
          </Typography>
          <FormGroup row>
            {conditions.map((cond) => (
              <FormControlLabel
                key={cond.Id}
                control={
                  <Checkbox
                    checked={selectedCondition === cond.ConditionName}
                    onChange={() =>
                      setSelectedCondition((prev) =>
                        prev === cond.ConditionName ? '' : cond.ConditionName,
                      )
                    }
                  />
                }
                label={cond.ConditionName}
                TypographyProps={{ fontSize: '0.875rem' }}
              />
            ))}
          </FormGroup>
        </Box>

        {/* Product Info */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Product Name"
              fullWidth
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              inputProps={{ maxLength: 50 }}
              helperText={`${productName.length}/50`}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Price"
              fullWidth
              type="number"
              inputProps={{ min: 0, step: '0.01' }}
              placeholder="Free"
              value={price}
              onChange={(e) => {
                const val = e.target.value;
                if (val === '' || /^\d*\.?\d*$/.test(val)) {
                  if (val.includes('.')) {
                    const [intPart, decPart] = val.split('.');
                    if (decPart.length > 2) return; // block input beyond 2 decimals
                  }
                  setPrice(val);
                }
              }}
              onKeyDown={(e) => {
                if (['e', 'E', '+', '-'].includes(e.key)) {
                  e.preventDefault();
                }
              }}
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
            />
          </Grid>
        </Grid>

        <TextField
          label="Product Description"
          fullWidth
          multiline
          rows={4}
          sx={{ mt: 2 }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          inputProps={{ maxLength: 1000 }}
          helperText={`${description.length}/1000`}
        />
        {!isEdit && (
          <>
            {/* Upload Images Placeholder */}
            {/* Hidden file input */}
            {/* Hidden file input */}
            <input
              type="file"
              accept="image/*,.heic,.heif"
              multiple
              style={{ display: 'none' }}
              id="upload-images-input"
              onChange={async (e) => {
                setIsUploadingImages(true);
                const files = Array.from(e.target.files);
                const processedFiles = await Promise.all(
                  files.map(async (file) => {
                    if (file.type === 'image/heic' || file.name.toLowerCase().endsWith('.heic')) {
                      try {
                        const convertedBlob = await heic2any({
                          blob: file,
                          toType: 'image/jpeg',
                          quality: 0.9,
                        });

                        return new File([convertedBlob], file.name.replace(/\.heic$/i, '.jpeg'), {
                          type: 'image/jpeg',
                        });
                      } catch (err) {
                        console.error('HEIC conversion failed:', err);
                        return null;
                      }
                    }
                    return file;
                  }),
                );

                const validFiles = processedFiles.filter(Boolean);
                setUploadedImages((prev) => [...prev, ...validFiles]);
                setIsUploadingImages(false);
              }}
            />

            {/* Image boxes */}
            <Box
              sx={{
                mt: 3,
                display: 'flex',
                gap: 2,
                overflowX: 'auto', // Enable horizontal scrolling
                maxWidth: 'calc(15em * 3 + 2 * 2rem)', // Width for 3 images plus gaps
                paddingBottom: 1,
              }}
            >
              <Box
                sx={{
                  width: '15em',
                  height: '15em',
                  borderRadius: 2,
                  backgroundColor: theme.palette.neutral.dark,
                  boxShadow: 1,
                  cursor: 'pointer',
                  overflow: 'hidden',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexShrink: 0,
                  border: (theme) => `2px dashed ${theme.palette.text.secondary}`,
                  transition: 'background 0.2s',
                  '&.drag-over': {
                    backgroundColor: theme.palette.primary.main,
                  },
                }}
                onClick={() => document.getElementById('upload-images-input').click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.currentTarget.classList.add('drag-over');
                }}
                onDragLeave={(e) => {
                  e.preventDefault();
                  e.currentTarget.classList.remove('drag-over');
                }}
                onDrop={async (e) => {
                  e.preventDefault();
                  e.currentTarget.classList.remove('drag-over');
                  setIsUploadingImages(true);
                  const files = Array.from(e.dataTransfer.files);
                  const processedFiles = await Promise.all(
                    files.map(async (file) => {
                      if (file.type === 'image/heic' || file.name.toLowerCase().endsWith('.heic')) {
                        try {
                          const convertedBlob = await heic2any({
                            blob: file,
                            toType: 'image/jpeg',
                            quality: 0.9,
                          });
                          return new File([convertedBlob], file.name.replace(/\.heic$/i, '.jpeg'), {
                            type: 'image/jpeg',
                          });
                        } catch (err) {
                          console.error('HEIC conversion failed:', err);
                          return null;
                        }
                      }
                      return file;
                    }),
                  );
                  const validFiles = processedFiles.filter(Boolean);
                  setUploadedImages((prev) => [...prev, ...validFiles]);
                  setIsUploadingImages(false);
                }}
              >
                <Typography variant="body" color="text.secondary" align="center">
                  Upload Image(s)
                  <br />
                  (jpg, jpeg, png, HEIC)
                </Typography>
              </Box>

              {isUploadingImages && (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '15em',
                    width: '100%',
                  }}
                >
                  <GordonLoader />
                </Box>
              )}

              {uploadedImages.map((file, index) => (
                <Box
                  key={index}
                  sx={{
                    width: '15em',
                    height: '15em',
                    borderRadius: 2,
                    backgroundColor: theme.palette.neutral.main,
                    boxShadow: 1,
                    overflow: 'hidden',
                    position: 'relative', // Needed for absolute positioning of the delete button
                    flexShrink: 0,
                  }}
                >
                  <Box
                    component="img"
                    src={URL.createObjectURL(file)}
                    alt={`uploaded-${index}`}
                    sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onLoad={(e) => URL.revokeObjectURL(e.target.src)}
                  />

                  <IconButton
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: -5,
                      right: -5,
                    }}
                    onClick={() => {
                      setUploadedImages((prev) => prev.filter((_, i) => i !== index));
                    }}
                  >
                    <RemoveCircleIcon color="error" fontSize="medium" />
                  </IconButton>
                </Box>
              ))}
            </Box>
          </>
        )}
        <Box>
          <FormControlLabel
            control={
              <Checkbox
                required
                checked={agreed}
                onChange={(e) => {
                  setAgreed(e.target.checked);
                  console.log('Agreed:', e.target.checked);
                }}
                name="handbookAgreement"
              />
            }
            label="I confirm that this post complies with the Student Handbook."
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mt: 3 }}>
          <Button
            variant="contained"
            color="secondary"
            disabled={isSubmitDisabled || isSubmitting}
            onClick={handleSubmit}
          >
            {isEdit ? 'Update' : 'Submit'}
          </Button>

          {isSubmitting && (
            <Box sx={{ ml: 2, display: 'flex', alignItems: 'center' }}>
              <GordonLoader size={24} /> {/* assuming GordonLoader supports a size prop */}
            </Box>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ListingUploader;

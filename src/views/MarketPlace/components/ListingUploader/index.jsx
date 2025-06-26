import { useState, useEffect } from 'react';
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
} from '@mui/material';
import { InputAdornment } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import marketplaceService from 'services/marketplace';

const ListingUploader = ({ open, onClose }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [selectedCondition, setSelectedCondition] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [uploadedImages, setUploadedImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [categories, setCategories] = useState([]);
  const [conditions, setConditions] = useState([]);

  const isSubmitDisabled =
    !selectedCategory ||
    !selectedCondition ||
    !productName.trim() ||
    !description.trim() ||
    uploadedImages.length === 0;

  const handleSubmit = async () => {
    try {
      const imagesBase64 = await Promise.all(uploadedImages.map((file) => fileToBase64(file)));
      console.log('Base64 images: ', imagesBase64);

      const selectedCategoryObj = categories.find((cat) => cat.CategoryName === selectedCategory);
      const selectedConditionObj = conditions.find(
        (cond) => cond.ConditionName === selectedCondition,
      );

      const listingData = {
        Name: productName.trim(),
        Detail: description.trim(),
        Price: price ? parseFloat(price) : 0,
        CategoryId: selectedCategoryObj ? selectedCategoryObj.Id : null,
        ConditionId: selectedConditionObj ? selectedConditionObj.Id : null,
        ImagesBase64: imagesBase64,
      };

      console.log('Submitting listing:', listingData);

      // Call the API now
      const createdListing = await marketplaceService.createListing(listingData);

      console.log('Listing created:', createdListing);

      // Optionally close dialog or reset form here
      onClose();
    } catch (error) {
      console.error('Error submitting listing:', error);
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

      <DialogContent sx={{ p: 4 }}>
        <Typography variant="h6" gutterBottom>
          Create a New Listing
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

        {/* Upload Images Placeholder */}
        {/* Hidden file input */}
        {/* Hidden file input */}
        <input
          type="file"
          accept="image/*"
          multiple
          style={{ display: 'none' }}
          id="upload-images-input"
          onChange={(e) => {
            const files = Array.from(e.target.files);
            setUploadedImages((prev) => {
              const combined = [...prev, ...files];
              return combined;
            });
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
          {uploadedImages.length === 0 && (
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
              }}
              onClick={() => document.getElementById('upload-images-input').click()}
            >
              <Typography variant="body2" color="text.secondary">
                Upload Image (jpg, jpeg, png)
              </Typography>
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
                cursor: 'pointer',
                overflow: 'hidden',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexShrink: 0, // Prevent shrinking so width stays fixed
              }}
              onClick={() => document.getElementById('upload-images-input').click()}
            >
              <Box
                component="img"
                src={URL.createObjectURL(file)}
                alt={`uploaded-${index}`}
                sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onLoad={(e) => URL.revokeObjectURL(e.target.src)}
              />
            </Box>
          ))}
        </Box>

        <Button
          variant="contained"
          color="secondary"
          sx={{ mt: 3 }}
          disabled={isSubmitDisabled}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ListingUploader;

import { useState } from 'react';
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
  FormControl,
  FormHelperText,
} from '@mui/material';
import { InputAdornment } from '@mui/material';

import { useTheme } from '@mui/material/styles';

const categories = [
  'Category 1',
  'Category 2',
  'Category 4',
  'Category 5',
  'Category 7',
  'Category 8',
];

const conditions = ['Like New', 'Open Box', 'Used - Excellent', 'Used - Good', 'Used - Fair'];

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

  const isSubmitDisabled =
    !selectedCategory ||
    !selectedCondition ||
    !productName.trim() ||
    !description.trim() ||
    !price.trim() ||
    isNaN(Number(price)) ||
    Number(price) <= 0 ||
    uploadedImages.length === 0;

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
                key={cat}
                control={
                  <Checkbox
                    checked={selectedCategory === cat}
                    onChange={() => setSelectedCategory((prev) => (prev === cat ? '' : cat))}
                  />
                }
                label={cat}
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
                key={cond}
                control={
                  <Checkbox
                    checked={selectedCondition === cond}
                    onChange={() => setSelectedCondition((prev) => (prev === cond ? '' : cond))}
                  />
                }
                label={cond}
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
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Price"
              fullWidth
              type="number"
              inputProps={{ min: 0, step: '0.01' }}
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
              return combined.slice(0, 3); // max 3 images
            });
          }}
        />

        {/* Image boxes */}
        <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
          {/* First box always */}
          <Box
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
              position: 'relative',
            }}
            onClick={() => document.getElementById('upload-images-input').click()}
          >
            {uploadedImages[0] ? (
              <Box
                component="img"
                src={URL.createObjectURL(uploadedImages[0])}
                alt="uploaded-0"
                sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onLoad={(e) => URL.revokeObjectURL(e.target.src)}
              />
            ) : (
              <Typography variant="body2" color="text.secondary">
                Upload Image
              </Typography>
            )}
          </Box>

          {/* Second box if 2+ images */}
          {uploadedImages.length > 1 && (
            <Box
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
                position: 'relative',
              }}
              onClick={() => document.getElementById('upload-images-input').click()}
            >
              <Box
                component="img"
                src={URL.createObjectURL(uploadedImages[1])}
                alt="uploaded-1"
                sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onLoad={(e) => URL.revokeObjectURL(e.target.src)}
              />
            </Box>
          )}

          {/* Third box if 3 images */}
          {uploadedImages.length > 2 && (
            <Box
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
                position: 'relative',
              }}
              onClick={() => document.getElementById('upload-images-input').click()}
            >
              <Box
                component="img"
                src={URL.createObjectURL(uploadedImages[2])}
                alt="uploaded-2"
                sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onLoad={(e) => URL.revokeObjectURL(e.target.src)}
              />
            </Box>
          )}
        </Box>

        <Button
          variant="contained"
          color="secondary"
          sx={{ mt: 3 }}
          disabled={isSubmitDisabled}
          onClick={onClose}
        >
          Submit
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ListingUploader;

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import { useState } from 'react';
import marketplaceService from 'services/marketplace';

const CategoryEditor = ({ open, onClose, categories, setCategories, createSnackbar }) => {
  const [newCategory, setNewCategory] = useState('');

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;

    try {
      const added = await marketplaceService.addCategory(newCategory.trim());
      setCategories((prev) => [...prev, { Id: added.Id, CategoryName: added.Category }]);
      createSnackbar('Category added successfully', 'success');
      setNewCategory('');
    } catch (err) {
      console.error(err);
      createSnackbar('Failed to add category', 'error');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Categories</DialogTitle>
      <DialogContent>
        <List dense>
          {categories.map((cat) => (
            <ListItem key={cat.Id}>
              <ListItemText primary={cat.CategoryName} />
            </ListItem>
          ))}
        </List>
        <Divider sx={{ my: 2 }} />
        <TextField
          label="New Category Name"
          fullWidth
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ color: 'secondary.main' }}>
          Close
        </Button>
        <Button variant="contained" onClick={handleAddCategory}>
          Add Category
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CategoryEditor;

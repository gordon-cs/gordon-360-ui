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

const ConditionEditor = ({ open, onClose, conditions, setConditions, createSnackbar }) => {
  const [newCondition, setNewCondition] = useState('');

  const handleAddCondition = async () => {
    if (!newCondition.trim()) return;

    try {
      const added = await marketplaceService.addCondition(newCondition.trim());
      setConditions((prev) => [...prev, { Id: added.Id, ConditionName: added.Condition }]);
      createSnackbar('Condition added successfully', 'success');
      setNewCondition('');
    } catch (err) {
      console.error(err);
      createSnackbar('Failed to add Condition', 'error');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Conditions</DialogTitle>
      <DialogContent>
        <List dense>
          {conditions.map((cat) => (
            <ListItem key={cat.Id}>
              <ListItemText primary={cat.ConditionName} />
            </ListItem>
          ))}
        </List>
        <Divider sx={{ my: 2 }} />
        <TextField
          label="New Condition Name"
          fullWidth
          value={newCondition}
          onChange={(e) => setNewCondition(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ color: 'secondary.main' }}>
          Close
        </Button>
        <Button variant="contained" onClick={handleAddCondition}>
          Add Condition
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConditionEditor;

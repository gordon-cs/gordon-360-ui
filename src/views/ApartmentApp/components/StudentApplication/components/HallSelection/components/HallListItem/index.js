import React, { useState, useEffect } from 'react';
import {
  Grid,
  ListItem,
  ListItemSecondaryAction,
  MenuItem,
  FormControl,
  Input,
  InputLabel,
  Select,
  IconButton,
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';

const HallListItem = ({
  index,
  availableHalls,
  preferredHalls,
  onHallInputChange,
  onHallRemove,
}) => {
  const [hallRankValue, setHallRankValue] = useState(1); // Rank drop-down menu value
  const [hallNameValue, setHallNameValue] = useState(''); // Hall drop-down menu value

  useEffect(() => {
    // Get the hall info for this list item from the component's props
    const getHallFromProps = () => {
      setHallRankValue(preferredHalls[index].HallRank);
      setHallNameValue(preferredHalls[index].HallName);
    };

    getHallFromProps();
  });

  const handleRankInputChange = (event) => {
    console.log('Called "handleRankInputChange" in HallListItem component'); //! DEBUG
    if (event.target.value !== null) {
      let newHallRankValue = event.target.value;
      onHallInputChange(newHallRankValue, hallNameValue, index);
    }
  };

  const handleHallInputChange = (event) => {
    console.log('Called "handleHallInputChange" in HallListItem component'); //! DEBUG
    if (event.target.value !== null) {
      let newHallNameValue = event.target.value;
      onHallInputChange(hallRankValue, newHallNameValue, index);
    }
  };

  const handleRemove = () => {
    if (index !== null) {
      // Send this list item's index to the parent component
      onHallRemove(index);
    }
  };

  const hallOptions = availableHalls.map((hallName) => (
    <MenuItem value={hallName} key={hallName}>
      {hallName}
    </MenuItem>
  ));

  const rankOptions = preferredHalls.map((_hall, i) => (
    <MenuItem value={i + 1} key={i + 1}>
      {i + 1}
    </MenuItem>
  ));

  return (
    <ListItem key={index} className={'list-item'}>
      <Grid container alignItems="center" spacing={3}>
        <Grid item xs={3} sm={2}>
          <FormControl fullWidth>
            <InputLabel>Rank</InputLabel>
            <Select
              value={hallRankValue}
              onChange={handleRankInputChange}
              input={<Input id={'rank' + index} />}
            >
              {rankOptions}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={9} sm={10}>
          <FormControl fullWidth>
            <InputLabel>Hall</InputLabel>
            <Select
              value={hallNameValue}
              onChange={handleHallInputChange}
              input={<Input id={'hall' + index} />}
            >
              {hallOptions}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete" onClick={handleRemove}>
          <ClearIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default HallListItem;

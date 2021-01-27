import React, { useState, useEffect } from 'react';
import {
  Grid,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  MenuItem,
  FormControl,
  Input,
  InputLabel,
  Select,
  IconButton,
} from '@material-ui/core';
import ApartmentIcon from '@material-ui/icons/Apartment';
import ClearIcon from '@material-ui/icons/Clear';

const HallListItem = (props) => {
  const [hallSelectionValue, setHallSelectionValue] = useState(''); // Hall drop-down menu value
  const [hallRankValue, setHallRankValue] = useState(1); // Rank drop-down menu value

  useEffect(() => {
    // Get the hall info for this list item from the component's props
    const getHallFromProps = () => {
      setHallRankValue(props.preferredHalls[props.index].hallRank);
      setHallSelectionValue(props.preferredHalls[props.index].hallName);
    };

    getHallFromProps();
  });

  const handleHallInputChange = (event) => {
    console.log('Called "handleHallInputChange" in HallListItem component'); //! DEBUG
    if (event.target.value !== null) {
      props.onHallInputChange(event.target.value, hallRankValue, props.index);
    }
  };

  const handleRankInputChange = (event) => {
    console.log('Called "handleRankInputChange" in HallListItem component'); //! DEBUG
    if (event.target.value !== null) {
      props.onHallInputChange(hallSelectionValue, event.target.value, props.index);
    }
  };

  const handleRemove = () => {
    if (props.index !== null) {
      // Send this list item's index to the parent component
      props.onHallRemove(props.index);
    }
  };

  const index = props.index;

  const hallOptions = props.availableHalls.map((hallName) => (
    <MenuItem value={hallName} key={hallName}>
      {hallName}
    </MenuItem>
  ));

  const rankOptions = props.preferredHalls.map((_hall, i) => (
    <MenuItem value={i + 1} key={i + 1}>
      {i + 1}
    </MenuItem>
  ));

  return (
    <ListItem key={index} className={'list-item'}>
      <ListItemIcon>
        <ApartmentIcon color="primary" />
      </ListItemIcon>
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
              value={hallSelectionValue}
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

import React, { useState, useEffect, useRef } from 'react';
import isEqual from 'lodash/isEqual';
import {
  Grid,
  Divider,
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
  disabled,
  index,
  hallRank,
  hallName,
  preferredHalls,
  halls,
  onHallInputChange,
  onHallRemove,
}) => {
  const [hallRankValue, setHallRankValue] = useState(1); // Rank drop-down menu value
  const [hallNameValue, setHallNameValue] = useState(''); // Hall drop-down menu value

  useEffect(() => {
    setHallRankValue(hallRank);
    setHallNameValue(hallName);
  }, [hallRank, hallName]);

  //! DEPRECATED
  useEffect(() => {
    // Manually perform deep checking of the array to force update whenever an element of preferredHalls is changed
    if (isEqual(previousInputs.current, [index, preferredHalls])) {
      return;
    }
    // Get the hall info for this list item from the component's props
    const getHallFromProps = () => {
      setHallRankValue(preferredHalls[index].HallRank);
      setHallNameValue(preferredHalls[index].HallName);
    };

    getHallFromProps();
  });

  //! DEPRECATED
  const previousInputs = useRef();
  useEffect(() => {
    previousInputs.current = [index, preferredHalls];
  });

  /**
   * Callback for changes to hall rank input field
   * @param {*} event change event to be handled by callback
   */
  const handleRankInputChange = (event) => {
    if (event.target.value !== null) {
      let newHallRankValue = event.target.value;
      onHallInputChange(newHallRankValue, hallNameValue, index);
    }
  };

  /**
   * Callback for changes to hall name dropdown
   * @param {*} event change event to be handled by callback
   */
  const handleNameInputChange = (event) => {
    if (event.target.value !== null) {
      let newHallNameValue = event.target.value;
      onHallInputChange(hallRankValue, newHallNameValue, index);
    }
  };

  /**
   * Callback for hall list remove button
   */
  const handleRemove = () => {
    if (index !== null) {
      // Send this list item's index to the parent component
      onHallRemove(index);
    }
  };

  const hallOptions = halls.map((hallName) => (
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
    <React.Fragment>
      <ListItem key={index} className={'list-item'}>
        <Grid container alignItems="center" spacing={3}>
          <Grid item xs={3} sm={2}>
            <FormControl fullWidth>
              <InputLabel>Rank</InputLabel>
              <Select
                disabled={disabled}
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
                disabled={disabled}
                value={hallNameValue}
                onChange={handleNameInputChange}
                input={<Input id={'hall' + index} />}
              >
                {hallOptions}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="delete" disabled={disabled} onClick={handleRemove}>
            <ClearIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
    </React.Fragment>
  );
};

export default HallListItem;

import React, { useState, useEffect } from 'react';
import {
  Grid,
  Divider,
  ListItem,
  ListItemSecondaryAction,
  MenuItem,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Select,
  IconButton,
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';

/**
 * @typedef { import('../../services/housing').ApartmentHall } ApartmentHall
 * @typedef { import('../../services/housing').ApartmentChoice } ApartmentChoice
 */

/**
 * Renders the list item for the apartment hall choice list
 * @param {Object} props The React component props
 * @param {Boolean} props.disabled Boolean to disable the interactive elements of this list item
 * @param {Number} props.index The index of this list item
 * @param {Number} props.hallRank The rank assigned to this hall by the user
 * @param {String} props.hallName The name of the apartment hall
 * @param {ApartmentChoice[]} props.preferredHalls Array of apartment choices
 * @param {ApartmentHall[]} props.halls Array of apartment halls available
 * @param {CallbackFcn} props.onHallInputChange Callback for dropdown menu change
 * @param {CallbackFcn} props.onHallRemove Callback for remove hall button
 * @returns {JSX.Element} JSX Element for the hall list item
 */
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
  const [isHallNameValid, setIsHallNameValid] = useState(false);

  useEffect(
    () => setIsHallNameValid(hallName === '' || halls.some((hall) => hall.Name === hallName)),
    [hallName, halls],
  );

  /**
   * Callback for changes to hall rank input field
   * @param {*} event change event to be handled by callback
   */
  const handleRankInputChange = (event) => {
    if (event.target.value !== null) {
      let newHallRankValue = event.target.value;
      onHallInputChange(newHallRankValue, hallName, index);
    }
  };

  /**
   * Callback for changes to hall name dropdown
   * @param {*} event change event to be handled by callback
   */
  const handleNameInputChange = (event) => {
    if (event.target.value !== null) {
      let newHallNameValue = event.target.value;
      onHallInputChange(hallRank, newHallNameValue, index);
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

  const hallOptions = halls.map((hall) => (
    <MenuItem value={hall.Name} key={hall.Name}>
      {hall.Name}
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
                value={hallRank}
                onChange={handleRankInputChange}
                input={<Input id={'rank' + index} />}
              >
                {rankOptions}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={9} sm={10}>
            <FormControl fullWidth error={!isHallNameValid}>
              <InputLabel>Hall</InputLabel>
              <Select
                disabled={disabled}
                value={isHallNameValid ? hallName : ''}
                onChange={handleNameInputChange}
                input={<Input id={'hall' + index} />}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {hallOptions}
              </Select>
              {!isHallNameValid && (
                <FormHelperText>
                  An error occurred while loading the application data
                </FormHelperText>
              )}
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

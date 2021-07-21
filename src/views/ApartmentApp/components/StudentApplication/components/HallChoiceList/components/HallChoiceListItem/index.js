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
 * @typedef { import('services/housing').ApartmentHall } ApartmentHall
 * @typedef { import('services/housing').ApartmentChoice } ApartmentChoice
 */

/**
 * Renders the list item for the apartment hall choice list
 * @param {Object} props The React component props
 * @param {Boolean} props.disabled Boolean to disable the interactive elements of this list item
 * @param {Number} props.index The index of this list item
 * @param {Number} props.hallRank The rank assigned to this hall by the user
 * @param {String} props.hallName The name of the apartment hall
 * @param {ApartmentChoice[]} props.apartmentChoices Array of apartment choices
 * @param {ApartmentHall[]} props.halls Array of apartment halls available
 * @param {CallbackFcn} props.onHallInputChange Callback for dropdown menu change
 * @param {CallbackFcn} props.onHallRemove Callback for remove hall button
 * @returns {JSX.Element} JSX Element for the hall list item
 */
const HallChoiceListItem = ({
  disabled,
  index,
  hallRank,
  hallName,
  apartmentChoices,
  halls,
  onHallInputChange,
  onHallRemove,
}) => {
  const [isHallNameValid, setIsHallNameValid] = useState(false);

  useEffect(() => setIsHallNameValid(hallName === '' || halls.some((hall) => hall === hallName)), [
    hallName,
    halls,
  ]);

  const hallOptions = halls.map((hall) => (
    <MenuItem value={hall} key={hall}>
      {hall}
    </MenuItem>
  ));

  const rankOptions = apartmentChoices.map((_hall, i) => (
    <MenuItem value={i + 1} key={i + 1}>
      {i + 1}
    </MenuItem>
  ));

  return (
    <>
      <ListItem key={index} className={styles.list_item}>
        <Grid container alignItems="center" spacing={3}>
          <Grid item xs={4} sm={2}>
            <FormControl fullWidth>
              <InputLabel>Rank</InputLabel>
              <Select
                disabled={disabled}
                value={hallRank}
                onChange={(event) => onHallInputChange(String(event.target.value), hallName, index)}
                input={<Input id={'rank' + index} />}
              >
                {rankOptions}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={8} sm={10}>
            <FormControl fullWidth error={!isHallNameValid}>
              <InputLabel>Hall</InputLabel>
              <Select
                disabled={disabled}
                value={isHallNameValid ? hallName : ''}
                onChange={(event) => onHallInputChange(hallRank, String(event.target.value), index)}
                input={<Input id={'hall' + index} />}
              >
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
          <IconButton
            edge="end"
            aria-label="delete"
            disabled={disabled}
            onClick={() => onHallRemove(index)}
          >
            <ClearIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
    </>
  );
};

export default HallChoiceListItem;

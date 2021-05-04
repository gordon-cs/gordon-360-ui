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
 * @param {ApartmentChoice} props.apartmentChoice The ApartmentChoice object of this list item
 * @param {ApartmentChoice[]} props.apartmentChoiceArray Array of apartment choices
 * @param {ApartmentHall[]} props.halls Array of apartment halls available
 * @param {CallbackFcn} props.onHallInputChange Callback for dropdown menu change
 * @param {CallbackFcn} props.onHallRemove Callback for remove hall button
 * @returns {JSX.Element} JSX Element for the hall list item
 */
const HallChoiceListItem = ({
  disabled,
  index,
  apartmentChoice: { HallRank, HallName },
  apartmentChoiceArray,
  halls,
  onHallInputChange,
  onHallRemove,
}) => {
  const [isHallNameValid, setIsHallNameValid] = useState(false);

  useEffect(
    () => setIsHallNameValid(HallName === '' || halls.some((hall) => hall.Name === HallName)),
    [HallName, halls],
  );

  const hallOptions = halls.map((hall) => (
    <MenuItem value={hall.Name} key={hall.Name}>
      {hall.Name}
    </MenuItem>
  ));

  const rankOptions = apartmentChoiceArray.map((_hall, i) => (
    <MenuItem value={i + 1} key={i + 1}>
      {i + 1}
    </MenuItem>
  ));

  return (
    <React.Fragment>
      <ListItem key={index} className={'list-item'}>
        <Grid container alignItems="center" spacing={3}>
          <Grid item xs={4} sm={2}>
            <FormControl fullWidth>
              <InputLabel>Rank</InputLabel>
              <Select
                disabled={disabled}
                value={HallRank}
                onChange={(event) =>
                  event.target.value !== null &&
                  onHallInputChange?.(String(event.target.value), HallName, index)
                }
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
                value={isHallNameValid ? HallName : ''}
                onChange={(event) =>
                  event.target.value !== null &&
                  onHallInputChange?.(HallRank, String(event.target.value), index)
                }
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
            onClick={index && onHallRemove?.(index)}
          >
            <ClearIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
    </React.Fragment>
  );
};

export default HallChoiceListItem;

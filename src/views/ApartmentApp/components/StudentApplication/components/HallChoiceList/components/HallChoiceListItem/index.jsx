import {
  Divider,
  FormControl,
  FormLabel,
  FormHelperText,
  Grid,
  IconButton,
  Input,
  ListItem,
  ListItemSecondaryAction,
  MenuItem,
  Select,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { useEffect, useState } from 'react';
// @TODO CSSMODULES - outside directory
import styles from '../../../../../../ApartmentApp.module.css';

/**
 * @typedef { import('services/housing').ApartmentHall } ApartmentHall
 * @typedef { import('services/housing').ApartmentChoice } ApartmentChoice
 */

/**
 * Renders the list item for the apartment hall choice list
 *
 * @param {Object} props The React component props
 * @param {boolean} props.disabled boolean to disable the interactive elements of this list item
 * @param {number} props.index The index of this list item
 * @param {number} props.hallRank The rank assigned to this hall by the user
 * @param {string} props.hallName The name of the apartment hall
 * @param {ApartmentChoice[]} props.apartmentChoices Array of apartment choices
 * @param {ApartmentHall[]} props.halls Array of apartment halls available
 * @param {Function} props.onHallInputChange Callback for dropdown menu change
 * @param {Function} props.onHallRemove Callback for remove hall button
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

  useEffect(
    () => setIsHallNameValid(hallName === '' || halls.some((hall) => hall === hallName)),
    [hallName, halls],
  );

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
              <FormLabel>Rank</FormLabel>
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
              <FormLabel>Hall</FormLabel>
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
            size="large"
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

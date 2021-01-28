import React, { useState, useEffect } from 'react';
import { Grid, Card, CardHeader, CardContent, List, Typography, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import HallListItem from './components/HallListItem';
import SaveButton from '../SaveButton';
import goStalk from '../../../../../../services/goStalk';
import housing from '../../../../../../services/housing';

/**
 * @typedef { import('../../services/housing').ApartmentChoice } ApartmentChoice
 */

// Create a list of selection boxes to choosing preferred halls
const HallSelection = ({
  disabled,
  editorUsername,
  preferredHalls,
  saving,
  onHallAdd,
  onHallInputChange,
  onHallRemove,
  onSaveButtonClick,
}) => {
  const [availableHalls, setAvailableHalls] = useState([]); // array of hall names from backend

  useEffect(() => {
    const loadHalls = async () => {
      let unfilteredHalls;
      try {
        // Get the halls available for apartments, filtered by the gender of the application editor
        unfilteredHalls = await housing.getApartmentHalls(editorUsername);
      } catch {
        //! DEBUG: Fills in halls dropdown when the housing api endpoint is not yet implemented
        // This list of halls is references from the 'Hall' dropdown on the PeopleSearch page
        unfilteredHalls = await goStalk.getHalls();
      }
      //Remove spaces from strings
      setAvailableHalls(unfilteredHalls.map((hall) => hall.trim()));
    };

    loadHalls();
  }, [editorUsername]);

  /**
   * Callback for changes to hall list item name and/or rank
   * @param {String} hallSelectionValue The name of the hall that was selected
   * @param {String|Number} hallRankValue The rank value that the user assigned to this hall
   * @param {Number} index The index of the hall in the list
   */
  const handleInputChange = (hallRankValue, hallNameValue, index) => {
    onHallInputChange(hallRankValue, hallNameValue, index);
  };

  /**
   * Callback for hall list remove button
   * @param {Number} index The index of the hall to be removed from the list of perferred halls
   */
  const handleRemove = (index) => {
    // Make sure the chosen index was not null
    if (index !== null) {
      // Send the selected index to the parent component
      onHallRemove(index);
    }
  };

  /**
   * Callback for hall list add button
   */
  const handleAddDropdown = () => {
    onHallAdd();
  };

  /**
   * Callback for apartment application save button
   */
  const handleSaveButtonClick = () => {
    onSaveButtonClick();
  };

  return (
    <Card>
      <CardHeader title="Preferred Halls" className="card-header" />
      <CardContent>
        <Grid container justify="space-between" spacing={2}>
          <Grid item xs={11}></Grid>
          <Grid item xs={12}>
            <List className="hall-list" aria-label="apartment preferred halls">
              {preferredHalls ? (
                preferredHalls.map((hallInfo, index) => (
                  <HallListItem
                    key={hallInfo.HallName + index}
                    index={index}
                    disabled={disabled}
                    editorUsername={editorUsername}
                    availableHalls={availableHalls}
                    preferredHalls={preferredHalls}
                    onHallInputChange={handleInputChange}
                    onHallRemove={handleRemove}
                  />
                ))
              ) : (
                <HallListItem
                  key={''}
                  index={0}
                  disabled={disabled}
                  editorUsername={editorUsername}
                  availableHalls={availableHalls}
                  preferredHalls={preferredHalls}
                  onHallInputChange={handleInputChange}
                />
              )}
            </List>
          </Grid>
          <Grid item xs={12}>
            <Button
              disabled={disabled}
              variant="contained"
              color="default"
              startIcon={<AddIcon />}
              onClick={handleAddDropdown}
            >
              Add a Hall
            </Button>
          </Grid>
          <Grid item xs={9}>
            {saving === 'failed' ? (
              <Typography variant="overline" color="error">
                Something when wrong while trying to save the application
              </Typography>
            ) : preferredHalls.length >= availableHalls.length ? (
              <Typography variant="overline" color="error">
                You have reached the maximum number of halls ({availableHalls.length})
              </Typography>
            ) : null}
          </Grid>
          <Grid item xs={3}>
            <SaveButton disabled={disabled} saving={saving} onClick={handleSaveButtonClick} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default HallSelection;

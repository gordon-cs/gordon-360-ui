import React, { useState, useEffect } from 'react';
import { Grid, Card, CardHeader, CardContent, List, Typography, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import HallListItem from './components/HallListItem';
import SaveButton from '../SaveButton';
import goStalk from '../../../../../../services/goStalk';
import housing from '../../../../../../services/housing';

// Create a list of selection boxes to choosing preferred halls
const HallSelection = (props) => {
  const [availableHalls, setAvailableHalls] = useState([]); // array of hall names from backend

  useEffect(() => {
    loadHalls();
  });

  const loadHalls = async () => {
    let unfilteredHalls;
    try {
      // Get the halls available for apartments, filtered by the gender of the application editor
      unfilteredHalls = await housing.getApartmentHalls(props.editorUsername);
    } catch {
      //! DEBUG: Fills in halls dropdown when the housing api endpoint is not yet implemented
      // This list of halls is references from the 'Hall' dropdown on the PeopleSearch page
      unfilteredHalls = await goStalk.getHalls();
    }
    //Remove spaces from strings
    setAvailableHalls(unfilteredHalls.map((hall) => hall.trim()));
  };

  const handleInputChange = (hallNameValue, hallRankValue, index) => {
    console.log('Called "handleInputChange" in ApartmentHallSelection component');
    console.log('hallName: ' + hallNameValue); //! DEBUG
    console.log('hallRank: ' + hallRankValue); //! DEBUG
    console.log('index: ' + index); //! DEBUG
    props.onHallInputChange(hallNameValue, hallRankValue, index);
  };

  const handleRemove = (index) => {
    // Make sure the chosen index was not null
    if (index !== null) {
      // Send the selected index to the parent component
      props.onHallRemove(index);
    }
  };

  const handleAddDropdown = () => {
    props.onHallAdd();
  };

  const handleSaveButtonClick = () => {
    props.onSaveButtonClick();
  };

  return (
    <Card>
      <CardHeader title="Preferred Halls" className="card-header" />
      <CardContent>
        <Grid container justify="space-between" spacing={2}>
          <Grid item xs={11}></Grid>
          <Grid item xs={12}>
            <List className="hall-list" aria-label="apartment preferred halls">
              {props.preferredHalls ? (
                props.preferredHalls.map((preferredHall, index) => (
                  <HallListItem
                    key={preferredHall.hallName + index}
                    index={index}
                    availableHalls={availableHalls}
                    editorUsername={props.editorUsername}
                    preferredHalls={props.preferredHalls}
                    onHallInputChange={handleInputChange}
                    onHallRemove={handleRemove}
                    authentication={props.authentication}
                  />
                ))
              ) : (
                <HallListItem
                  key={''}
                  index={0}
                  availableHalls={availableHalls}
                  editorUsername={props.editorUsername}
                  preferredHalls={props.preferredHalls}
                  onHallInputChange={handleInputChange}
                  authentication={props.authentication}
                />
              )}
            </List>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="default"
              startIcon={<AddIcon />}
              onClick={handleAddDropdown}
            >
              Add a Hall
            </Button>
          </Grid>
          <Grid item xs={9}>
            {props.saving === 'failed' ? (
              <Typography variant="overline" color="error">
                Something when wrong while trying to save the application
              </Typography>
            ) : props.preferredHalls.length >= availableHalls.length ? (
              <Typography variant="overline" color="error">
                You have reached the maximum number of halls ({availableHalls.length})
              </Typography>
            ) : null}
          </Grid>
          <Grid item xs={3}>
            <SaveButton saving={props.saving} onClick={handleSaveButtonClick} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default HallSelection;

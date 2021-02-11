import React, { useState, useEffect } from 'react';
import { Grid, Card, CardHeader, CardContent, List, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import HallListItem from './components/HallListItem';
import goStalk from '../../../../../../services/goStalk';
import housing from '../../../../../../services/housing';

// Create a list of selection boxes to choosing preferred halls
const HallSelection = ({
  editorUsername,
  preferredHalls,
  onHallAdd,
  onHallInputChange,
  onHallRemove,
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
  });

  const handleInputChange = (hallRankValue, hallNameValue, index) => {
    onHallInputChange(hallRankValue, hallNameValue, index);
  };

  const handleRemove = (index) => {
    // Make sure the chosen index was not null
    if (index !== null) {
      // Send the selected index to the parent component
      onHallRemove(index);
    }
  };

  const handleAddDropdown = () => {
    onHallAdd();
  };

  return (
    <Card>
      <CardHeader title="Preferred Halls" className="card-header" />
      <CardContent>
        <Grid container justify="space-between" spacing={2}>
          <Grid item xs={12}>
            <List className="hall-list" aria-label="apartment preferred halls">
              {preferredHalls ? (
                preferredHalls.map((hallInfo, index) => (
                  <HallListItem
                    key={hallInfo.HallRank + hallInfo.HallName}
                    index={index}
                    preferredHalls={preferredHalls}
                    availableHalls={availableHalls}
                    onHallInputChange={handleInputChange}
                    onHallRemove={handleRemove}
                  />
                ))
              ) : (
                <HallListItem
                  key={''}
                  index={0}
                  preferredHalls={preferredHalls}
                  availableHalls={availableHalls}
                  onHallInputChange={handleInputChange}
                />
              )}
            </List>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<AddIcon fontSize="inherit" />}
              onClick={handleAddDropdown}
            >
              Add a Hall
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default HallSelection;

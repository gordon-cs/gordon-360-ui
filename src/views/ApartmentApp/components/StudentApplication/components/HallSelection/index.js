import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid, Card, CardHeader, CardContent, List, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import HallListItem from './components/HallListItem';
import housing from '../../../../../../services/housing';

/**
 * @typedef { import('../../services/housing').ApartmentHall } ApartmentHall
 * @typedef { import('../../services/housing').ApartmentChoice } ApartmentChoice
 */

// Create a list of selection boxes to choosing preferred halls
const HallSelection = ({
  disabled,
  authentication,
  editorUsername,
  preferredHalls,
  onHallAdd,
  onHallInputChange,
  onHallRemove,
}) => {
  /** @type {[ApartmentHall[], React.Dispatch<React.SetStateAction<ApartmentHall[]>>]} Array of apartment halls */
  const [halls, setHalls] = useState([]); // array of hall names from backend

  useEffect(() => {
    const loadHalls = async () => {
      setHalls(await housing.getApartmentHalls());
    };

    if (authentication) {
      loadHalls();
    }
  }, [authentication, editorUsername]);

  /**
   * Callback for changes to hall list item name and/or rank
   * @param {Number} hallRankValue The rank value that the user assigned to this hall
   * @param {String} hallNameValue The name of the hall that was selected
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

  return (
    <Card>
      <CardHeader title="Preferred Halls" className="apartment-card-header" />
      <CardContent>
        <Grid container justify="space-between" spacing={2}>
          <Grid item xs={12}>
            <List className="hall-list" aria-label="apartment preferred halls" disablePadding>
              {preferredHalls?.length > 0 &&
                preferredHalls.map((hallInfo, index) => (
                  <HallListItem
                    key={index + hallInfo.HallRank + hallInfo.HallName}
                    disabled={disabled}
                    index={index}
                    hallRank={hallInfo.HallRank}
                    hallName={hallInfo.HallName}
                    preferredHalls={preferredHalls}
                    halls={halls}
                    onHallInputChange={handleInputChange}
                    onHallRemove={handleRemove}
                  />
                ))}
            </List>
          </Grid>
          <Grid item xs={12}>
            <Button
              disabled={disabled}
              variant="outlined"
              color="primary"
              startIcon={<AddIcon fontSize="inherit" />}
              onClick={onHallAdd}
            >
              Add a Hall
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

HallSelection.propTypes = {
  disabled: PropTypes.bool,
  authentication: PropTypes.any,
  editorUsername: PropTypes.string,
  preferredHalls: PropTypes.array.isRequired,
  onHallAdd: PropTypes.func,
  onHallInputChange: PropTypes.func,
  onHallRemove: PropTypes.func,
};

export default HallSelection;

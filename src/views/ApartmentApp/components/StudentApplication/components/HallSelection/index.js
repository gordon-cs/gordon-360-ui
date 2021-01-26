import React, { Component } from 'react';
import 'date-fns';
import { Grid, Card, CardHeader, CardContent, List, Typography, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import HallListItem from './components/HallListItem';
import SaveButton from '../SaveButton';
import goStalk from '../../../../../../services/goStalk';
import housing from '../../../../../../services/housing';
import '../../../../apartmentApp.css';
import '../../../../../PeopleSearch/components/PeopleSearchResult/peopleSearchResult.css';

// Create a list of selection boxes to choosing preferred halls
export default class HallSelection extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleAddDropdown = this.handleAddDropdown.bind(this);
    this.handleSaveButtonClick = this.handleSaveButtonClick.bind(this);
    this.state = {
      // array of table data from backend
      availableHalls: [],
    };
    this.loaderSize = 20;
  }

  async componentDidMount() {
    if (this.props.authentication) {
      let unfilteredHalls;
      try {
        // Get the halls available for apartments, filtered by the gender of the application editor
        unfilteredHalls = await housing.getApartmentHalls(this.props.editorUsername);
      } catch {
        //! DEBUG: Fills in halls dropdown when the housing api endpoint is not yet implemented
        // This list of halls is references from the 'Hall' dropdown on the PeopleSearch page
        unfilteredHalls = await goStalk.getHalls();
      }
      //Remove spaces from strings
      let availableHalls = unfilteredHalls.map((hall) => hall.trim());
      this.setState({ availableHalls });
    }
  }

  handleInputChange = (hallSelectionValue, hallRankValue, index) => {
    console.log('Called "handleInputChange" in ApartmentHallSelection component');
    console.log('hallName: ' + hallSelectionValue); //! DEBUG
    console.log('hallRank: ' + hallRankValue); //! DEBUG
    console.log('index: ' + index); //! DEBUG
    this.props.onHallInputChange(hallSelectionValue, hallRankValue, index);
  };

  handleRemove = (index) => {
    // Make sure the chosen index was not null
    if (index !== null) {
      // Send the selected index to the parent component
      this.props.onHallRemove(index);
    }
  };

  handleAddDropdown = () => {
    this.props.onHallAdd();
  };

  handleSaveButtonClick = () => {
    this.props.onSaveButtonClick();
  };

  render() {
    return (
      <Card>
        <CardHeader title="Preferred Halls" className="card-header" />
        <CardContent>
          <Grid container justify="space-between" spacing={2}>
            <Grid item xs={11}></Grid>
            <Grid item xs={12}>
              <List className="hall-list" aria-label="apartment preferred halls">
                {this.props.preferredHalls ? (
                  this.props.preferredHalls.map((preferredHall, index) => (
                    <HallListItem
                      key={preferredHall.hallName + index}
                      index={index}
                      availableHalls={this.state.availableHalls}
                      editorUsername={this.props.editorUsername}
                      preferredHalls={this.props.preferredHalls}
                      onHallInputChange={this.handleInputChange}
                      onHallRemove={this.handleRemove}
                      authentication={this.props.authentication}
                    />
                  ))
                ) : (
                  <HallListItem
                    key={''}
                    index={0}
                    availableHalls={this.state.availableHalls}
                    editorUsername={this.props.editorUsername}
                    preferredHalls={this.props.preferredHalls}
                    onHallInputChange={this.handleInputChange}
                    authentication={this.props.authentication}
                  />
                )}
              </List>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="default"
                startIcon={<AddIcon />}
                onClick={this.handleAddDropdown}
              >
                Add a Hall
              </Button>
            </Grid>
            <Grid item xs={9}>
              {this.props.saving === 'failed' ? (
                <Typography variant="overline" color="error">
                  Something when wrong while trying to save the application
                </Typography>
              ) : this.props.preferredHalls.length >= this.state.availableHalls.length ? (
                <Typography variant="overline" color="error">
                  You have reached the maximum number of halls ({this.state.availableHalls.length})
                </Typography>
              ) : null}
            </Grid>
            <Grid item xs={3}>
              <SaveButton saving={this.props.saving} onClick={this.handleSaveButtonClick} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

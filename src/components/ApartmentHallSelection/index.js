import React, { Component } from 'react';
import 'date-fns';
import { Grid, Card, CardHeader, CardContent, List, Typography } from '@material-ui/core';
import HallListItem from './components/HallListItem';
import SaveButton from '../ApartAppSaveButton';
import goStalk from '../../services/goStalk';
import housing from '../../services/housing';
import '../../views/ApartmentApp/apartmentApp.css';
import '../../views/PeopleSearch/components/PeopleSearchResult/peopleSearchResult.css';

// Create a list of selection boxes to choosing preferred halls
export default class HallSelection extends Component {
  constructor(props) {
    super(props);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleSaveButtonClick = this.handleSaveButtonClick.bind(this);
    this.state = {
      // array of table data from backend
      halls: [],
    };
    this.loaderSize = 20;
  }

  async componentDidMount() {
    if (this.props.authentication) {
      try {
        // Get the halls available for apartments, filtered by the gender of the primary applicant
        const halls = await housing.getApartmentHalls(this.props.primaryUsername);
        this.setState({ halls });
      } catch {
        //! DEBUG: Fills in halls dropdown when the housing api endpoint is not yet implemented
        const halls = await goStalk.getHalls();
        this.setState({ halls });
      }
    }
  }

  handleHallInputChange = (hallSelectionValue, index) => {
    console.log(hallSelectionValue);
    console.log(index);
    this.props.onHallInputChange(hallSelectionValue, index);
  };

  handleRemove = (hall) => {
    // Make sure the chosen profile was not null
    if (hall) {
      // Send the selected profile to the parent component
      this.props.onApplicantRemove(hall);
    }
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
                      key={preferredHall}
                      index={index}
                      primaryUsername={this.props.primaryUsername}
                      preferredHalls={this.props.preferredHalls}
                      onHallInputChange={this.handleHallInputChange}
                      authentication={this.props.authentication}
                    />
                  ))
                ) : (
                  <HallListItem
                    key={0}
                    index={0}
                    primaryUsername={this.props.primaryUsername}
                    preferredHalls={this.props.preferredHalls}
                    onHallInputChange={this.handleHallInputChange}
                    authentication={this.props.authentication}
                  />
                )}
              </List>
            </Grid>
            <Grid item xs={9}>
              {this.props.saving === 'failed' ? (
                <Typography variant="overline" color="error">
                  Something when wrong while trying to save the application
                </Typography>
              ) : this.props.preferredHalls.length >= this.state.halls.length ? (
                <Typography variant="overline" color="error">
                  You have reached the maximum number of halls ({this.state.halls.length})
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

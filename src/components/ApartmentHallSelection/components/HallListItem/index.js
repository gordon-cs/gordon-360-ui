import React, { Component } from 'react';
import 'date-fns';
import {
  Grid,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListSubheader,
  MenuItem,
  TextField,
  FormControl,
  Input,
  InputLabel,
  Select,
  IconButton,
} from '@material-ui/core';
import ApartmentIcon from '@material-ui/icons/Apartment';
import ClearIcon from '@material-ui/icons/Clear';
import goStalk from '../../../../services/goStalk';
import housing from '../../../../services/housing';

export default class HallListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // array of table data from backend
      halls: [],

      // Drop-down menu values
      hallSelectionValue: '',
    };
  }

  componentDidUpdate(newProps) {
    if (newProps && this.props.preferredHalls !== newProps.preferredHalls) {
      let halls = this.state.halls.filter((hall) => !newProps.preferredHalls.includes(hall));
      this.setState({ halls });
    }
  }

  async componentDidMount() {
    if (this.props.authentication) {
      let unfilteredHalls;
      try {
        // Get the halls available for apartments, filtered by the gender of the primary applicant
        unfilteredHalls = await housing.getApartmentHalls(this.props.primaryUsername);
      } catch {
        //! DEBUG: Fills in halls dropdown when the housing api endpoint is not yet implemented
        unfilteredHalls = await goStalk.getHalls();
      }
      let halls = unfilteredHalls.filter((hall) => !this.props.preferredHalls.includes(hall));
      this.setState({ halls });
    }
  }

  handleHallInputChange = (e) => {
    this.setState({
      hallSelectionValue: e.target.value,
    });
    if (this.state.hallSelectionValue) {
      this.props.onHallInputChange(this.state.hallSelectionValue, this.props.index);
    }
  };

  handleRemove = (hall) => {
    // Make sure the chosen hall was not null
    if (hall) {
      // Send the selected hall to the parent component
      this.props.onHallRemove(hall);
    }
  };

  render() {
    const index = this.props.index;
    const hallOptions = this.state.halls.map((hall) => (
      <MenuItem value={hall} key={hall}>
        {hall}
      </MenuItem>
    ));

    return (
      <ListItem key={index} className={'list-item'}>
        <ListItemIcon>
          <ApartmentIcon color="primary" />
        </ListItemIcon>
        <Grid container alignItems="center" spacing={3}>
          <Grid item xs={1}>
            <TextField label="Rank" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
          </Grid>
          <Grid item xs={11}>
            <FormControl fullWidth>
              <InputLabel>Hall</InputLabel>
              <Select
                value={this.state.hallSelectionValue}
                onChange={this.handleHallInputChange}
                input={<Input id={'hall' + index} />}
              >
                <ListSubheader>Select a hall</ListSubheader>
                {hallOptions}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="delete">
            <ClearIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

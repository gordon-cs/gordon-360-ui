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
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.state = {
      availableHalls: [], // array of table data from backend
      hallSelectionValue: '', // Drop-down menu values
    };
  }

  componentDidUpdate(newProps) {
    if (newProps) {
      if (this.props.preferredHalls !== newProps.preferredHalls) {
        let availableHalls = this.state.availableHalls.filter(
          (hall) => !newProps.preferredHalls.includes(hall),
        );
        this.setState({ availableHalls });
      }
      let hallSelectionValue = newProps.preferredHalls[newProps.index];
      if (this.state.hallSelectionValue !== hallSelectionValue) {
        this.setState({ hallSelectionValue });
      }
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
      //Remove spaces from strings and filter out halls which have already been selected
      let availableHalls = unfilteredHalls.map((hall) => hall.trim());
      this.setState({ availableHalls });
    }
  }

  handleInputChange = (event) => {
    if (event.target.value) {
      let hallSelectionValue = event.target.value;
      let index = this.props.index;
      this.setState({ hallSelectionValue });
      this.props.onHallInputChange(hallSelectionValue, index);
    }
  };

  handleRemove = () => {
    if (this.props.index !== null) {
      // Send this list item's index to the parent component
      this.props.onHallRemove(this.props.index);
    }
  };

  render() {
    const index = this.props.index;

    return (
      <ListItem key={index} className={'list-item'}>
        <ListItemIcon>
          <ApartmentIcon color="primary" />
        </ListItemIcon>
        <Grid container alignItems="center" spacing={3}>
          <Grid item xs={1}>
            <TextField
              label="Rank"
              defaultValue={index + 1}
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            />
          </Grid>
          <Grid item xs={11}>
            <FormControl fullWidth>
              <InputLabel>Hall</InputLabel>
              <Select
                value={this.state.hallSelectionValue}
                onChange={this.handleInputChange}
                input={<Input id={'hall' + index} />}
              >
                <ListSubheader>Select a hall</ListSubheader>
                {this.state.availableHalls.map((hall) => (
                  <MenuItem value={hall} key={hall}>
                    {hall}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="delete" onClick={this.handleRemove}>
            <ClearIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

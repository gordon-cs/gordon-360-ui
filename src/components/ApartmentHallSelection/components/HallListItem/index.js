import React, { Component } from 'react';
import 'date-fns';
import {
  Grid,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  MenuItem,
  FormControl,
  Input,
  InputLabel,
  Select,
  IconButton,
} from '@material-ui/core';
import ApartmentIcon from '@material-ui/icons/Apartment';
import ClearIcon from '@material-ui/icons/Clear';

export default class HallListItem extends Component {
  constructor(props) {
    super(props);
    this.handleHallInputChange = this.handleHallInputChange.bind(this);
    this.handleRankInputChange = this.handleRankInputChange.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.state = {
      availableHalls: [], // array of table data from backend
      hallSelectionValue: '', // Drop-down menu value
      hallRankValue: this.props.index + 1,
    };
  }

  async componentDidMount() {
    // Get the hall info for this list item
    let hallInfo = this.props.preferredHalls[this.props.index];
    let hallSelectionValue = hallInfo.HallName;
    let hallRankValue = hallInfo.HallRank;
    this.setState({ hallSelectionValue, hallRankValue });
  }

  async componentDidUpdate(newProps) {
    if (newProps && this.props.preferredHalls !== newProps.preferredHalls) {
      // Get the hall info for this list item
      let hallInfo = newProps.preferredHalls[newProps.index];
      let hallSelectionValue = hallInfo.HallName;
      let hallRankValue = hallInfo.HallRank;
      this.setState({ hallSelectionValue, hallRankValue });
    }
  }

  /**
   * Callback for changes to hall name dropdown
   */
  handleHallInputChange = (event) => {
    console.log('Called "handleHallInputChange" in HallListItem component');
    if (event.target.value) {
      let hallSelectionValue = event.target.value;
      if (!this.props.preferredHalls.some((hallInfo) => hallInfo.HallName === hallSelectionValue)) {
        // Update the state only if the selected hall is NOT already in the list
        this.setState({ hallSelectionValue });
      }
      let hallRankValue = this.state.hallRankValue;
      let index = this.props.index;
      this.props.onHallInputChange(hallSelectionValue, hallRankValue, index);
    }
  };

  /**
   * Callback for changes to hall rank input field
   */
  handleRankInputChange = (event) => {
    console.log('Called "handleRankInputChange" in HallListItem component');
    if (event.target.value !== null) {
      let hallSelectionValue = this.state.hallSelectionValue;
      let hallRankValue = event.target.value;
      this.setState({ hallRankValue });
      let index = this.props.index;
      this.props.onHallInputChange(hallSelectionValue, hallRankValue, index);
    }
  };

  /**
   * Callback for hall list remove button
   */
  handleRemove = () => {
    if (this.props.index !== null) {
      // Send this list item's index to the parent component
      this.props.onHallRemove(this.props.index);
    }
  };

  render() {
    const index = this.props.index;

    const hallOptions = this.props.availableHalls.map((HallName) => (
      <MenuItem value={HallName} key={HallName}>
        {HallName}
      </MenuItem>
    ));

    const rankOptions = this.props.preferredHalls.map((_hall, i) => (
      <MenuItem value={i + 1} key={i + 1}>
        {i + 1}
      </MenuItem>
    ));

    return (
      <ListItem key={index} className={'list-item'}>
        <ListItemIcon>
          <ApartmentIcon color="primary" />
        </ListItemIcon>
        <Grid container alignItems="center" spacing={3}>
          <Grid item xs={3} sm={2}>
            <FormControl fullWidth>
              <InputLabel>Rank</InputLabel>
              <Select
                value={this.state.hallRankValue}
                onChange={this.handleRankInputChange}
                input={<Input id={'rank' + index} />}
              >
                {rankOptions}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={9} sm={10}>
            <FormControl fullWidth>
              <InputLabel>Hall</InputLabel>
              <Select
                value={this.state.hallSelectionValue}
                onChange={this.handleHallInputChange}
                input={<Input id={'hall' + index} />}
              >
                {hallOptions}
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

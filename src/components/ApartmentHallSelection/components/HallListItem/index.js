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
    this.handleMenuInputChange = this.handleMenuInputChange.bind(this);
    this.handleRankValueChange = this.handleRankValueChange.bind(this);
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
    let hallSelectionValue = hallInfo.hallName;
    let hallRankValue = hallInfo.hallRank;
    this.setState({ hallSelectionValue, hallRankValue });
  }

  async componentDidUpdate(newProps) {
    if (newProps && this.props.preferredHalls !== newProps.preferredHalls) {
      // Get the hall info for this list item
      let hallInfo = newProps.preferredHalls[newProps.index];
      let hallSelectionValue = hallInfo.hallName;
      let hallRankValue = hallInfo.hallRank;
      this.setState({ hallSelectionValue, hallRankValue });
    }
  }

  handleMenuInputChange = (event) => {
    console.log('Called "handleMenuInputChange" in HallListItem component');
    if (event.target.value) {
      let hallSelectionValue = event.target.value;
      if (!this.props.preferredHalls.some((hallInfo) => hallInfo.hallName === hallSelectionValue)) {
        // Update the state only if the
        this.setState({ hallSelectionValue });
      }
      let hallRankValue = this.state.hallRankValue;
      let index = this.props.index;
      this.props.onHallInputChange(hallSelectionValue, hallRankValue, index);
    }
  };

  handleRankValueChange = (event) => {
    console.log('Called "handleRankValueChange" in HallListItem component');
    if (event.target.value !== null) {
      let hallSelectionValue = this.state.hallSelectionValue;
      let hallRankValue = event.target.value;
      this.setState({ hallRankValue });
      let index = this.props.index;
      this.props.onHallInputChange(hallSelectionValue, hallRankValue, index);
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
              fullWidth
              label="Rank"
              value={this.state.hallRankValue}
              onFocus={(event) => {
                event.target.select();
              }}
              onChange={this.handleRankValueChange}
              inputProps={{ inputmode: 'numeric', pattern: '[0-9]*' }}
            />
          </Grid>
          <Grid item xs={11}>
            <FormControl fullWidth>
              <InputLabel>Hall</InputLabel>
              <Select
                value={this.state.hallSelectionValue}
                onChange={this.handleMenuInputChange}
                input={<Input id={'hall' + index} />}
              >
                <ListSubheader>Select a hall</ListSubheader>
                {this.props.availableHalls.map((hallName) => (
                  <MenuItem value={hallName} key={hallName}>
                    {hallName}
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

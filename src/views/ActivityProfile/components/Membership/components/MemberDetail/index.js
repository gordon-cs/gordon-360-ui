import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Checkbox from 'material-ui/Checkbox';
import ExpansionPanel, {
  ExpansionPanelDetails,
  ExpansionPanelSummary,
} from 'material-ui/ExpansionPanel';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import { FormControlLabel } from 'material-ui/Form';
import Grid from 'material-ui/Grid';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';

import { gordonColors } from '../../../../../../theme';
import user from '../../../../../../services/user';

export default class MemberDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      admin: false,
      checkedA: true,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    const leaveButton = {
      background: gordonColors.secondary.red,
      color: 'white',
    };
    const { id } = user.getLocalInfo();
    let showLeaveButton = false;
    if (this.props.member.IDNumber.toString() === id) {
      showLeaveButton = true;
    } else {
      showLeaveButton = false;
    }
    let leave;
    if (showLeaveButton) {
      leave = (
        <Button style={leaveButton} raised>
          LEAVE
        </Button>
      );
    } else {
      leave = (
        <Typography>You do not have permission to see any details about this member</Typography>
      );
    }
    if (this.state.admin) {
      leave = (
        <Grid container>
          <Grid item>
            <Button color="primary" raised>
              Edit
            </Button>
          </Grid>
          <Grid item>
            <Button style={leaveButton} raised>
              Remove
            </Button>
          </Grid>
          <Grid item>
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.checkedA}
                  onChange={this.handleChange('checkedA')}
                  value="checkedA"
                  color="primary"
                />
              }
              label="Group Admin"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography>TITLE/COMMENT:</Typography>
          </Grid>
        </Grid>
      );
    }
    return (
      <ExpansionPanel defaultExpanded={showLeaveButton || this.state.admin}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Grid container>
            <Grid item xs={8} sm={9} md={10}>
              <Typography>
                {' '}
                {this.props.member.FirstName} {this.props.member.LastName}
              </Typography>
            </Grid>
            <Grid item xs={4} sm={3} md={2}>
              <Typography>{this.props.member.ParticipationDescription} </Typography>
            </Grid>
          </Grid>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>{leave}</ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

MemberDetail.propTypes = {
  member: PropTypes.shape({
    AccountPrivate: PropTypes.number,
    ActivityCode: PropTypes.string.isRequired,
    ActivityDescription: PropTypes.string.isRequired,
    ActivityImagePath: PropTypes.string.isRequired,
    Description: PropTypes.string,
    EndDate: PropTypes.string,
    FirstName: PropTypes.string.isRequired,
    GroupAdmin: PropTypes.bool.isRequired,
    IDNumber: PropTypes.number,
    LastName: PropTypes.string.isRequired,
    MembershipID: PropTypes.number,
    Participation: PropTypes.string.isRequired,
    ParticipationDescription: PropTypes.string.isRequired,
    Privacy: PropTypes.string,
    SessionCode: PropTypes.string.isRequired,
    SessionDescription: PropTypes.string.isRequired,
    StartDate: PropTypes.string.isRequired,
  }).isRequired,
};

import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Checkbox from 'material-ui/Checkbox';
import Dialog, { DialogContent, DialogTitle } from 'material-ui/Dialog';
import ExpansionPanel, {
  ExpansionPanelDetails,
  ExpansionPanelSummary,
} from 'material-ui/ExpansionPanel';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import { FormControl, FormControlLabel } from 'material-ui/Form';
import Grid from 'material-ui/Grid';
import { MenuItem } from 'material-ui/Menu';
import PropTypes from 'prop-types';
import Select from 'material-ui/Select';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';

import { gordonColors } from '../../../../../../theme';
import user from '../../../../../../services/user';
import membership from '../../../../../../services/membership';

export default class MemberDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openEdit: false,
      alertLeave: false,
      admin: false,
      groupAdmin: true,
      participationLevel: '',
      alertRemove: false,
      titleComment: '',
    };
    this.confirmLeave = this.confirmLeave.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleText = this.handleText.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onLeave = this.onLeave.bind(this);
    this.onRemove = this.onRemove.bind(this);
  }

  async componentWillMount() {
    this.setState({
      admin: this.props.admin,
      groupAdmin: this.props.groupAdmin,
      participationLevel: this.props.member.ParticipationDescription,
      titleComment: this.props.Description,
    });
  }

  handleChange = name => {
    return event => {
      this.setState({ [name]: event.target.checked });
      let data = {
        Membership_ID: this.props.member.MembershipID,
        ACT_CDE: this.props.member.ActivityCode,
        SESS_CDE: this.props.member.SessionCode,
        ID_NUM: this.props.member.IDNumber,
        PART_CDE: this.props.member.Participation,
      };
      membership.toggleGroupAdmin(this.props.member.MembershipID, data);
      // this.forceUpdate(); // Not working
    };
  };

  handleClick() {
    this.setState({ openEdit: true });
  }

  handleSelect = name => event => {
    this.setState({ participationLevel: event.target.value });
  };

  handleText = name => event => {
    this.setState({ [name]: event.target.value });
  };

  onChange = event => {
    this.setState({ participationLevel: event.target.value });
  };

  // Closes dialog boxes and resets as if no changes were made
  onClose() {
    this.setState({
      alertLeave: false,
      alertRemove: false,
      openEdit: false,
      participationLevel: this.props.member.ParticipationDescription,
      titleComment: '',
    });
  }

  // Opens dialog box asking if certain user wants to leave
  onLeave() {
    this.setState({ alertLeave: true });
  }

  // Called when user confirms removal
  confirmLeave() {
    membership.remove(this.props.member.MembershipID);
    this.onClose();
  }

  // Opens dialog box asking if certain admin wants to remove member
  onRemove() {
    this.setState({ alertRemove: true });
  }

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
        <Grid container>
          <Grid item>
            <Button style={leaveButton} onClick={this.onLeave} raised>
              LEAVE
            </Button>
            <Dialog
              open={this.state.alertLeave}
              keepMounted
              align="center"
              onBackdropClick={this.onClose}
            >
              <DialogTitle>Are you sure you want to leave the activity?</DialogTitle>
              <DialogContent>
                <Grid container>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    <Button color="primary" onClick={this.onClose} raised>
                      No, stay
                    </Button>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    <Button raised onClick={this.confirmLeave} style={leaveButton}>
                      Yes, leave
                    </Button>
                  </Grid>
                </Grid>
              </DialogContent>
            </Dialog>
          </Grid>
        </Grid>
      );
    } else {
      leave = (
        <Typography>You do not have permission to see any details about this member</Typography>
      );
    }
    const formControl = {
      padding: 10,
    };
    if (this.state.admin) {
      let disabled = false;
      if (this.state.participationLevel === 'Guest') {
        disabled = true;
      }
      leave = (
        <Grid container>
          <Grid item>
            <Button color="primary" onClick={this.handleClick} raised>
              Edit
            </Button>
            <Dialog open={this.state.openEdit} keepMounted align="center">
              <DialogTitle>
                Edit {this.props.member.FirstName} {this.props.member.LastName} ({
                  this.props.member.ParticipationDescription
                })
              </DialogTitle>
              <DialogContent>
                <Grid container align="center" padding={6}>
                  <Grid item xs={12} sm={12} md={12} lg={12} padding={6}>
                    <Typography>Participation (Required)</Typography>
                    <Grid item padding={6} align="center">
                      <FormControl fullWidth style={formControl}>
                        <Select
                          value={this.state.participationLevel}
                          onChange={this.handleSelect('participationLevel')}
                          renderValue={value => `${value}`}
                        >
                          <MenuItem value="Advisor">Advisor</MenuItem>
                          <MenuItem value="Guest">Guest</MenuItem>
                          <MenuItem value="Leader">Leader</MenuItem>
                          <MenuItem value="Member">Member</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item align="center">
                      <Typography>Title/Comment: (Optional)</Typography>
                      <TextField
                        fullWidth
                        onChange={this.handleText('titleComment')}
                        style={formControl}
                        value={this.state.titleComment}
                      />
                    </Grid>
                    <Grid item style={formControl}>
                      <Button color="primary" raised>
                        SUBMIT CHANGES
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={12} style={formControl}>
                      <Button color="primary" onClick={this.onClose} raised>
                        CANCEL
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </DialogContent>
            </Dialog>
          </Grid>
          <Grid item>
            <Button style={leaveButton} onClick={this.onRemove} raised>
              Remove
            </Button>
            <Dialog open={this.state.alertRemove} keepMounted align="center">
              <DialogTitle>
                Are you sure you want to remove {this.props.member.FirstName}{' '}
                {this.props.member.LastName} (
                {this.props.member.ParticipationDescription}) from this activity?
              </DialogTitle>
              <DialogContent>
                <Grid container>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    <Button color="primary" onClick={this.confirmLeave} raised>
                      OK
                    </Button>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    <Button onClick={this.onClose} raised>
                      CANCEL
                    </Button>
                  </Grid>
                </Grid>
              </DialogContent>
            </Dialog>
          </Grid>
          <Grid item>
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.groupAdmin}
                  color="primary"
                  disabled={disabled}
                  onChange={this.handleChange('groupAdmin')}
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

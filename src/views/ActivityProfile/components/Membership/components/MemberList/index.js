import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import { gordonColors } from '../../../../../../theme';
import user from '../../../../../../services/user';
import membership from '../../../../../../services/membership';

export default class MemberList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openEdit: false,
      alertLeave: false,
      admin: false,
      groupAdmin: false,
      participationDescription: '',
      participation: '',
      alertRemove: false,
      titleComment: '',
    };
    this.confirmLeave = this.confirmLeave.bind(this);
    this.handleToggleGroupAdmin = this.handleToggleGroupAdmin.bind(this);
    this.openEditMember = this.openEditMember.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleText = this.handleText.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onEditMember = this.onEditMember.bind(this);
    this.alertLeave = this.alertLeave.bind(this);
    this.onRemove = this.onRemove.bind(this);
    this.breakpointWidth = 810;
  }

  async componentWillMount() {
    this.setState({
      admin: this.props.admin,
      groupAdmin: this.props.groupAdmin,
      participationDescription: this.props.member.ParticipationDescription,
      participation: this.props.member.Participation,
      titleComment: this.props.member.Description,
    });
  }

  // Called when checkbox for Group Admin clicked
  async handleToggleGroupAdmin(event) {
    this.setState({ groupAdmin: event.target.checked });
    let data = {
      MEMBERSHIP_ID: this.props.member.MembershipID,
      ACT_CDE: this.props.member.ActivityCode,
      SESS_CDE: this.props.member.SessionCode,
      ID_NUM: this.props.member.IDNumber,
      PART_CDE: this.props.member.Participation,
    };
    await membership.toggleGroupAdmin(this.props.member.MembershipID, data);
    this.refresh();
  }

  openEditMember() {
    this.setState({ openEdit: true });
  }

  // Updates participation level dropdown
  handleSelect = event => {
    this.setState({ participationDescription: event.target.value });
    switch (event.target.value) {
      case 'Member':
        this.setState({ participation: 'MEMBR' });
        break;
      case 'Leader':
        this.setState({ participation: 'LEAD' });
        break;
      case 'Advisor':
        this.setState({ participation: 'ADV' });
        break;
      default:
        this.setState({ participation: 'GUEST' });
    }
  };

  handleText = name => event => {
    this.setState({ [name]: event.target.value });
  };

  // Closes dialog boxes and resets as if no changes were made
  onClose() {
    this.setState({
      alertLeave: false,
      alertRemove: false,
      openEdit: false,
      participationDescription: this.props.member.ParticipationDescription,
      titleComment: this.props.member.Description,
    });
  }

  // Called when updated details submitted in Edit Membership dialog box
  async onEditMember() {
    let data = {
      MEMBERSHIP_ID: this.props.member.MembershipID,
      ACT_CDE: this.props.member.ActivityCode,
      SESS_CDE: this.props.member.SessionCode,
      ID_NUM: this.props.member.IDNumber,
      PART_CDE: this.state.participation,
      COMMENT_TXT: this.state.titleComment,
    };
    await membership.editMembership(this.props.member.MembershipID, data);
    this.onClose();
    this.refresh();
  }

  // Opens dialog box asking if certain user wants to leave
  alertLeave() {
    this.setState({ alertLeave: true });
  }

  // Called when user confirms removal
  async confirmLeave() {
    await membership.remove(this.props.member.MembershipID);
    this.onClose();
    this.refresh();
  }

  // Opens dialog box asking if certain admin wants to remove member
  onRemove() {
    this.setState({ alertRemove: true });
  }

  refresh() {
    window.location.reload();
  }

  render() {
    let content;
    const rowStyle = {
      padding: '10px',
    };
    const redButton = {
      background: gordonColors.secondary.red,
      color: 'white',
    };
    const outlinedRedButton = {
      color: gordonColors.secondary.red,
    };
    let showLeaveButton = false;
    if (this.props.member.IDNumber.toString() === user.getLocalInfo().id) {
      showLeaveButton = true;
    } else {
      showLeaveButton = false;
    }
    let options;
    if (showLeaveButton) {
      options = (
        <Grid container>
          <Grid item>
            <Button variant="contained" style={redButton} onClick={this.alertLeave}>
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
                    <Button variant="contained" color="primary" onClick={this.onClose}>
                      No, stay
                    </Button>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    <Button variant="contained" onClick={this.confirmLeave} style={redButton}>
                      Yes, leave
                    </Button>
                  </Grid>
                </Grid>
              </DialogContent>
            </Dialog>
          </Grid>
        </Grid>
      );
    }
    const formControl = {
      padding: 10,
    };
    if (this.state.admin) {
      let disabled = false;
      if (
        this.state.participationDescription === 'Guest' ||
        this.state.participationDescription === 'Member'
      ) {
        disabled = true;
        // Can't make guests or members a group admin
      }
      const buttons = (
        <Grid item>
          <Grid container spacing={8} justify="center">
            <Grid item>
              <Button color="primary" onClick={this.openEditMember} variant="outlined" size="small">
                Edit
              </Button>
              <Dialog open={this.state.openEdit} keepMounted align="center">
                <DialogTitle>
                  Edit {this.props.member.FirstName} {this.props.member.LastName} (
                  {this.props.member.ParticipationDescription})
                </DialogTitle>
                <DialogContent>
                  <Grid container align="center" padding={6}>
                    <Grid item xs={12} sm={12} md={12} lg={12} padding={6}>
                      <Typography>Participation (Required)</Typography>
                      <Grid item padding={6} align="center">
                        <FormControl fullWidth style={formControl}>
                          <Select
                            value={this.state.participationDescription}
                            onChange={this.handleSelect}
                          >
                            <MenuItem value="Advisor">Advisor</MenuItem>
                            <MenuItem value="Leader">Leader</MenuItem>
                            <MenuItem value="Member">Member</MenuItem>
                            <MenuItem value="Guest">Guest</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item align="center">
                        <Typography>Title/Comment: (Optional)</Typography>
                        <TextField
                          fullWidth
                          onChange={this.handleText('titleComment')}
                          style={formControl}
                          defaultValue={this.props.member.Description}
                        />
                      </Grid>
                      <Grid item style={formControl}>
                        <Button variant="contained" color="primary" onClick={this.onEditMember}>
                          SUBMIT CHANGES
                        </Button>
                      </Grid>
                      <Grid item xs={12} sm={12} style={formControl}>
                        <Button variant="contained" color="primary" onClick={this.onClose}>
                          CANCEL
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </DialogContent>
              </Dialog>
            </Grid>

            <Grid item>
              <Button
                style={outlinedRedButton}
                onClick={this.onRemove}
                variant="outlined"
                size="small"
              >
                Remove
              </Button>
              <Dialog open={this.state.alertRemove} keepMounted align="center">
                <DialogTitle>
                  Are you sure you want to remove {this.props.member.FirstName}{' '}
                  {this.props.member.LastName} ({this.props.member.ParticipationDescription}) from
                  this activity?
                </DialogTitle>
                <DialogContent>
                  <Grid container>
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                      <Button variant="contained" color="primary" onClick={this.confirmLeave}>
                        OK
                      </Button>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                      <Button variant="contained" onClick={this.onClose}>
                        CANCEL
                      </Button>
                    </Grid>
                  </Grid>
                </DialogContent>
              </Dialog>
            </Grid>
          </Grid>
        </Grid>
      );
      options = (
        <Grid container alignItems="center">
          <Grid item sm={3} align="center">
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.groupAdmin}
                  color="primary"
                  disabled={disabled}
                  onChange={this.handleToggleGroupAdmin}
                />
              }
            />
          </Grid>
          {buttons}
        </Grid>
      );
      content = (
        <section>
          <Grid container style={rowStyle} direction="row" alignItems="center">
            <Grid item xs={3} style={rowStyle}>
              <Typography>
                {this.props.member.FirstName} {this.props.member.LastName}
              </Typography>
            </Grid>
            <Grid item xs={2} style={rowStyle}>
              <Typography>{this.state.participationDescription}</Typography>
            </Grid>
            <Grid item xs={/*2*/3} style={rowStyle}>
              <Typography>{this.state.titleComment}</Typography>
            </Grid>
            /*<Grid item xs={1} style={rowStyle}>
              <Typography>{this.props.member.Mail_Location}</Typography>
            </Grid>*/
            <Grid item xs={4} style={rowStyle}>
              {options}
            </Grid>
          </Grid>
          <Grid>
            <Divider />
          </Grid>
        </section>
      );
      if (window.innerWidth < this.breakpointWidth) {
        options = (
          <Grid container alignItems="center" spacing={8}>
            <Grid item>{buttons}</Grid>
            <Grid item sm={3} align="center">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.groupAdmin}
                    color="primary"
                    disabled={disabled}
                    onChange={this.handleToggleGroupAdmin}
                  />
                }
                label="Group Admin"
              />
            </Grid>
          </Grid>
        );
        content = (
          <ExpansionPanel defaultExpanded={showLeaveButton || this.state.admin}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Grid container>
                <Grid item xs={/*6*/8} sm={/*7*/9} md={/*8*/10}>
                  <Typography>
                    {this.props.member.FirstName} {this.props.member.LastName}
                  </Typography>
                </Grid>
                <Grid item xs={4} sm={3} md={2}>
                  <Typography>{this.props.member.ParticipationDescription} </Typography>
                </Grid>
                /*<Grid item xs={2} sm={2} md={2}>
                  <Typography>Box #{this.props.member.Mail_Location}</Typography>
                </Grid>*/
              </Grid>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Grid container direction="column">
                <Grid item>{options}</Grid>
                <Grid item>{this.state.titleComment}</Grid>
              </Grid>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        );
      }
    } else {
      content = (
        <section>
          <Grid container style={rowStyle} direction="row" alignItems="center">
            <Grid item xs={/*4*/6} sm={/*4*/6} style={rowStyle}>
              <Typography>
                {this.props.member.FirstName} {this.props.member.LastName}
              </Typography>
            </Grid>
            <Grid item xs={/*4*/6} sm={4} style={rowStyle}>
              <Typography>{this.state.participationDescription}</Typography>
            </Grid>
            /*<Grid item xs={4} sm={2} style={rowStyle}>
              <Typography>Box #{this.props.member.Mail_Location}</Typography>
            </Grid>*/
            <Grid item xs={2} sm={2} style={rowStyle}>
              {options}
            </Grid>
          </Grid>
          <Grid>
            <Divider />
          </Grid>
        </section>
      );
    }
    return <Grid>{content}</Grid>;
  }
}

MemberList.propTypes = {
  member: PropTypes.shape({
    AccountPrivate: PropTypes.number,
    ActivityCode: PropTypes.string.isRequired,
    ActivityDescription: PropTypes.string.isRequired,
    ActivityImagePath: PropTypes.string,
    Description: PropTypes.string,
    EndDate: PropTypes.string,
    FirstName: PropTypes.string.isRequired,
    GroupAdmin: PropTypes.bool,
    IDNumber: PropTypes.number,
    LastName: PropTypes.string.isRequired,
    MembershipID: PropTypes.number,
    Participation: PropTypes.string.isRequired,
    ParticipationDescription: PropTypes.string.isRequired,
    Privacy: PropTypes.string,
    SessionCode: PropTypes.string.isRequired,
    SessionDescription: PropTypes.string.isRequired,
    StartDate: PropTypes.string,
  }).isRequired,
};

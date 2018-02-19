import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Collapse from 'material-ui/transitions/Collapse';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';

import '../../../../activity-profile.css';
import user from '../../../../../../services/user';

export default class MemberDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.handleExpandClick = this.handleExpandClick.bind(this);
  }
  handleExpandClick() {
    const { id } = user.getLocalInfo();
    let showLeaveButton = false;
    if (this.props.member.IDNumber.toString() === id) {
      showLeaveButton = true;
    } else {
      showLeaveButton = false;
    }
    if (showLeaveButton) {
      this.setState({ open: !this.state.open });
    }
  }

  render() {
    return (
      <Card>
        <CardContent onClick={this.handleExpandClick}>
          <Typography>
            {this.props.member.FirstName} {this.props.member.LastName}
          </Typography>
          <Typography>{this.props.member.ParticipationDescription} </Typography>
        </CardContent>
        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
          <CardContent padding={0}>
            <CardActions padding={0}>
              <Button className="leave" raised>
                LEAVE
              </Button>
            </CardActions>
          </CardContent>
        </Collapse>
      </Card>
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

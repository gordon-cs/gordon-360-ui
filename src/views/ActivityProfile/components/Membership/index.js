import React, { Component } from 'react';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Typography from 'material-ui/Typography';

import GordonLoader from '../../../../components/Loader';

export default class Membership extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activityMembers: [],
    };
  }
  componentWillMount() {
    this.loadMembers();
  }
  async loadMembers() {
    this.setState({ loading: true });
    try {
      this.setState({ loading: false });
    } catch (error) {
      this.setState({ error });
    }
  }
  render() {
    const { members } = this.props;
    if (this.state.error) {
      throw this.state.error;
    }

    let content;
    if (this.state.loading === true) {
      content = <GordonLoader />;
    } else {
      if (members.length > 0) {
        content = (
          <section className="gordon-activity-profile">
            <Table className="table">
              <TableHead>
                <TableRow>
                  <TableCell>FIRST NAME</TableCell>
                  <TableCell>LAST NAME</TableCell>
                  <TableCell>PARTICIPATION</TableCell>
                  <TableCell> </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {members.map(member => (
                  <TableRow key={member.MembershipID}>
                    <TableCell>{member.FirstName}</TableCell>
                    <TableCell>{member.LastName}</TableCell>
                    <TableCell>{member.ParticipationDescription}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </section>
        );
      }
    }
    return <section>{content}</section>;
  }
}

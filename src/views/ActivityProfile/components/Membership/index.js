import React, { Component } from 'react';

import GordonLoader from '../../../../components/Loader';
import '../../activity-profile.css';
import MemberDetail from './components/MemberDetail';
// import membership from '../../../../services/membership';

export default class Membership extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activityMembers: [],
      open: false,
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
          <section>
            {members.map(groupMember => (
              <MemberDetail member={groupMember} key={groupMember.MembershipID} />
            ))}
          </section>
        );
      }
    }
    return <section>{content}</section>;
  }
}

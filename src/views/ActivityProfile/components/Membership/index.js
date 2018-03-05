import React, { Component } from 'react';

import GordonLoader from '../../../../components/Loader';
import '../../activity-profile.css';
import MemberDetail from './components/MemberDetail';
import membership from '../../../../services/membership';
import user from '../../../../services/user';

export default class Membership extends Component {
  constructor(props) {
    super(props);

    this.searchUser = this.searchUser.bind(this);

    this.state = {
      activityMembers: [],
      open: false,
      mode: '',
      sessionCode: null,
      activityCode: null,
      isMember: false,
      id: '',
    };
  }

  async componentWillMount() {
    this.loadMembers();
  }

  searchUser(id, sessionCode, activityCode) {
    return membership.search(id, sessionCode, activityCode);
  }

  async loadMembers() {
    this.setState({ loading: true });
    try {
      this.setState({ loading: false });
      const id = await user.getLocalInfo().id;
      this.setState({ id });
      const isMember = await membership.search(
        this.state.id,
        this.props.sessionCode,
        this.props.activityCode,
      );
      this.setState({ isMember });
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
      if (this.state.isMember) {
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

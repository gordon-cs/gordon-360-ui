import React, { Component } from 'react';

import GordonLoader from '../../../../components/Loader';
import '../../activity-profile.css';
import MemberDetail from './components/MemberDetail';
import membership from '../../../../services/membership';
import user from '../../../../services/user';

export default class Membership extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activityMembers: [],
      open: false,
      mode: '',
      sessionCode: null,
      activityCode: null,
      // userMembership: [],
      // userId: null,
    };
  }

  componentWillMount() {
    this.loadMembers();
    this.searchUser();
    // const userMembership = membership.getIndividualMembership();
    // this.setState(userMembership);
  }

  searchUser(id, sessionCode, activityCode) {
    return membership.search(id, sessionCode, activityCode);
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
    const { members, sessionCode, activityCode } = this.props;
    if (this.state.error) {
      throw this.state.error;
    }
    let content;
    if (this.state.loading === true) {
      content = <GordonLoader />;
    } else {
      const id = user.getLocalInfo().id;
      console.log('Before' + id);
      // console.log(this.searchUser(id, sessionCode, activityCode))
      // console.log(membership.search(id, sessionCode, activityCode));
      let isMemberPromise = this.searchUser(id, sessionCode, activityCode);
      console.log('AFter search isMember: ');
      console.log(isMemberPromise);
      // isMemberPromise.then(function(result) {
      // console.log(result)
      if (members.length > 0) {
        // Add result once working
        console.log('content =');
        content = (
          <section>
            {members.map(groupMember => (
              <MemberDetail member={groupMember} key={groupMember.MembershipID} />
            ))}
          </section>
        );
      }
      // });
    }
    return <section>{content}</section>;
  }
}

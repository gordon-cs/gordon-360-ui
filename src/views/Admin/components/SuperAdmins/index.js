import React, { Component } from 'react';
import SuperAdminList from './components/SuperAdminList';
import GordonLoader from '../../../../components/Loader';
import admin from '../../../../services/admin';

export default class SuperAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      admins: [],
    };
  }

  componentWillMount() {
    this.loadAdmins();
  }

  async loadAdmins() {
    const adminList = await admin.getAdmins();
    this.setState({ loading: false, admins: adminList });
  }

  render() {
    let content;

    if (this.state.loading === true) {
      content = <GordonLoader />;
    } else {
      content = this.state.admins.map(superadmin => (
        <div>
          <SuperAdminList Admin={superadmin} />
        </div>
      ));
    }

    return <div>{content}</div>;
  }
}

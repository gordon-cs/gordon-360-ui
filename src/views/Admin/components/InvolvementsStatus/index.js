import React, { Component } from 'react';
import { gordonColors } from 'theme';
import GordonLoader from 'components/Loader';
import activity from 'services/activity';
import InvolvementStatusList from './components/InvolvementStatusList/index';
import { Typography, Divider, Card } from '@material-ui/core';

export default class InvolvementsStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      InvolvementStatusList: [],
    };
  }

  componentDidMount() {
    this.loadInvolvementsOfThisStatus();
  }

  async loadInvolvementsOfThisStatus() {
    if (this.props.status === 'Open') {
      this.setState({ loading: true });
      const InvolvementStatusList = await activity.getOpen(); //Retrieve all open involvements
      this.setState({ InvolvementStatusList, loading: false });
    } else if (this.props.status === 'Closed') {
      this.setState({ loading: true });
      const InvolvementStatusList = await activity.getClosed(); //Retrieve all closed involvements
      this.setState({ InvolvementStatusList, loading: false });
    }
  }

  render() {
    const headerStyle = {
      backgroundColor: gordonColors.primary.blue,
      color: '#FFF',
      padding: '10px',
    };

    let content;
    const { status } = this.props;

    if (this.state.loading === true) {
      content = <GordonLoader />;
    } else if (this.state.InvolvementStatusList.length > 0) {
      content = this.state.InvolvementStatusList.map((activity) => (
        <div>
          <InvolvementStatusList Activity={activity} />
          <Divider />
        </div>
      ));
    } else {
      content = <Typography variant="h5">No {status} Involvements To Show</Typography>;
    }

    return (
      <Card>
        <div>
          <div style={headerStyle}>
            <Typography variant="body2" align="center" style={headerStyle}>
              {status} Involvements
            </Typography>
          </div>
          {content}
        </div>
      </Card>
    );
  }
}

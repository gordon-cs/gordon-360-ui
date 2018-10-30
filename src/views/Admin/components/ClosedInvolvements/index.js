import Grid from '@material-ui/core/Grid';
import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';

import GordonLoader from '../../../../components/Loader';
import activity from '../../../../services/activity';
import InvolvementStatusList from '../InvolvementStatusList';

export default class ClosedInvolvements extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      InvolvementStatusList: [],
    };
  }

  componentWillMount() {
    this.loadOpen();
  }

  async loadOpen() {
    this.setState({ loading: true });
    const InvolvementStatusList = await activity.getClosed(); //Retrieve all closed involvements
    this.setState({ InvolvementStatusList, loading: false });
  }

  render() {
    console.log(this.state);
    let content;
    if (this.state.loading === true) {
      content = <GordonLoader />;
    } else if (this.state.InvolvementStatusList.length > 0) {
      content = this.state.InvolvementStatusList.map(activity => (
        <InvolvementStatusList Activity={activity} />
      ));
    } else {
      content = (
        <Grid item>
          <Typography variant="display1">No Closed Involvements To Show</Typography>
        </Grid>
      );
    }

    return <section>{content}</section>;
  }
}

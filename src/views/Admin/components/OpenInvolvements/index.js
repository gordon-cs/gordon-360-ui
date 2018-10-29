import Grid from '@material-ui/core/Grid';
import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';

import GordonLoader from '../../../../components/Loader';
import activity from '../../../../services/activity';
import OpenInvolvementsList from './components/OpenInvolvementsList';

export default class OpenInvolvements extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      openInvolvementsList: [],
    };
  }

  componentWillMount() {
    this.loadOpen();
  }

  async loadOpen() {
    this.setState({ loading: true });
    const openInvolvementsList = await activity.getOpen(); //Retrieve all open involvements
    this.setState({ openInvolvementsList, loading: false });
  }

  render() {
    console.log(this.state);
    let content;
    if (this.state.loading === true) {
      content = <GordonLoader />;
    } else if (this.state.openInvolvementsList.length > 0) {
      content = this.state.openInvolvementsList.map(activity => (
        <OpenInvolvementsList Activity={activity} />
      ));
    } else {
      content = (
        <Grid item>
          <Typography variant="display1">No Open Involvements To Show</Typography>
        </Grid>
      );
    }

    return <section>{content}</section>;
  }
}

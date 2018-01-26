import Grid from 'material-ui/Grid';
import React, { Component } from 'react';
import Divider from 'material-ui/Divider/Divider';
import Card, { CardMedia, CardContent, CardHeader } from 'material-ui/Card';

import { gordonColors } from './../../theme';
import user from './../../services/user';
import GordonLoader from './../../components/Loader';

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: null,
      loading: true,
      profile: {},
    };
  }
  componentWillMount() {
    this.loadProfile();
  }
  async loadProfile() {
    this.setState({ loading: true });
    try {
      const profile = await user.getProfileInfo();
      this.setState({ loading: false, profile });
      const [{ def: defaultImage, pref: preferredImage }] = await Promise.all([
        await user.getImage(),
      ]);

      const image = preferredImage || defaultImage;
      this.setState({ image });
    } catch (error) {
      this.setState({ error });
    }
  }
  render() {
    console.log(this.state.profile);
    return (
      <div>
        <Grid container>
          <Grid item xs={12} sm={10}>
            <Card>
              <CardContent>
                <CardHeader
                  title={this.state.profile.fullName}
                  subheader={this.state.profile.Class}
                />
              </CardContent>
              <CardMedia>
                <img src={`data:image/jpg;base64,${this.state.image}`} alt="" />
              </CardMedia>
            </Card>
          </Grid>
          <Grid item xs={12} sm={5}>
            <Card>
              <CardContent>
                <CardHeader title="CL&W Credits" subheader="hey" />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={5}>
            <Card>
              <CardContent>
                <CardHeader title="CL&W Credits" subheader="hey" />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

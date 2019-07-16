import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import victory from '../../../../services/victory';
import { gordonColors } from '../../../../theme';
import { CardContent } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

//icons
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import LocalActivityIcon from '@material-ui/icons/LocalActivity';
import EventIcon from '@material-ui/icons/Event';
import './VictoryPromise.css';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';

export default class VictoryPromise extends Component {
  constructor(props) {
    super(props);

    this.state = {
      CC: null,
      IM: null,
      LS: null,
      LW: null,
      CCColor: gordonColors.neutral.lightGray,
      IMColor: gordonColors.neutral.lightGray,
      LSColor: gordonColors.neutral.lightGray,
      LWColor: gordonColors.neutral.lightGray,
    };
  }

  componentWillMount() {
    this.getVPScores();
  }

  async getVPScores() {
    const scores = await victory.getVPScore();
    const CC = scores[0].TOTAL_VP_CC_SCORE;
    const IM = scores[0].TOTAL_VP_IM_SCORE;
    const LS = scores[0].TOTAL_VP_LS_SCORE;
    const LW = scores[0].TOTAL_VP_LW_SCORE;
    this.setState({ CC, IM, LS, LW });
    let highlight = gordonColors.secondary.green;

    if (CC > 0) {
      this.setState({ CCColor: highlight });
    }
    if (IM > 0) {
      this.setState({ IMColor: highlight });
    }
    if (LS > 0) {
      this.setState({ LSColor: highlight });
    }
    if (LW > 0) {
      this.setState({ LWColor: highlight });
    }
  }

  description() {}
  render() {
    /*
    let daysColor = gordonColors.primary.blue;
    let swipesColor = gordonColors.secondary.green;
    let dollarsColor = gordonColors.secondary.yellow;
    let guestColor = gordonColors.secondary.orange;
    let emptyColor = gordonColors.neutral.lightGray;
    */
    const headerStyle = {
      backgroundColor: gordonColors.primary.blue,
      color: '#FFF',
      padding: '10px',
      alignItems: 'stretch',
    };

    const HoverText = withStyles(theme => ({
      tooltip: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
      },
    }))(Tooltip);

    /*
    const root = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-end',
    };*/
    //style={{ fontSize: 50, color: this.state.CCColor}}
    // style={{ fontSize: 50, color: this.state.CCColor}} onMouseOver={() => {console.log('Mouse over'); }}
    return (
      <Card /*className="card"*/>
        <Card /*className="header"*/>
          <div style={headerStyle}>
            <Typography style={headerStyle}>VICTORY PROMISE</Typography>
          </div>
        </Card>
        <CardContent className="card-content">
          <Grid container justify="center">
            <HoverText
              title={
                <React.Fragment>
                  <Typography color="inherit">Christian Character</Typography>
                  {"It's very engaging. Right?"}
                </React.Fragment>
              }
            >
              <HomeIcon
                className="vpdesign"
                style={{ fontSize: 50, color: this.state.CCColor }}
                onClick={this.description()}
              />
            </HoverText>
            <HoverText
              title={
                <React.Fragment>
                  <Typography color="inherit">Intellectual Maturity</Typography>
                  {"It's very engaging. Right?"}
                </React.Fragment>
              }
            >
              <PeopleIcon
                className="vpdesign"
                style={{ fontSize: 50, color: this.state.IMColor }}
                onClick={this.description()}
              />
            </HoverText>
            <HoverText
              title={
                <React.Fragment>
                  <Typography color="inherit">Lives of Service</Typography>
                  {"It's very engaging. Right?"}
                </React.Fragment>
              }
            >
              <LocalActivityIcon
                className="vpdesign"
                style={{ fontSize: 50, color: this.state.LSColor }}
                onClick={this.description()}
              />
            </HoverText>
            <HoverText
              title={
                <React.Fragment>
                  <Typography color="inherit">Leadership Worldwide</Typography>
                  {"It's very engaging. Right?"}
                </React.Fragment>
              }
            >
              <EventIcon
                className="vpdesign"
                style={{ fontSize: 50, color: this.state.LWColor }}
                onClick={this.description()}
              />
            </HoverText>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

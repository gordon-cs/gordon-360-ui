import Grid from '@material-ui/core/Grid';
import React from 'react';
import CardHeader from '@material-ui/core/CardHeader';
import Tooltip from '@material-ui/core/Tooltip';
import { gordonColors } from '../../../../theme';
import { Polar } from 'react-chartjs-2';
import victory from '../../../../services/victory';
import './VictoryPromise.css';
import Button from '@material-ui/core/Button';
import './VictoryPromise.css';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

export default class VictoryPromiseDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: [
        'Christian Character',
        'Intellectual Maturity',
        'Lives of Service',
        'Leadership Worldwide',
      ],
      datasets: [
        {
          data: [1, 1, 1, 1],
          backgroundColor: [
            gordonColors.neutral.lightGray,
            gordonColors.neutral.lightGray,
            gordonColors.neutral.lightGray,
            gordonColors.neutral.lightGray,
          ],
        },
      ],
      options: '',
      CC: 0,
      IM: 0,
      LS: 0,
      LW: 0,
      CCColor: gordonColors.neutral.lightGray,
      IMColor: gordonColors.neutral.lightGray,
      LSColor: gordonColors.neutral.lightGray,
      LWColor: gordonColors.neutral.lightGray,
      defaultVPMode: true,
      CC_ON: false,
      IM_ON: false,
      LS_ON: false,
      LW_ON: false,
    };
  }

  changeMode = () => {
    console.log(this.state.defaultVPMode);
    if (this.state.defaultVPMode) {
      this.setState({ defaultVPMode: false });
    } else {
      this.setState({ defaultVPMode: true });
    }
  };

  componentWillMount() {
    this.getVPScores();
  }

  async getVPScores() {
    const scores = await victory.getVPScore();
    //const CC = scores[0].TOTAL_VP_CC_SCORE;
    const CC = scores[0].TOTAL_VP_CC_SCORE;
    const IM = scores[0].TOTAL_VP_IM_SCORE;
    const LS = scores[0].TOTAL_VP_LS_SCORE;
    const LW = scores[0].TOTAL_VP_LW_SCORE;
    this.setState({ CC, IM, LS, LW });

    if (CC > 0) {
      this.setState({ CCColor: gordonColors.secondary.red, CC_ON: true });
    }
    if (IM > 0) {
      this.setState({ IMColor: gordonColors.secondary.green, IM_ON: true });
    }
    if (LS > 0) {
      this.setState({ LSColor: gordonColors.secondary.yellow, LS_ON: true });
    }
    if (LW > 0) {
      this.setState({ LWColor: gordonColors.primary.cyan, LW_ON: true });
    }

    this.setState({
      options: {
        legend: {
          display: false,
        },
        scale: {
          gridLines: {
            display: true,
          },
          ticks: {
            display: false,
            max: Math.max(this.state.CC, this.state.IM, this.state.LS, this.state.LW),
            min: 0,
            maxTicksLimit: 1,
          },
        },
      },
    });

    if (CC + IM + LS + LW === 0) {
      this.setState({
        CC: 1,
        LW: 1,
        IM: 1,
        LS: 1,
        options: {
          legend: {
            display: false,
          },
          scale: {
            gridLines: {
              display: true,
            },
            ticks: {
              display: false,
              max: 1,
              min: 0,
              maxTicksLimit: 1,
            },
          },
          tooltips: {
            callbacks: {
              label: function(tooltipItem, data) {
                var label = data.labels[tooltipItem.index];
                return label + ': 0';
              },
            },
          },
        },
      });
    }
    this.setColor();
  }

  setColor() {
    this.setState({
      datasets: [
        {
          data: [this.state.CC, this.state.IM, this.state.LS, this.state.LW],
          backgroundColor: [
            this.state.CCColor,
            this.state.IMColor,
            this.state.LSColor,
            this.state.LWColor,
          ],
        },
      ],
    });
  }

  render() {
    let IMG_CC;
    let IMG_IM;
    let IMG_LS;
    let IMG_LW;

    if (this.state.IM_ON) {
      IMG_CC = (
        <img className="vpdesign" src={require('./images/On-CC.svg')} alt="Christian Character" />
      );
    } else {
      IMG_CC = (
        <img className="vpdesign" src={require('./images/Off-CC.svg')} alt="Christian Character" />
      );
    }

    if (this.state.IM_ON) {
      IMG_IM = (
        <img className="vpdesign" src={require('./images/On-IM.svg')} alt="Intellectual Maturity" />
      );
    } else {
      IMG_IM = (
        <img
          className="vpdesign"
          src={require('./images/Off-IM.svg')}
          alt="Intellectual Maturity"
        />
      );
    }

    if (this.state.LS_ON) {
      IMG_LS = (
        <img className="vpdesign" src={require('./images/On-LS.svg')} alt="Lives of Service" />
      );
    } else {
      IMG_LS = (
        <img className="vpdesign" src={require('./images/Off-LS.svg')} alt="Lives of Service" />
      );
    }

    if (this.state.LW_ON) {
      IMG_LW = (
        <img className="vpdesign" src={require('./images/On-LW.svg')} alt="Leadership Worldwide" />
      );
    } else {
      IMG_LW = (
        <img className="vpdesign" src={require('./images/Off-LW.svg')} alt="Leadership Worldwide" />
      );
    }

    const style = {
      button: {
        background: gordonColors.primary.cyan,
        color: 'white',
      },
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

    let content;
    //style={{backgroundColor: gordonColors.primary.blue}}

    if (this.state.defaultVPMode) {
      content = (
        <section>
          <Grid container>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Grid container direction="row" alignItems="center">
                    <Grid item xs={7}>
                      <CardHeader title="Victory Promise" />
                    </Grid>
                    <Grid item xs={5} align="right">
                      <Button
                        variant="contained"
                        style={style.button}
                        onClick={() => this.changeMode()}
                      >
                        Change Style
                      </Button>
                    </Grid>
                  </Grid>
                  <Grid className="victory-promise-layout" item container>
                    <Grid item xs={12} container justify="center">
                      <HoverText
                        title={
                          <React.Fragment>
                            <Typography color="inherit">Christian Character</Typography>
                            {"It's very engaging. Right?"}
                          </React.Fragment>
                        }
                      >
                        {IMG_CC}
                      </HoverText>
                      <HoverText
                        title={
                          <React.Fragment>
                            <Typography color="inherit">Intellectual Maturity</Typography>
                            {"It's very engaging. Right?"}
                          </React.Fragment>
                        }
                      >
                        {IMG_IM}
                      </HoverText>
                    </Grid>
                    <Grid container justify="center">
                      <HoverText
                        title={
                          <React.Fragment>
                            <Typography color="inherit">Lives of Service</Typography>
                            {"It's very engaging. Right?"}
                          </React.Fragment>
                        }
                      >
                        {IMG_LS}
                      </HoverText>
                      <HoverText
                        title={
                          <React.Fragment>
                            <Typography color="inherit">Leadership Worldwide</Typography>
                            {"It's very engaging. Right?"}
                          </React.Fragment>
                        }
                      >
                        {IMG_LW}
                      </HoverText>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </section>
      );
    } else {
      content = (
        <section>
          <Grid container>
            <Grid item>
              <Card>
                <CardContent>
                  <Grid container direction="row" alignItems="center">
                    <Grid item xs={7}>
                      <CardHeader title="Victory Promise" />
                    </Grid>
                    <Grid item xs={5} align="right">
                      <Button
                        variant="contained"
                        style={style.button}
                        onClick={() => this.changeMode()}
                      >
                        Change Style
                      </Button>
                    </Grid>
                  </Grid>
                  <Grid item className="victory-promise-layout" container>
                    <Grid container justify="center">
                      <Polar
                        className="victory-promise"
                        data={{ labels: this.state.labels, datasets: this.state.datasets }}
                        options={this.state.options}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </section>
      );
    }
    return <section>{content}</section>;
  }
}

import Grid from '@material-ui/core/Grid';
import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import wellness from '../../../../services/wellness';
import GordonLoader from '../../../../components/Loader';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import './denied.css';
import './approved.css';

export default class HealthStatus extends Component {
  constructor(props) {
    super(props);

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.tick = this.tick.bind(this);
    this.resizeIcon = this.resizeIcon.bind(this);
    this.getStatus = this.getStatus.bind(this);
    this.loadPage = this.loadPage.bind(this);

    this.state = {
      currentStatus: true,
      loading: true,
      time: new Date().toLocaleString([], { hour: '2-digit', minute: '2-digit' }),
      width: 0,
    };
  }
 
  async componentDidMount() {
    this.intervalID = setInterval(() => this.tick(), 1000);
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    await this.loadPage();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
    clearInterval(this.intervalID);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth });
  }

  tick() {
    this.setState({
      time: new Date().toLocaleString([], {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    });
  }

  resizeIcon() {
    return this.state.width * 0.03 + 69;
  }

  async loadPage() {
    this.setState({ loading: true });
    try {
      await this.getStatus();
      this.tick();
      this.setState({ loading: false });
    } catch (error) {
      this.setState({ error });
    }
  }

  async getStatus() {
    const answer = await wellness.getStatus();
    const SYMPTOMS = true;
    const NO_SYMPTOMS = false;

    if(answer.length > 0){
        if(answer[0].answerValid){
            if (answer[0].userAnswer === true) {
              this.setState({ currentStatus: SYMPTOMS });
            }
            if (answer[0].userAnswer === false) {
              this.setState({ currentStatus: NO_SYMPTOMS });
            }
        }else{
            this.setState({ currentStatus: SYMPTOMS });
          }
    }else{
       this.setState({ currentStatus: SYMPTOMS });
    }
  }


  render() {  
    let content;
    if (this.state.loading) {
      content = <GordonLoader />;
    } else {

      /* 
       * Renders the wellness status of a student
       */
        if (this.state.currentStatus === false ) {
          content = (
            <Grid spacing={2}>
              <Card>
                {
                  //<CardHeader title="Approved" />
                }
                <CardContent className="approved-box">
                  <div className="approved-time">{this.state.time}</div>
                  <div className="circle-check">
                    <CheckIcon style={{ fontSize: this.resizeIcon() }} />
                  </div>
                </CardContent>
              </Card>
            </Grid>
          );
        } else {
          content = (
            <Grid spacing={2}>
              <Card>
                {
                  // <CardHeader title="Denied" />
                }
                <CardContent className="denied-box">
                  <div className="denied-time">{this.state.time}</div>
                  <div className="circle-cross">
                    <ClearIcon style={{ fontSize: this.resizeIcon() }} />
                  </div>
                </CardContent>
              </Card>
            </Grid>
          );
        }
    }
    return content;
  }
}

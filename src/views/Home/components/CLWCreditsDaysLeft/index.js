import React, { Component } from 'react';
import Card, { CardContent, /* CardHeader */ } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import { Doughnut, defaults } from 'react-chartjs-2';

import { gordonColors } from '../../../../theme';
import user from '../../../../services/user';
import session from '../../../../services/session';
import GordonLoader from '../../../../components/Loader';

export default class CLWCreditsDaysLeft extends Component {
  constructor(props) {
    super(props);

    this.loadData = this.loadData.bind(this);

    this.state = {
      daysLeft: [],
      chapelCredits: {},
      error: null,
      loading: true,
    };
  }

  componentWillMount() {
    this.loadData();
  }

  async loadData() {
    this.setState({ loading: true });
    try {
      const daysLeftPromise = session.getDaysLeft();
      const chapelCreditsPromise = user.getChapelCredits();
      const daysLeft = await daysLeftPromise;
      const chapelCredits = await chapelCreditsPromise;
      this.setState({ loading: false, daysLeft, chapelCredits });
    } catch (error) {
      this.setState({ error });
    }
  }

  render() {
    if (this.state.error) {
      throw this.state.error;
    }

    defaults.global.legend.display = false;
    let content;
    if (this.state.loading === true) {
      content = <GordonLoader />;
    } else {
      const daysLeft = this.state.daysLeft[0];
      const pastDays = this.state.daysLeft[1] - daysLeft;

      const options = {
        cutoutPercentage: 25,
        tooltips: { // Allow different tooltips for different datasets within the same pie;
          callbacks: { // Code taken from https://github.com/chartjs/Chart.js/issues/1417
            label: function(item, data) {
              return data.datasets[item.datasetIndex].label[item.index]
                     + ": " + data.datasets[item.datasetIndex].data[item.index];
            }
          }
        },
        legend: {
          display: true,
          position: 'top',
          reverse: false,
          labels: {
            padding: 20,
            generateLabels: function(chart) {
              chart.legend.afterFit = function() { // Hack for bigger space between legend & chart
                this.height = this.height + 10; // see http://stackoverflow.com/a/42957884/1779106 
              };                                // and https://codepen.io/jordanwillis/pen/ZeOYdL
              var data = chart.data;
              // Code below is for custom legend entries and is based on part of the source code for
              // ChartJS, found here:
              // https://github.com/chartjs/Chart.js/blob/master/src/controllers/controller.doughnut.js#L40-L68
              if (data.legendEntries.length && data.datasets.length) {
                return data.legendEntries.map(function(label, i) {
                  var meta = chart.getDatasetMeta(0);
                  var ds = data.datasets[0];
                  var arc = meta.data[i];
                  var custom = (arc && arc.custom) || {};
                  var fill = custom.backgroundColor ? custom.backgroundColor : data.legendColors[i];
                  var stroke = custom.borderColor ? custom.borderColor : ds.borderColor;
                  var bw = custom.borderWidth ? custom.borderWidth : ds.borderWidth;

                  return {
                    text: label,
                    fillStyle: fill,
                    strokeStyle: stroke,
                    lineWidth: bw,
                    hidden: isNaN(ds.data[i]) || meta.data[i].hidden,

                    index: i // Extra data used for toggling the correct item
                  };
                });
              }
              return [];
            },
          },
          onClick: (e) => e.stopPropagation(), // keep click on legend from toggling data visibility
        },
      };

      const { current, required } = this.state.chapelCredits;
      const remaining = current > required ? 0 : required - current;

      const data = {
        legendEntries: ['Days Finished', 'CL&W Credits'],
        legendColors: [gordonColors.primary.blue, gordonColors.primary.cyan],
        datasets: [
          {
            label: ['Days Finished', 'Days Remaining'],
            data: [pastDays, daysLeft],
            backgroundColor: [gordonColors.primary.blue, gordonColors.neutral.lightGray],
          },
          {
            label: ['CL&W Credits Earned', 'CL&W Credits Remaining'],
            data: [current, remaining],
            backgroundColor: [gordonColors.primary.cyan, gordonColors.neutral.lightGray],
          },
        ],
      };

      content = (<div>
                  <Grid container justify='space-around' spacing={0} style={{paddingTop: 5, paddingBottom: 5}}>
                    <Grid item>
                      <Typography type='body1' style={{color: 'gray', textAlign: 'center'}}>
                        {`${daysLeft} Days Left in Semester`}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography type='body1' style={{color: 'gray', textAlign: 'center'}}>
                        {`${current} CL&W Credit` + ((current === 1) ? '' : 's') + ' Earned'}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Doughnut data={data} height={200} options={options} />
                </div>);
    }

    return (
      <Card>
        <CardContent>
          <Typography type='headline' style={{textAlign: 'center', paddingTop: 5 }}>Christian Life & Worship Credits</Typography>
          {content}
        </CardContent>
      </Card>
    );
  }
}

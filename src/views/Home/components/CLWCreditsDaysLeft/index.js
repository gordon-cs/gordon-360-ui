import React, { Component } from 'react';
import Card, { CardContent, CardHeader } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import { Pie, Doughnut, defaults } from 'react-chartjs-2';

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
    let subheader;
    if (this.state.loading === true) {
      content = <GordonLoader />;
    } else {
      const daysLeft = this.state.daysLeft[0];
      const pastDays = this.state.daysLeft[1] - daysLeft;

      const options = {
        cutoutPercentage: 25,
        tooltips: {
          callbacks: {
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
            generateLabels: function(chart) {
              var data = chart.data;
              if (data.legendEntries.length && data.datasets.length) {
                return data.legendEntries.map(function(label, i) {
                  var meta = chart.getDatasetMeta(0);
                  var ds = data.datasets[0];
                  var arc = meta.data[i];
                  var custom = arc && arc.custom || {};
                  var fill = custom.backgroundColor ? custom.backgroundColor : data.legendColors[i];
                  var stroke = custom.borderColor ? custom.borderColor : ds.borderColor;
                  var bw = custom.borderWidth ? custom.borderWidth : ds.borderWidth;

                  return {
                    text: label,
                    fillStyle: fill,
                    strokeStyle: stroke,
                    lineWidth: bw,
                    hidden: isNaN(ds.data[i]) || meta.data[i].hidden,

                    // Extra data used for toggling the correct item
                    index: i
                  };
                });
              }
              return [];
            }
          },
        },
      };

      const { current, required } = this.state.chapelCredits;
      const remaining = current > required ? 0 : required - current;

      const data = {
        legendEntries: ['Days in Semester', 'CL&W Credits'],
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
                  <Typography type='body1' style={{color: 'gray', textAlign: 'center'}}>
                    {`${daysLeft} Days Left in Semester`}
                    <br/>
                    {`${current} CL&W Credit` + ((current === 1) ? '' : 's') + ' Earned'}
                  </Typography>
                  <br/>
                  <Doughnut data={data} options={options} />
                </div>);
                
    //   subheader = (`${daysLeft} Days Left in Semester` `${current} CL&W Credits Earned`);
    //   if (current === 1) {
    //     subheader += `${current} CL&W Credit Earned`;
    //   } else {
    //     subheader += ` ${current} CL&W Credits Earned`;
    //   }
    }

    return (
      <Card>
        <CardContent>
          <br/>
          <Typography type='headline' style={{textAlign: 'center'}}>CL&W Credits</Typography>
          {content}
          <br/>
        </CardContent>
      </Card>
    );
  }
}

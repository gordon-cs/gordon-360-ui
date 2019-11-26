import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Doughnut, defaults } from 'react-chartjs-2';
import Button from '@material-ui/core/Button';

import { gordonColors } from '../../../../theme';
import user from '../../../../services/user';
import session from '../../../../services/session';
import GordonLoader from '../../../../components/Loader';

export default class StudentNews extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    
  }

  render() {
    const content = (
        <div>
          <Grid
            container
            justify="space-around"
            spacing={0}
            style={{ paddingTop: 5, paddingBottom: 10 }}
          >
            <Grid item>
              <Typography variant="body2" style={{ color: 'gray'}}>
                    Some random student news 
              </Typography>
            </Grid>
          </Grid>
        </div>
    );

    return (
      <Card>
        <CardContent>
          <CardHeader title="Student News"/>
            {content}
        </CardContent>
      </Card>
    );
  }
}

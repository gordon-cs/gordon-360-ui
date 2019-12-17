import React, { Component } from 'react';
import { Typography, Grid, IconButton } from '@material-ui/core';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';

export default class ShiftItem extends Component {
  render() {
    const shift = this.props.value;
    const { deleteShift } = this.props;
    const {
      ID,
      ID_NUM,
      EML_DESCRIPTION,
      SHIFT_START_DATETIME,
      SHIFT_END_DATETIME,
      HOURLY_RATE,
      HOURS_WORKED,
      STATUS,
    } = shift;

    const yearIn = SHIFT_START_DATETIME.substring(2, 4);
    const monthIn = SHIFT_START_DATETIME.substring(5, 7);
    const dateIn = SHIFT_START_DATETIME.substring(8, 10);
    const timeIn = SHIFT_START_DATETIME.substring(11, 16);

    const yearOut = SHIFT_END_DATETIME.substring(2, 4);
    const monthOut = SHIFT_END_DATETIME.substring(5, 7);
    const dateOut = SHIFT_END_DATETIME.substring(8, 10);
    const timeOut = SHIFT_END_DATETIME.substring(11, 16);

    const dateTimeIn = monthIn + '/' + dateIn + '/' + yearIn + ' ' + timeIn;
    const dateTimeOut = monthOut + '/' + dateOut + '/' + yearOut + ' ' + timeOut;

    return (
      <Grid item xs={12} className="shift-item">
        <div>
          <Grid container direction="row" alignItems="center">
            <Grid item xs={3}>
              <Typography variant="body2">{EML_DESCRIPTION}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body2">{dateTimeIn}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body2">{dateTimeOut}</Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography variant="body2">{HOURLY_RATE}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body2">{HOURS_WORKED}</Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography variant="body2">{STATUS}</Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography variant="body2">
                <IconButton>
                  {STATUS !== 'Submitted' && STATUS !== 'Approved' && (
                    <DeleteForeverOutlinedIcon
                      onClick={() => {
                        deleteShift(ID, ID_NUM);
                      }}
                    />
                  )}
                </IconButton>
              </Typography>
            </Grid>
          </Grid>
        </div>
      </Grid>
    );
  }
}

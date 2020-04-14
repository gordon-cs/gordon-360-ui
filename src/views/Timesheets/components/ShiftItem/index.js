import React, { Component } from 'react';
import {
  Typography,
  Grid,
  Button,
  IconButton,
  Dialog,
  DialogContent,
  Tooltip,
  DialogTitle,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { gordonColors } from '../../../../theme';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import './ShiftItem.css'

const CustomTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.black,
    color: 'rgba(255, 255, 255, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}))(Tooltip);
export default class ShiftItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDeleteConfirmation: false,
    };
  }

  handleSubmitButtonClick = () => {
    this.setState({ showDeleteConfirmation: true });
  }

  onClose = () => {
    this.setState({ showDeleteConfirmation: false });
  }

  render() {
    const shift = this.props.value;
    const { deleteShift } = this.props;
    const {
      ID,
      EML_DESCRIPTION,
      SHIFT_START_DATETIME,
      SHIFT_END_DATETIME,
      SHIFT_NOTES,
      COMMENTS,
      HOURLY_RATE,
      HOURS_WORKED,
      STATUS,
    } = shift;

    const monthIn = SHIFT_START_DATETIME.substring(5, 7);
    const dateIn = SHIFT_START_DATETIME.substring(8, 10);
    const timeIn = SHIFT_START_DATETIME.substring(11, 16);

    const monthOut = SHIFT_END_DATETIME.substring(5, 7);
    const dateOut = SHIFT_END_DATETIME.substring(8, 10);
    const timeOut = SHIFT_END_DATETIME.substring(11, 16);

    const dateTimeIn = monthIn + '/' + dateIn + "\n" + timeIn;
    const dateTimeOut = monthOut + '/' + dateOut + "\n" + timeOut;

    let confirmationBox = (
      <Grid container>
        <Grid item>
          <Dialog
            open={this.state.showDeleteConfirmation}
            keepMounted
            align="center"
            onBackdropClick={this.onClose}
          >
            <DialogTitle>Are you sure you want to delete this shift?</DialogTitle>
            <DialogContent>
              <Grid container>
                <Grid item xs={6} sm={6} md={6} lg={6}>
                  <Button color="primary" onClick={this.onClose} variant="contained">
                    No
                  </Button>
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6}>
                  <Button
                    variant="contained"
                    onClick={() => {
                      deleteShift(ID, EML_DESCRIPTION);
                      this.onClose();
                    }}
                    style={styles.redButton}>
                    Yes
                  </Button>
                </Grid>
              </Grid>
            </DialogContent>
          </Dialog>
        </Grid>
      </Grid>
    );

    let shiftItemIcon = (STATUS === 'Saved' || STATUS === 'Rejected') ? (
      <IconButton
        onClick={this.handleSubmitButtonClick}
      >
          <DeleteForeverOutlinedIcon style={{color: gordonColors.secondary.red}} />
      </IconButton>
    ) : (
      <IconButton style={{visibility: 'hidden'}}>
          <DeleteForeverOutlinedIcon />
      </IconButton>
    )
    
    let shiftNotesTooltip = <></>;
    if (SHIFT_NOTES !== '') {
      shiftNotesTooltip = (
        <CustomTooltip className='shift-note-tooltip' style={{position: 'absolute'}} title={'Shift note: ' + SHIFT_NOTES} placement='top'>
          <InfoOutlinedIcon style={{ fontSize: 18 }} color='primary' />
        </CustomTooltip>
      )
    }

    let shiftCommentTooltip = <></>;
    if (COMMENTS === null) {
      shiftCommentTooltip = (
        <CustomTooltip className='shift-comment-tooltip' title={SHIFT_NOTES} placement='top'>
          <ErrorOutlineIcon style={{ fontSize: 18 }}/>
        </CustomTooltip>
      )
    }

    return (
      <Grid item xs={12} className="shift-item">
        {confirmationBox}
        <div>
          <Grid container direction="row" alignItems="center">
            <Grid item xs={3}>
              <Grid container direction='row' justify='center'>
                <Typography variant="body2">{EML_DESCRIPTION}</Typography>
                {shiftCommentTooltip}
              </Grid>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body2">{dateTimeIn}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body2">{dateTimeOut}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body2">{HOURLY_RATE}</Typography>
            </Grid>
            <Grid item xs={2}>
                <Typography variant="body2">{HOURS_WORKED}</Typography>
                {shiftNotesTooltip}
            </Grid>
            <Grid item xs={1}>
              <Typography variant="body2">
                {shiftItemIcon}
              </Typography>
            </Grid>
          </Grid>
        </div>
      </Grid>
    );
  }
}

const styles = {
  redButton: {
    background: gordonColors.secondary.red,
    color: 'white',
  },
}
import { Card, CardContent, Typography, makeStyles } from '@material-ui/core';
import { brown, red } from '@material-ui/core/colors';
import React  from 'react';

const useStyles = makeStyles({
  root: {
    color: red[50],
    backgroundColor: brown[900]
  }
})

const GuestWelcome = () => {
  const classes = useStyles()

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography>
          This is a placeholder welcome message!
          As a guest, you have limited access to the 360 site. You can access Involvments,
          Events, and this Login page.
        </Typography>
      </CardContent>
    </Card>
  )
}
export default GuestWelcome;

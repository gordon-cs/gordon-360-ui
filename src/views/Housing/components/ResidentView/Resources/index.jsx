import { Card, CardHeader, CardContent, ListItem, Link, ListItemText, Grid } from '@mui/material';

const Resources = () => {
  return (
    <Card>
      <CardHeader
        title={
          <Grid container direction="row" alignItems="center">
            <Grid item xs={12} md={4} xl={4} align="center">
              Resources
            </Grid>
          </Grid>
        }
        className="gc360_header"
      />

      <CardContent></CardContent>
    </Card>
  );
};

export default Resources;

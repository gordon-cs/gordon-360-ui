import { Card, CardContent, CardHeader, Container, Grid, Typography } from '@mui/material';
import { ListItemIcon, ListItemText, ListSubheader, List, ListItem, Link } from '@mui/material';
import UpdateTasks from './updateTasks';

const RDView = () => (
  <Grid container>
    <Grid item xs={12} md={12} padding={1}>
      <Card sx={{ width: '100%' }}>
        <CardHeader title={`Edit Documents`} className="gc360_header" />
        <CardContent>
          <Typography>
            <List>
              <ListItem>
                <Link underline="hover" className={`gc360_text_link`} target="_blank">
                  <ListItemText primary="RA/AC Task List"></ListItemText>
                </Link>
                <Grid item>
                  <UpdateTasks />
                </Grid>
              </ListItem>
              <ListItem>
                <Link
                  // Change link later when we have a SharePoint Link
                  href="https://www.microsoft.com/en-us/microsoft-365/sharepoint/collaboration"
                  underline="hover"
                  className={`gc360_text_link`}
                  target="_blank"
                >
                  <ListItemText primary="Sharepoint"></ListItemText>
                </Link>
              </ListItem>
              <ListItem>
                <Link
                  // Change link later when we have actual Room Range page
                  href="http://127.0.0.1:5500/index.html"
                  underline="hover"
                  className={`gc360_text_link`}
                  target="_blank"
                >
                  <ListItemText primary="Room Ranges"></ListItemText>
                </Link>
              </ListItem>
            </List>
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  </Grid>
);

export default RDView;

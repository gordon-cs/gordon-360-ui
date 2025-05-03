import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Link,
} from '@mui/material';

const ResidentView = () => {
  return (
    <Card>
      <CardHeader
        title={
          <Grid container direction="row" alignItems="center">
            <Grid item xs={12} align="center">
              Resources
            </Grid>
          </Grid>
        }
        className="gc360_header"
      />
      <CardContent>
        <Grid container spacing={5} padding={2}>
          {/* RESOURCES SECTION */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader
                title={
                  <Grid container direction="row" alignItems="center">
                    <Grid item xs={12} align="center">
                      Department Links
                    </Grid>
                  </Grid>
                }
                className="gc360_header"
              />

              <CardContent>
                <Typography>
                  <List>
                    <ListItem>
                      <Link
                        href="https://www.gordon.edu/asc"
                        underline="hover"
                        className={`gc360_text_link`}
                        target="_blank"
                      >
                        <ListItemText primary="ASC" />
                      </Link>
                    </ListItem>
                    <ListItem>
                      <Link
                        href="https://www.gordon.edu/counselingwellness"
                        underline="hover"
                        className={`gc360_text_link`}
                        target="_blank"
                      >
                        <ListItemText primary="CSCW" />
                      </Link>
                    </ListItem>
                    <ListItem>
                      <Link
                        href="https://www.gordon.edu/healthcenter"
                        underline="hover"
                        className={`gc360_text_link`}
                        target="_blank"
                      >
                        <ListItemText primary="Health Center" />
                      </Link>
                    </ListItem>
                  </List>
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* CONTACTS SECTION */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader
                title={
                  <Grid container direction="row" alignItems="center">
                    <Grid item xs={12} align="center">
                      Email Contacts
                    </Grid>
                  </Grid>
                }
                className="gc360_header"
              />
              <CardContent>
                <Typography>
                  <List>
                    <ListItem>
                      <Link
                        href="mailto:police@gordon.edu"
                        underline="hover"
                        className="gc360_text_link"
                      >
                        <ListItemText primary="Gordon Police" />
                      </Link>
                    </ListItem>
                    <ListItem>
                      <Link
                        href="mailto:studentlife@gordon.edu"
                        underline="hover"
                        className="gc360_text_link"
                      >
                        <ListItemText primary="Student Life" />
                      </Link>
                    </ListItem>
                    <ListItem>
                      <Link
                        href="mailto:housing@gordon.edu"
                        underline="hover"
                        className="gc360_text_link"
                      >
                        <ListItemText primary="Housing" />
                      </Link>
                    </ListItem>
                  </List>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ResidentView;

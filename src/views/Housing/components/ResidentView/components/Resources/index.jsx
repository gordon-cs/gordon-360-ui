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
  Box,
} from '@mui/material';

const Resources = () => {
  return (
    <Grid container spacing={5}>
      <Box ml={6} />
      {/* RESOURCES SECTION */}
      <Grid item xs={12} md={12}>
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
            <Grid container spacing={2}>
              {/* Documents Card */}
              <Grid item xs={12} md={4}>
                <Card>
                  <CardHeader title="Documents" className="gc360_header" />
                  <CardContent>
                    <Typography>
                      <List>
                        <ListItem>
                          <Link
                            href="https://360.gordon.edu"
                            underline="hover"
                            className={`gc360_text_link`}
                            target="_blank"
                          >
                            <ListItemText primary="FAQ" />
                          </Link>
                        </ListItem>
                        <ListItem>
                          <Link
                            href="https://360.gordon.edu"
                            underline="hover"
                            className={`gc360_text_link`}
                            target="_blank"
                          >
                            <ListItemText primary="Further Resources" />
                          </Link>
                        </ListItem>
                        <ListItem>
                          <Link
                            href="https://360.gordon.edu"
                            underline="hover"
                            className={`gc360_text_link`}
                            target="_blank"
                          >
                            <ListItemText primary="Link #3" />
                          </Link>
                        </ListItem>
                      </List>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              {/* Contacts Card */}
              <Grid item xs={12} md={4}>
                <Card>
                  <CardHeader title="Contacts" className="gc360_header" />
                  <CardContent>
                    <Typography>
                      <List>
                        <ListItem>
                          <Link
                            href="https://360.gordon.edu"
                            underline="hover"
                            className={`gc360_text_link`}
                            target="_blank"
                          >
                            <ListItemText primary="GoPo" />
                          </Link>
                        </ListItem>
                        <ListItem>
                          <Link
                            href="https://360.gordon.edu"
                            underline="hover"
                            className={`gc360_text_link`}
                            target="_blank"
                          >
                            <ListItemText primary="Physical Plant" />
                          </Link>
                        </ListItem>
                        <ListItem>
                          <Link
                            href="https://360.gordon.edu"
                            underline="hover"
                            className={`gc360_text_link`}
                            target="_blank"
                          >
                            <ListItemText primary="Housing" />
                          </Link>
                        </ListItem>
                      </List>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              {/* Common Links Card */}
              <Grid item xs={12} md={4}>
                <Card>
                  <CardHeader title="Common Links" className="gc360_header" />
                  <CardContent>
                    <Typography>
                      <List>
                        <ListItem>
                          <Link
                            href="https://360.gordon.edu"
                            underline="hover"
                            className={`gc360_text_link`}
                            target="_blank"
                          >
                            <ListItemText primary="Department Links" />
                          </Link>
                        </ListItem>
                        <ListItem>
                          <Link
                            href="https://360.gordon.edu"
                            underline="hover"
                            className={`gc360_text_link`}
                            target="_blank"
                          >
                            <ListItemText primary="Link #2" />
                          </Link>
                        </ListItem>
                        <ListItem>
                          <Link
                            href="https://360.gordon.edu"
                            underline="hover"
                            className={`gc360_text_link`}
                            target="_blank"
                          >
                            <ListItemText primary="Link #3" />
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
      </Grid>
    </Grid>
  );
};

export default Resources;

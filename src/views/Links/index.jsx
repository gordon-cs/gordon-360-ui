import { Card, CardContent, CardHeader, Container, Grid, Typography } from '@mui/material';
import LinkIcon from '@mui/icons-material/InsertLink';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { ListItemIcon, ListItemText, ListSubheader, List, ListItem } from '@mui/material';
import CanvasIcon from '/src/components/QuickLinksDialog/images/Canvas.ico';
import GordonIcon from '/src/components/QuickLinksDialog/images/favicon.ico';
import GOIcon from '/src/components/QuickLinksDialog/images/GoGordonFavicon.ico';
import MyGordonIcon from '/src/components/QuickLinksDialog/images/MyGordonFavicon.ico';
import CriterionIcon from '/src/components/QuickLinksDialog/images/criterion.png';
import HandshakeIcon from '/src/components/QuickLinksDialog/images/handshake.png';
import FightingScotsIcon from '/src/components/QuickLinksDialog/images/fightingscots.svg';
import { PropsWithChildren } from 'react';

const Links = () => (
  <Grid container>
    <Grid item xs={12} md={4} padding={1}>
      <Card>
        <CardHeader title={`Academics`} className="gc360_header" />
        <CardContent>
          <Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <img src={GordonIcon} alt={'Gordon College'} />
                </ListItemIcon>
                <a href="https://www.gordon.edu">
                  <ListItemText primary="Gordon College"></ListItemText>
                </a>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <img src={MyGordonIcon} alt={'My Gordon Logo'} />
                </ListItemIcon>
                <a href="https://my.gordon.edu">
                  <ListItemText primary="My Gordon"></ListItemText>
                </a>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <img src={GOIcon} alt={'Go Gordon Logo'} />
                </ListItemIcon>
                <a href="https://go.gordon.edu">
                  <ListItemText primary="Go Gordon"></ListItemText>
                </a>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <img src={CanvasIcon} alt={'Canvas Logo'} />
                </ListItemIcon>
                <a href="https://canvas.gordon.edu">
                  <ListItemText primary="Canvas"></ListItemText>
                </a>
              </ListItem>
            </List>
          </Typography>
        </CardContent>
      </Card>
    </Grid>
    <Grid item xs={12} md={4} padding={1}>
      <Card>
        <CardHeader title={`Employment`} className="gc360_header" />
        <CardContent>
          <Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <img src={CriterionIcon} alt={'Criterion Logo'} />
                </ListItemIcon>
                <a href="https://gordon.criterionhcm.com/">
                  <ListItemText primary="Criterion"></ListItemText>
                </a>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <img src={HandshakeIcon} alt={'Handshake Logo'} />
                </ListItemIcon>
                <a href="https://gordon.joinhandshake.com/">
                  <ListItemText primary="Handshake"></ListItemText>
                </a>
              </ListItem>
            </List>
          </Typography>
        </CardContent>
      </Card>
    </Grid>
    <Grid item xs={12} md={4} padding={1}>
      <Card>
        <CardHeader title={`Information`} className="gc360_header" />
        <CardContent>
          <Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <img src={FightingScotsIcon} alt={'Fighting Scots Logo'} />
                </ListItemIcon>
                <a href="https://athletics.gordon.edu/">
                  <ListItemText primary="Fighting Scots"></ListItemText>
                </a>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <NotificationsNoneOutlinedIcon />
                </ListItemIcon>
                <a href="https://stories.gordon.edu/">
                  <ListItemText primary="The Bell"></ListItemText>
                </a>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <LinkIcon />
                </ListItemIcon>
                <a href="https://www.gordon.edu/titleix">
                  <ListItemText primary="Sexual Discrimination and Harassment"></ListItemText>
                </a>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <MapOutlinedIcon />
                </ListItemIcon>
                <a href="https://www.gordon.edu/map">
                  <ListItemText primary="Gordon College Maps"></ListItemText>
                </a>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <EmailOutlinedIcon />
                </ListItemIcon>
                <a href="https://outlook.office.com/mail/">
                  <ListItemText primary="Gordon Email"></ListItemText>
                </a>
              </ListItem>
            </List>
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  </Grid>
);

export default Links;

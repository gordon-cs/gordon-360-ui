import { Card, CardContent, CardHeader, Container, Grid, Typography } from '@mui/material';
import LinkIcon from '@mui/icons-material/InsertLink';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { ListItemIcon, ListItemText, ListSubheader, List, ListItem, Link } from '@mui/material';
import CanvasIcon from '/src/views/Links/images/Canvas.ico';
import GordonIcon from '/src/views/Links/images/favicon.ico';
import GOIcon from '/src/views/Links/images/GoGordonFavicon.ico';
import MyGordonIcon from '/src/views/Links/images/MyGordonFavicon.ico';
import CriterionIcon from '/src/views/Links/images/criterion.png';
import HandshakeIcon from '/src/views/Links/images/handshake.png';
import FightingScotsIcon from '/src/views/Links/images/fightingscots.svg';
import OutlookIcon from '/src/views/Links/images/outlook-icon1.png';
import SchedulerIcon from '/src/views/Links/images/25-live-logo.jpg';
import ChapelIcon from '/src/views/Links/images/iAttended.png';

const iconStyle = { width: '1.5rem' };

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
                  <img src={GordonIcon} alt={'Gordon College'} style={iconStyle} />
                </ListItemIcon>
                <Link
                  href="https://www.gordon.edu"
                  underline="hover"
                  className={`gc360_text_link`}
                  target="_blank"
                >
                  <ListItemText primary="Gordon College"></ListItemText>
                </Link>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <img src={MyGordonIcon} alt={'My Gordon Logo'} style={iconStyle} />
                </ListItemIcon>
                <Link
                  href="https://my.gordon.edu"
                  underline="hover"
                  className={`gc360_text_link`}
                  target="_blank"
                >
                  <ListItemText primary="My Gordon"></ListItemText>
                </Link>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <img src={CanvasIcon} alt={'Canvas Logo'} style={iconStyle} />
                </ListItemIcon>
                <Link
                  href="https://canvas.gordon.edu"
                  underline="hover"
                  className={`gc360_text_link`}
                  target="_blank"
                >
                  <ListItemText primary="Canvas"></ListItemText>
                </Link>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <img src={OutlookIcon} alt={'OutlookLogo'} style={iconStyle} />
                </ListItemIcon>
                <Link
                  href="https://outlook.office.com/mail/"
                  underline="hover"
                  className={`gc360_text_link`}
                  target="_blank"
                >
                  <ListItemText primary="Gordon Email"></ListItemText>
                </Link>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <img src={GOIcon} alt={'Go Gordon Logo'} style={iconStyle} />
                </ListItemIcon>
                <Link
                  href="https://go.gordon.edu"
                  underline="hover"
                  className={`gc360_text_link`}
                  target="_blank"
                >
                  <ListItemText primary="Go Gordon"></ListItemText>
                </Link>
              </ListItem>
            </List>
          </Typography>
        </CardContent>
      </Card>
    </Grid>
    <Grid item xs={12} md={4} padding={1}>
      <Card>
        <CardHeader title={`Services`} className="gc360_header" />
        <CardContent>
          <Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <img src={CriterionIcon} alt={'Criterion Logo'} style={iconStyle} />
                </ListItemIcon>
                <Link
                  href="https://gordon.criterionhcm.com/"
                  underline="hover"
                  className={`gc360_text_link`}
                  target="_blank"
                >
                  <ListItemText primary="Criterion"></ListItemText>
                </Link>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <img src={HandshakeIcon} alt={'Handshake Logo'} style={iconStyle} />
                </ListItemIcon>
                <Link
                  href="https://gordon.joinhandshake.com/"
                  underline="hover"
                  className={`gc360_text_link`}
                  target="_blank"
                >
                  <ListItemText primary="Handshake"></ListItemText>
                </Link>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <img src={SchedulerIcon} alt={'25Live Logo'} style={iconStyle} />
                </ListItemIcon>
                <Link
                  href="https://25live.collegenet.com/pro/gordon"
                  underline="hover"
                  className={`gc360_text_link`}
                  target="_blank"
                >
                  <ListItemText primary="25Live"></ListItemText>
                </Link>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <img src={ChapelIcon} alt={'iAttended Logo'} style={iconStyle} />
                </ListItemIcon>
                <Link
                  href="https://iattendedapp.com/"
                  underline="hover"
                  className={`gc360_text_link`}
                  target="_blank"
                >
                  <ListItemText primary="iAttended"></ListItemText>
                </Link>
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
                  <img src={FightingScotsIcon} alt={'Fighting Scots Logo'} style={iconStyle} />
                </ListItemIcon>
                <Link
                  href="https://athletics.gordon.edu/"
                  underline="hover"
                  className={`gc360_text_link`}
                  target="_blank"
                >
                  <ListItemText primary="Fighting Scots"></ListItemText>
                </Link>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <NotificationsNoneOutlinedIcon style={iconStyle} />
                </ListItemIcon>
                <Link
                  href="https://stories.gordon.edu/"
                  underline="hover"
                  className={`gc360_text_link`}
                  target="_blank"
                >
                  <ListItemText primary="The Bell"></ListItemText>
                </Link>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <LinkIcon style={iconStyle} />
                </ListItemIcon>
                <Link
                  href="https://www.gordon.edu/titleix"
                  underline="hover"
                  className={`gc360_text_link`}
                  target="_blank"
                >
                  <ListItemText primary="Sexual Discrimination and Harassment"></ListItemText>
                </Link>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <MapOutlinedIcon style={iconStyle} />
                </ListItemIcon>
                <Link
                  href="https://www.gordon.edu/map"
                  underline="hover"
                  className={`gc360_text_link`}
                  target="_blank"
                >
                  <ListItemText primary="Gordon College Maps"></ListItemText>
                </Link>
              </ListItem>
            </List>
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  </Grid>
);

export default Links;

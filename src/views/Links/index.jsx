import { Card, CardContent, CardHeader, Container, Grid, Typography } from '@mui/material';
import LinkIcon from '@mui/icons-material/InsertLink';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { ListItemIcon, ListItemText, ListSubheader, List, ListItem, Link } from '@mui/material';
import CanvasIcon from '/src/components/QuickLinksDialog/images/Canvas.ico';
import GordonIcon from '/src/components/QuickLinksDialog/images/favicon.ico';
import GOIcon from '/src/components/QuickLinksDialog/images/GoGordonFavicon.ico';
import MyGordonIcon from '/src/components/QuickLinksDialog/images/MyGordonFavicon.ico';
import CriterionIcon from '/src/components/QuickLinksDialog/images/criterion.png';
import HandshakeIcon from '/src/components/QuickLinksDialog/images/handshake.png';
import FightingScotsIcon from '/src/components/QuickLinksDialog/images/fightingscots.svg';
import styles from './Links.module.scss';

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
                  className={`gc360_text_link ${styles.dp_link}`}
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
                  className={`gc360_text_link ${styles.dp_link}`}
                >
                  <ListItemText primary="My Gordon"></ListItemText>
                </Link>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <img src={GOIcon} alt={'Go Gordon Logo'} style={iconStyle} />
                </ListItemIcon>
                <Link
                  href="https://go.gordon.edu"
                  underline="hover"
                  className={`gc360_text_link ${styles.dp_link}`}
                >
                  <ListItemText primary="Go Gordon"></ListItemText>
                </Link>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <img src={CanvasIcon} alt={'Canvas Logo'} style={iconStyle} />
                </ListItemIcon>
                <Link
                  href="https://canvas.gordon.edu"
                  underline="hover"
                  className={`gc360_text_link ${styles.dp_link}`}
                >
                  <ListItemText primary="Canvas"></ListItemText>
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
                  className={`gc360_text_link ${styles.dp_link}`}
                >
                  <ListItemText primary="Criterion"></ListItemText>
                </Link>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <LinkIcon style={iconStyle} />
                </ListItemIcon>
                <Link
                  href="https://25live.collegenet.com/pro/gordon"
                  underline="hover"
                  className={`gc360_text_link ${styles.dp_link}`}
                >
                  <ListItemText primary="25Live"></ListItemText>
                </Link>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <img src={HandshakeIcon} alt={'Handshake Logo'} style={iconStyle} />
                </ListItemIcon>
                <Link
                  href="https://gordon.joinhandshake.com/"
                  underline="hover"
                  className={`gc360_text_link ${styles.dp_link}`}
                >
                  <ListItemText primary="Handshake"></ListItemText>
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
                  className={`gc360_text_link ${styles.dp_link}`}
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
                  className={`gc360_text_link ${styles.dp_link}`}
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
                  className={`gc360_text_link ${styles.dp_link}`}
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
                  className={`gc360_text_link ${styles.dp_link}`}
                >
                  <ListItemText primary="Gordon College Maps"></ListItemText>
                </Link>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <EmailOutlinedIcon style={iconStyle} />
                </ListItemIcon>
                <Link
                  href="https://outlook.office.com/mail/"
                  underline="hover"
                  className={`gc360_text_link ${styles.dp_link}`}
                >
                  <ListItemText primary="Gordon Email"></ListItemText>
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

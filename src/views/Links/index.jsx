import { Card, CardContent, CardHeader, Grid, Typography, Box, Button } from '@mui/material';
import LinkIcon from '@mui/icons-material/InsertLink';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { ListItemIcon, ListItemText, List, ListItem, Link } from '@mui/material';
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
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import ChurchIcon from '@mui/icons-material/Church';
import FeedbackIcon from '@mui/icons-material/Feedback';
import SafetyDividerIcon from '@mui/icons-material/SafetyDivider';
import SpaIcon from '@mui/icons-material/Spa';
import PsychologyIcon from '@mui/icons-material/Psychology';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import CallIcon from '@mui/icons-material/Call';
import CategoryIcon from '@mui/icons-material/Category';
import ReportIcon from '@mui/icons-material/Report';
// import EmergencyIcon from '@mui/icons-material/Emergency';
import styles from '/src/views/Links/Links.module.scss';
import { useNavigate } from 'react-router';
import { styled } from '@mui/material/styles';

const Links = () => {
  const navigate = useNavigate();

  const CardContentWithPadding = styled(CardContent)(`
    padding: 8px;
    &:last-child {
      padding-bottom: 8px;
    }
  `);

  // Academics Resources UI
  const academicsCard = (
    <Card>
      <CardHeader title={`Academics`} className="gc360_header" />
      <CardContentWithPadding>
        <Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <img src={GordonIcon} alt={'Gordon College'} className={styles.icon_style} />
              </ListItemIcon>
              <Link
                href="https://www.gordon.edu"
                underline="hover"
                className={`gc360_text_link`}
                target="_blank"
              >
                <ListItemText
                  primary="Gordon College"
                  primaryTypographyProps={{ className: styles.link_style }}
                />
              </Link>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <img src={MyGordonIcon} alt={'My Gordon Logo'} />
              </ListItemIcon>
              <Link
                href="https://my.gordon.edu"
                underline="hover"
                className={`gc360_text_link`}
                target="_blank"
              >
                <ListItemText
                  primary="My Gordon"
                  primaryTypographyProps={{ className: styles.link_style }}
                />
              </Link>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <img src={CanvasIcon} alt={'Canvas Logo'} className={styles.icon_style} />
              </ListItemIcon>
              <Link
                href="https://canvas.gordon.edu"
                underline="hover"
                className={`gc360_text_link`}
                target="_blank"
              >
                <ListItemText
                  primary="Canvas"
                  primaryTypographyProps={{ className: styles.link_style }}
                />
              </Link>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <img src={OutlookIcon} alt={'OutlookLogo'} className={styles.icon_style} />
              </ListItemIcon>
              <Link
                href="https://outlook.office.com/mail/"
                underline="hover"
                className={`gc360_text_link`}
                target="_blank"
              >
                <ListItemText
                  primary="Gordon Email"
                  primaryTypographyProps={{ className: styles.link_style }}
                />
              </Link>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <img src={GOIcon} alt={'Go Gordon Logo'} className={styles.icon_style} />
              </ListItemIcon>
              <Link
                href="https://go.gordon.edu"
                underline="hover"
                className={`gc360_text_link`}
                target="_blank"
              >
                <ListItemText
                  primary="Go Gordon"
                  primaryTypographyProps={{ className: styles.link_style }}
                />
              </Link>
            </ListItem>
          </List>
        </Typography>
      </CardContentWithPadding>
    </Card>
  );

  // Services Resources UI
  const servicesCard = (
    <Card>
      <CardHeader title={`Services`} className="gc360_header" />
      <CardContentWithPadding>
        <Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <img src={CriterionIcon} alt={'Criterion Logo'} className={styles.icon_style} />
              </ListItemIcon>
              <Link
                href="https://gordon.criterionhcm.com/"
                underline="hover"
                className={`gc360_text_link`}
                target="_blank"
              >
                <ListItemText
                  primary="Criterion (Timesheets)"
                  primaryTypographyProps={{ className: styles.link_style }}
                />
              </Link>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <img src={HandshakeIcon} alt={'Handshake Logo'} className={styles.icon_style} />
              </ListItemIcon>
              <Link
                href="https://gordon.joinhandshake.com/"
                underline="hover"
                className={`gc360_text_link`}
                target="_blank"
              >
                <ListItemText
                  primary="Handshake"
                  primaryTypographyProps={{ className: styles.link_style }}
                />
              </Link>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <img src={SchedulerIcon} alt={'25Live Logo'} className={styles.icon_style} />
              </ListItemIcon>
              <Link
                href="https://25live.collegenet.com/pro/gordon"
                underline="hover"
                className={`gc360_text_link`}
                target="_blank"
              >
                <ListItemText
                  primary="25Live (Scheduling)"
                  primaryTypographyProps={{ className: styles.link_style }}
                />
              </Link>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <img src={ChapelIcon} alt={'iAttended Logo'} className={styles.icon_style} />
              </ListItemIcon>
              <Link
                href="https://iattendedapp.com/"
                underline="hover"
                className={`gc360_text_link`}
                target="_blank"
              >
                <ListItemText
                  primary="iAttended"
                  primaryTypographyProps={{ className: styles.link_style }}
                />
              </Link>
            </ListItem>
          </List>
        </Typography>
      </CardContentWithPadding>
    </Card>
  );

  // Information Resources UI
  const informationCard = (
    <Card>
      <CardHeader title={`Information`} className="gc360_header" />
      <CardContentWithPadding>
        <Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <img
                  src={FightingScotsIcon}
                  alt={'Fighting Scots Logo'}
                  className={styles.icon_style}
                />
              </ListItemIcon>
              <Link
                href="https://athletics.gordon.edu/"
                underline="hover"
                className={`gc360_text_link`}
                target="_blank"
              >
                <ListItemText
                  primary="Fighting Scots"
                  primaryTypographyProps={{ className: styles.link_style }}
                />
              </Link>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <NotificationsNoneOutlinedIcon className={styles.icon_style} />
              </ListItemIcon>
              <Link
                href="https://stories.gordon.edu/"
                underline="hover"
                className={`gc360_text_link`}
                target="_blank"
              >
                <ListItemText
                  primary="The Bell"
                  primaryTypographyProps={{ className: styles.link_style }}
                />
              </Link>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <LinkIcon className={styles.icon_style} />
              </ListItemIcon>
              <Link
                href="https://www.gordon.edu/titleix"
                underline="hover"
                className={`gc360_text_link`}
                target="_blank"
              >
                <ListItemText
                  primary="Sexual Discrimination and Harassment"
                  primaryTypographyProps={{ className: styles.link_style }}
                />
              </Link>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <MapOutlinedIcon className={styles.icon_style} />
              </ListItemIcon>
              <Link
                href="https://www.gordon.edu/map"
                underline="hover"
                className={`gc360_text_link`}
                target="_blank"
              >
                <ListItemText
                  primary="Gordon College Maps"
                  primaryTypographyProps={{ className: styles.link_style }}
                />
              </Link>
            </ListItem>
          </List>
        </Typography>
      </CardContentWithPadding>
    </Card>
  );

  // Police Resources UI
  const policeCard = (
    <Card>
      <CardHeader title={`Gordon Police`} className="gc360_header" />
      <CardContentWithPadding>
        <Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <LocalPoliceIcon className={styles.icon_style} />
              </ListItemIcon>
              <Link
                href="https://www.gordon.edu/police"
                underline="hover"
                className={`gc360_text_link`}
                target="_blank"
              >
                <ListItemText
                  primary="Gordon Police Resources"
                  primaryTypographyProps={{ className: styles.link_style }}
                />
              </Link>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CategoryIcon className={styles.icon_style} />
              </ListItemIcon>
              <Link
                onClick={() => {
                  navigate('/lostandfound');
                }}
                underline="hover"
                className={`gc360_text_link`}
                target="_blank"
              >
                <ListItemText
                  primary="Lost and Found"
                  primaryTypographyProps={{ className: styles.link_style }}
                />
              </Link>
            </ListItem>
            <hr />
            <ListItem>
              <ListItemIcon>
                <ReportIcon className={styles.icon_style} color="error" />
              </ListItemIcon>
              <ListItemText>
                Emergency Number: 978-867-<b>3333</b>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CallIcon className={styles.icon_style} />
              </ListItemIcon>
              <ListItemText>
                Non-Emergency Number: 978-867-<b>4444</b>
              </ListItemText>
            </ListItem>
          </List>
        </Typography>
        {/* <Grid container justifyContent={'center'}>
          <Box className={styles.campus_safety_alert}>
            <Grid item xs={12}>
              <Typography align="center">
                Emergency Number: 978-867-<b>3333</b>
              </Typography>
            </Grid>
          </Box>
        </Grid>
        <br />
        <Typography align="center">
          Non-Emergency Number: 978-867-<b>4444</b>
        </Typography>
        <br />
        <Grid container justifyContent={'center'}>
          <Link
            href="https://www.gordon.edu/police"
            underline="hover"
            className={`gc360_text_link`}
            target="_blank"
          >
            Gordon Police Resources
          </Link>
        </Grid>
        <Grid item xs={12}>
          <hr />
          <br />
          <Typography align="center">Missing Something?</Typography>
        </Grid>
        <Grid item xs={12}>
          <br />
          <Box textAlign={'center'}>
            <Button
              color="secondary"
              variant="contained"
              onClick={() => {
                navigate('/lostandfound');
              }}
            >
              Lost and Found
            </Button>
          </Box>
        </Grid> */}
      </CardContentWithPadding>
    </Card>
  );

  // Sexual Misconduct Resources UI
  const titleXICard = (
    <Card>
      <CardHeader title={`Sexual Misconduct Resources`} className="gc360_header" />
      <CardContentWithPadding>
        <Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <SafetyDividerIcon className={styles.icon_style} />
              </ListItemIcon>
              <Link
                href="https://www.gordon.edu/titleix"
                underline="hover"
                className={`gc360_text_link`}
                target="_blank"
              >
                <ListItemText
                  primary="Gordon Title IX Page"
                  primaryTypographyProps={{ className: styles.link_style }}
                />
              </Link>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <FeedbackIcon className={styles.icon_style} />
              </ListItemIcon>
              <Link
                href="https://www.gordon.edu/sexualmisconduct/report"
                underline="hover"
                className={`gc360_text_link`}
                target="_blank"
              >
                <ListItemText
                  primary="File a Report"
                  primaryTypographyProps={{ className: styles.link_style }}
                />
              </Link>
            </ListItem>
          </List>
        </Typography>
      </CardContentWithPadding>
    </Card>
  );

  // Health Center Resources UI
  const healthCenterCard = (
    <Card>
      <CardHeader title={`Health Center`} className="gc360_header" />
      <CardContentWithPadding>
        <Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <LocalHospitalIcon className={styles.icon_style} />
              </ListItemIcon>
              <Link
                href="https://www.gordon.edu/healthcenter"
                underline="hover"
                className={`gc360_text_link`}
                target="_blank"
              >
                <ListItemText
                  primary="Health Center Resources"
                  primaryTypographyProps={{ className: styles.link_style }}
                />
              </Link>
            </ListItem>
          </List>
        </Typography>
      </CardContentWithPadding>
    </Card>
  );

  // Counseling Center Resources UI
  const counselingCenterCard = (
    <Card>
      <CardHeader title={`Counseling Center`} className="gc360_header" />
      <CardContentWithPadding>
        <Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <SpaIcon className={styles.icon_style} />
              </ListItemIcon>
              <Link
                href="https://www.gordon.edu/counselingwellness"
                underline="hover"
                className={`gc360_text_link`}
                target="_blank"
              >
                <ListItemText
                  primary="Counseling Center Resources"
                  primaryTypographyProps={{ className: styles.link_style }}
                />
              </Link>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <PsychologyIcon className={styles.icon_style} />
              </ListItemIcon>
              <Link
                href="https://counseling.gordon.edu/TitaniumWeb/WCMenu.aspx"
                underline="hover"
                className={`gc360_text_link`}
                target="_blank"
              >
                <ListItemText
                  primary="Request Services"
                  primaryTypographyProps={{ className: styles.link_style }}
                />
              </Link>
            </ListItem>
          </List>
        </Typography>
      </CardContentWithPadding>
    </Card>
  );

  // Chapel Office Resources
  const chapelCard = (
    <Card>
      <CardHeader title={`Chapel Office`} className="gc360_header" />
      <CardContentWithPadding>
        <Typography>
          <ListItem>
            <ListItemIcon>
              <ChurchIcon className={styles.icon_style} />
            </ListItemIcon>
            <Link
              href="https://www.gordon.edu/chapel"
              underline="hover"
              className={`gc360_text_link`}
              target="_blank"
            >
              <ListItemText
                primary="Chapel Information"
                primaryTypographyProps={{ className: styles.link_style }}
              />
            </Link>
          </ListItem>
        </Typography>
      </CardContentWithPadding>
    </Card>
  );

  return (
    <>
      <Grid container>
        {/* First Column */}
        <Grid item xs={12} md={4}>
          <Box mx={2} mt={1} mb={2}>
            {academicsCard}
          </Box>
          <Box mx={2} mt={2} mb={1}>
            {servicesCard}
          </Box>
        </Grid>

        {/* Second Column */}
        <Grid item xs={12} md={4}>
          <Box mx={2} mt={1} mb={2}>
            {informationCard}
          </Box>
          <Box mx={2} mt={2} mb={1}>
            {policeCard}
          </Box>
        </Grid>

        {/* Third Column */}
        <Grid item xs={12} md={4}>
          <Box mx={2} mt={1} mb={2}>
            {titleXICard}
          </Box>
          <Box m={2}>{healthCenterCard}</Box>
          <Box m={2}>{counselingCenterCard}</Box>
          <Box mx={2} mt={2} mb={1}>
            {chapelCard}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Links;
